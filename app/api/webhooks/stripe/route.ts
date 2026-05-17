import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature') || '';

    const secretKey = process.env.STRIPE_SECRET_KEY;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!secretKey || !webhookSecret) {
      console.log('Missing Stripe keys');
      return NextResponse.json({ received: true });
    }

    // Import Stripe here, not at the top
    const { default: Stripe } = await import('stripe');
    const stripe = new Stripe(secretKey);

    let event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    // Handle specific events
    if (event.type === 'checkout.session.completed') {
      console.log('Payment successful:', event.data.object);
      // You can add logic here to update your database, send emails, etc.
    }

    if (event.type === 'payment_intent.payment_failed') {
      console.log('Payment failed:', event.data.object);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 });
  }
}