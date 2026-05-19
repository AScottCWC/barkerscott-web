// app/api/payments/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';
import sgMail from '@sendgrid/mail';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const prisma = new PrismaClient();
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const driveLinks: Record<string, { id: string; name: string; sector: string }> = {
  // Aesthetics
  'price_aesthetic_policy': { id: '1V5lxLzVUWZ8YuBjsImg0KvfcRIzpOZ5Z', name: 'Adverse Event Management Policy', sector: 'Aesthetics' },
  'price_aesthetic_ra_botox': { id: '19LwZAroTpFNjTFKFEcI_OtA5GLtOq2dr', name: 'Botulinum Toxin Administration RA', sector: 'Aesthetics' },
  
  // Care Home
  'price_careh_policy': { id: '1x5Ke9SiobWKJ2ggZg6q4lKG_-CLlL909', name: 'Complaints Policy', sector: 'Care Home' },
  'price_careh_ra_falls': { id: '1zlpsQzq36ydHZmIiKMqtykZizNLa5WBS', name: 'Falls Prevention RA', sector: 'Care Home' },
  
  // Dental
  'price_dental_policy': { id: '19zHEnVPpAI6oOmE578xdX9zKR96YFrnF', name: 'Complaints Handling Policy', sector: 'Dental' },
  'price_dental_ra_conscious': { id: '1yCv_6-0R3RYSKqP1hWtx7aB56A2vCEuX', name: 'Conscious Sedation RA', sector: 'Dental' },
  
  // GP
  'price_gp_policy': { id: '17git9BUMBA-Ck-cf4AQ6GrT5gTHv_mzl', name: 'Complaints Handling', sector: 'GP' },
  'price_gp_ra_coshh': { id: '1pBKaLoZvh5C2nB6kG4bqkaCkFqL_s7Y4', name: 'COSHH RA', sector: 'GP' },
  
  // Private Clinic
  'price_private_policy': { id: '1iXjjtIjVCxSGAQ0e8R_nIV3mpG6eC-SH', name: 'Business Continuity Policy', sector: 'Private Clinic' },
  'price_private_ra_coshh': { id: '1DEOYNA7c4Zt7tdkP6CO5OQTxcYAyJcs', name: 'COSHH RA', sector: 'Private Clinic' },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature') || '';
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Handle checkout.session.completed (subscription)
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;
      
      // Create or update user
      const user = await prisma.user.upsert({
        where: { email: session.customer_email },
        update: { name: session.customer_details?.name },
        create: {
          email: session.customer_email,
          name: session.customer_details?.name,
        },
      });

      // Create subscription record
      const subscription = await prisma.subscription.create({
        data: {
          userId: user.id,
          stripeCustomerId: session.customer,
          stripeSubId: session.subscription,
          status: 'active',
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        },
      });

      // Send welcome email with access instructions
      await sgMail.send({
        to: user.email,
        from: 'info@barkerscott.co.uk',
        subject: '✅ Subscription Confirmed - Access Your Downloads',
        html: `
          <h2>Welcome to Barker Scott!</h2>
          <p>Your subscription (£34.99/month) is now active.</p>
          <p><strong>Access your downloads:</strong></p>
          <a href="https://barkerscott.co.uk/account" style="background: #0066cc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            View My Downloads
          </a>
          <p>Log in with: <strong>${user.email}</strong></p>
          <p>Need help? Email support@barkerscott.co.uk</p>
        `,
      });

      console.log('✅ Subscription created:', subscription.id);
    }

    // Handle customer.subscription.updated (renewal/cancellation)
    if (event.type === 'customer.subscription.updated') {
      const stripeSubscription = event.data.object as any;
      
      await prisma.subscription.update({
        where: { stripeSubId: stripeSubscription.id },
        data: {
          status: stripeSubscription.status,
          currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
        },
      });

      console.log('✅ Subscription updated:', stripeSubscription.id);
    }

    // Handle customer.subscription.deleted (cancellation)
    if (event.type === 'customer.subscription.deleted') {
      const stripeSubscription = event.data.object as any;
      
      const subscription = await prisma.subscription.findUnique({
        where: { stripeSubId: stripeSubscription.id },
        include: { user: true },
      });

      if (subscription) {
        // Send cancellation email
        await sgMail.send({
          to: subscription.user.email,
          from: 'info@barkerscott.co.uk',
          subject: 'Subscription Cancelled',
          html: `
            <h2>Your subscription has been cancelled</h2>
            <p>You can still download files until: <strong>${subscription.currentPeriodEnd.toLocaleDateString()}</strong></p>
            <p>Need to resubscribe? <a href="https://barkerscott.co.uk/subscribe">Resubscribe here</a></p>
          `,
        });
      }

      console.log('✅ Subscription deleted:', stripeSubscription.id);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 });
  }
}