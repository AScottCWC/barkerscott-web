import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing session ID' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      id: session.id,
      payment_status: session.payment_status,
      customer_email: session.customer_email,
      metadata: session.metadata,
      line_items: session.line_items,
    });
  } catch (error: any) {
    console.error('Session retrieval error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to retrieve session' },
      { status: 500 }
    );
  }
}