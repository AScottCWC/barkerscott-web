import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { email, plan } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    const prices = {
      bundle: 34999, // £349.99
      individual_policy: 3999, // £39.99
      individual_ra: 3499, // £34.99
    };

    const selectedPrice = plan === 'bundle' ? prices.bundle : prices.individual_policy;
    const productName = plan === 'bundle' ? 'All Access Bundle' : 'Individual Policy/RA';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: plan === 'bundle' ? 'subscription' : 'payment',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: productName,
              description: plan === 'bundle' ? '100 policies + 60 RAs, all sectors' : 'Policy or Risk Assessment template',
            },
            unit_amount: selectedPrice,
            ...(plan === 'bundle' && {
              recurring: {
                interval: 'month',
                interval_count: 1,
              },
            }),
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/subscribe`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}