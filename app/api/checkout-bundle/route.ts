import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { bundleConfig, calculateBundlePrice } from "@/lib/driveFileIds";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { bundleId } = await req.json();

    if (!bundleConfig[bundleId as keyof typeof bundleConfig]) {
      return NextResponse.json({ error: "Invalid bundle" }, { status: 400 });
    }

    const config = bundleConfig[bundleId as keyof typeof bundleConfig];
    const price = calculateBundlePrice(bundleId);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: { name: `${config.name} Bundle (${config.totalDocuments} documents)` },
            unit_amount: Math.round(price * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/account?bundlePurchased=${bundleId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/bundles`,
      metadata: { bundleId },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}