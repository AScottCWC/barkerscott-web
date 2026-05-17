// FILE: app/api/session/route.ts
// Replace your entire file with this code

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    
    if (!secretKey) {
      console.error('STRIPE_SECRET_KEY not set');
      return NextResponse.json(
        { error: 'Missing API configuration' },
        { status: 500 }
      );
    }

    // Import Stripe here, not at the top
    const { default: Stripe } = await import('stripe');
    const stripe = new Stripe(secretKey);
    
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
      metadata: session.metadata,
      customer_email: session.customer_email || session.customer_details?.email,
      customer_details: session.customer_details,
    });
  } catch (error: any) {
    console.error('Session error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve session' },
      { status: 500 }
    );
  }
}