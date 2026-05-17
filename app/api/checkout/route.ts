import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    
    if (!secretKey) {
      console.error('STRIPE_SECRET_KEY environment variable is not set');
      return NextResponse.json(
        { error: 'Server configuration error: Missing STRIPE_SECRET_KEY' },
        { status: 500 }
      );
    }

    const stripe = new Stripe(secretKey);
    const body = await request.json();
    const { cartItems } = body;

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const lineItems = cartItems.map((item: any) => ({
      price_data: {
        currency: 'gbp',
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `https://barkerscott-web-coxy.vercel.app/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://barkerscott-web-coxy.vercel.app/policies`,
      metadata: {
        cartItems: JSON.stringify(cartItems),
      },
    });

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url
    });
  } catch (error: any) {
    console.error('Stripe error:', error.message);
    return NextResponse.json(
      { error: error.message || 'Checkout failed' },
      { status: 500 }
    );
  }
}