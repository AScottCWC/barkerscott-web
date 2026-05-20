// app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Generate download token
function generateDownloadToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Get product info from metadata
function getProductInfo(metadata: Record<string, string>) {
  return {
    productId: metadata.product_id,
    productName: metadata.product_name,
    googleDriveFileId: metadata.google_drive_file_id,
    sector: metadata.sector,
  };
}

// Send email with download link
async function sendDownloadEmail(
  email: string,
  downloadToken: string,
  productName: string
) {
  const downloadUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/download/${downloadToken}`;
  
  const htmlContent = `
    <h2>Your BarkerScott Template is Ready!</h2>
    <p>Thank you for your purchase. Your template is ready to download.</p>
    
    <h3>${productName}</h3>
    <p>
      <a href="${downloadUrl}" style="background-color: #D4AF37; color: #0B1D3A; padding: 10px 20px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
        Download Template
      </a>
    </p>
    
    <p style="color: #999; font-size: 12px;">
      This link will expire in 7 days. You can always re-download from your email receipt.
    </p>
    
    <hr />
    <p style="color: #999; font-size: 12px;">
      © 2026 BarkerScott Ltd. | CQC Compliance Templates<br />
      📞 07407 184948 | 📧 info@barker-scott.co.uk
    </p>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Your ${productName} Download Link - BarkerScott`,
      html: htmlContent,
    });
  } catch (error) {
    console.error('Email send failed:', error);
    throw new Error('Failed to send download email');
  }
}

// Handle checkout session completed
async function handleCheckoutSessionCompleted(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session;

  if (!session.customer_email || !session.metadata) {
    throw new Error('Missing customer email or metadata');
  }

  const { productId, productName, googleDriveFileId, sector } = getProductInfo(session.metadata);
  const downloadToken = generateDownloadToken();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  // Record purchase
  const { error: dbError } = await supabase
    .from('purchases')
    .insert({
      customer_email: session.customer_email,
      product_id: productId,
      product_name: productName,
      price: (session.amount_total || 0) / 100,
      stripe_session_id: session.id,
      stripe_payment_intent_id: session.payment_intent,
      download_token: downloadToken,
      download_token_expires_at: expiresAt,
      google_drive_file_id: googleDriveFileId,
      status: 'completed',
    });

  if (dbError) {
    console.error('Database error:', dbError);
    throw new Error('Failed to record purchase');
  }

  // Send download email
  await sendDownloadEmail(
    session.customer_email,
    downloadToken,
    productName
  );
}

// Handle subscription created/updated
async function handleSubscriptionUpdated(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription;
  
  if (!subscription.customer || !subscription.metadata?.customer_email) {
    return;
  }

  const email = subscription.metadata.customer_email;

  const { error } = await supabase
    .from('subscriptions')
    .upsert({
      customer_email: email,
      stripe_subscription_id: subscription.id,
      status: subscription.status,
      current_period_start: new Date((subscription as any).current_period_start! * 1000),
      current_period_end: new Date((subscription as any).current_period_end! * 1000),
      cancel_at_period_end: subscription.cancel_at_period_end || false,
    }, {
      onConflict: 'customer_email'
    });

  if (error) {
    console.error('Subscription update error:', error);
  }
}

// Handle subscription deleted
async function handleSubscriptionDeleted(event: Stripe.Event) {
  const subscription = event.data.object as Stripe.Subscription;

  await supabase
    .from('subscriptions')
    .update({ status: 'cancelled' })
    .eq('stripe_subscription_id', subscription.id);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    // Verify webhook
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (error) {
      console.error('Webhook signature verification failed:', error);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Handle events
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event);
        break;
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event);
        break;
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
