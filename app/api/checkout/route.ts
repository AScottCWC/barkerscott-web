// app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getGoogleDriveFileId } from '@/lib/driveFileMapping';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface CheckoutBody {
  productId: string;
  productName: string;
  price: number;
  sector: string;
  customerEmail?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: CheckoutBody = await req.json();
    const { productId, productName, price, sector, customerEmail } = body;

    if (!productId || !productName || !price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const googleDriveFileId = getGoogleDriveFileId(productId);

    if (!googleDriveFileId) {
      return NextResponse.json(
        { error: 'Product file not found' },
        { status: 404 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: productName,
              description: `CQC Compliance Template - ${sector}`,
            },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/policies?cancelled=true`,
      customer_email: customerEmail,
      metadata: {
        product_id: productId,
        product_name: productName,
        google_drive_file_id: googleDriveFileId,
        sector: sector,
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}