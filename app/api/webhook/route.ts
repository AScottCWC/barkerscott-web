import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { bundleConfig } from "@/lib/driveFileIds";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (error) {
    return NextResponse.json({ error: "Webhook signature failed" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.mode === "payment") {
      const bundleId = session.metadata?.bundleId;
      const documentId = session.metadata?.documentId;
      const userId = session.client_reference_id;
      const amount = (session.amount_total || 0) / 100;
      const userEmail = session.customer_email || "";

      let userId_final = userId;
      if (!userId_final && userEmail) {
        const { data: userData } = await supabase.auth.admin.getUserByEmail(userEmail);
        userId_final = userData?.user?.id || "";
      }

      if (!userId_final) {
        console.error("No user ID found for purchase");
        return NextResponse.json({ error: "User not found" }, { status: 400 });
      }

      // Bundle purchase
      if (bundleId) {
        const config = bundleConfig[bundleId as keyof typeof bundleConfig];

        const { error: insertError } = await supabase.from("bundle_purchases").insert({
          user_id: userId_final,
          bundle_id: bundleId,
          amount_paid: amount,
          stripe_session_id: session.id,
          purchased_at: new Date(),
        });

        if (insertError) {
          console.error("Error recording bundle purchase:", insertError);
          return NextResponse.json({ error: insertError.message }, { status: 500 });
        }

        const { data: currentUser } = await supabase.auth.admin.getUserById(userId_final);
        const currentBundles = currentUser?.user_metadata?.purchased_bundles || [];

        await supabase.auth.admin.updateUserById(userId_final, {
          user_metadata: {
            ...currentUser?.user_metadata,
            purchased_bundles: [...new Set([...currentBundles, bundleId])],
            last_purchase: new Date().toISOString(),
          },
        });

        // Send confirmation email
        await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/send-confirmation`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userEmail,
            items: [{ name: config.name, price: amount, type: "Bundle" }],
            totalPrice: amount,
            transactionId: session.id,
            accountUrl: `${process.env.NEXT_PUBLIC_DOMAIN}/account`,
          }),
        });

        console.log(`Bundle ${bundleId} purchased by user ${userId_final}`);
      }

      // Document purchase
      if (documentId) {
        const { error: insertError } = await supabase.from("document_purchases").insert({
          user_id: userId_final,
          document_id: documentId,
          document_name: session.metadata?.documentName,
          document_type: session.metadata?.type,
          sector: session.metadata?.sector,
          amount_paid: amount,
          stripe_session_id: session.id,
          purchased_at: new Date(),
        });

        if (insertError) {
          console.error("Error recording document purchase:", insertError);
          return NextResponse.json({ error: insertError.message }, { status: 500 });
        }

        const { data: currentUser } = await supabase.auth.admin.getUserById(userId_final);
        const purchasedDocs = currentUser?.user_metadata?.purchased_documents || [];

        await supabase.auth.admin.updateUserById(userId_final, {
          user_metadata: {
            ...currentUser?.user_metadata,
            purchased_documents: [...new Set([...purchasedDocs, documentId])],
            last_purchase: new Date().toISOString(),
          },
        });

        // Send confirmation email
        await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/send-confirmation`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userEmail,
            items: [{ name: session.metadata?.documentName, price: amount, type: session.metadata?.type }],
            totalPrice: amount,
            transactionId: session.id,
            accountUrl: `${process.env.NEXT_PUBLIC_DOMAIN}/account`,
          }),
        });

        console.log(`Document ${documentId} purchased by user ${userId_final}`);
      }
    }

    if (session.mode === "subscription") {
      const userId = session.client_reference_id;
      const userEmail = session.customer_email || "";

      let userId_final = userId;
      if (!userId_final && userEmail) {
        const { data: userData } = await supabase.auth.admin.getUserByEmail(userEmail);
        userId_final = userData?.user?.id || "";
      }

      if (userId_final) {
        await supabase.auth.admin.updateUserById(userId_final, {
          user_metadata: {
            subscription_active: true,
            subscription_start: new Date().toISOString(),
            stripe_customer_id: session.customer,
          },
        });

        // Send confirmation email
        await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/send-confirmation`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userEmail,
            items: [{ name: "Monthly Subscription", price: 34.99, type: "Subscription" }],
            totalPrice: 34.99,
            transactionId: session.id,
            accountUrl: `${process.env.NEXT_PUBLIC_DOMAIN}/account`,
          }),
        });
      }
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId = subscription.customer as string;

    const { data: users } = await supabase.auth.admin.listUsers();
    const user = users?.users?.find((u) => u.user_metadata?.stripe_customer_id === customerId);

    if (user) {
      await supabase.auth.admin.updateUserById(user.id, {
        user_metadata: {
          ...user.user_metadata,
          subscription_active: false,
          subscription_end: new Date().toISOString(),
        },
      });
    }
  }

  return NextResponse.json({ received: true });
}