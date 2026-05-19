"use client";
import { useState } from "react";
import Link from "next/link";
import { loadStripe } from "@stripe/js";
import { bundleConfig, calculateBundlePrice } from "@/lib/driveFileIds";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type BundleId = "adhd" | "weightLoss" | "telehealth";

const bundles: BundleId[] = ["adhd", "weightLoss", "telehealth"];

export default function BundlesPage() {
  const [purchasing, setPurchasing] = useState<string | null>(null);

  const handlePurchase = async (bundleId: string) => {
    setPurchasing(bundleId);
    try {
      const response = await fetch("/api/checkout-bundle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bundleId }),
      });
      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      alert("Error: " + (error as Error).message);
      setPurchasing(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4">Document Bundles</h1>
        <p className="text-slate-300 mb-12">One-time purchase, lifetime access</p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {bundles.map((bundleId) => {
            const config = bundleConfig[bundleId];
            const price = calculateBundlePrice(bundleId);

            return (
              <div key={bundleId} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                  <h3 className="text-xl font-bold text-white">{config.name}</h3>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-slate-900">£{price.toFixed(2)}</span>
                    <p className="text-sm text-slate-500">one-time payment</p>
                  </div>

                  <div className="mb-6 space-y-2 text-sm text-slate-600">
                    <p>✓ {config.policies} Policies @ £{config.pricePerPolicy}</p>
                    <p>✓ {config.riskAssessments} Risk Assessments @ £{config.pricePerRA}</p>
                    <p className="font-semibold text-slate-900">Total: {config.totalDocuments} documents</p>
                  </div>

                  <button
                    onClick={() => handlePurchase(bundleId)}
                    disabled={purchasing === bundleId}
                    className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 disabled:opacity-50"
                  >
                    {purchasing === bundleId ? "Processing..." : "Buy Now"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Or Choose Monthly Subscription</h2>
          <p className="text-slate-600 mb-6">£34.99/month – Access all documents across all sectors</p>
          <Link
            href="/pricing"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded font-semibold hover:bg-blue-700"
          >
            View Subscription
          </Link>
        </div>
      </div>
    </div>
  );
}