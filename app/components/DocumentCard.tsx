"use client";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface DocumentCardProps {
  id: string;
  name: string;
  type: "policy" | "ra";
  sector: string;
  price: number;
}

export default function DocumentCard({ id, name, type, sector, price }: DocumentCardProps) {
  const [purchasing, setPurchasing] = useState(false);

  const handlePurchase = async () => {
    setPurchasing(true);
    try {
      const response = await fetch("/api/checkout-document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentId: id, documentName: name, price, type, sector }),
      });
      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      window.location.href = `https://checkout.stripe.com/pay/${sessionId}`;
    } catch (error) {
      alert("Error: " + (error as Error).message);
      setPurchasing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition">
      <div className="mb-3">
        <h3 className="font-semibold text-slate-900 text-sm line-clamp-2">{name}</h3>
        <div className="flex gap-2 mt-2">
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
            {type === "policy" ? "Policy" : "Risk Assessment"}
          </span>
          <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">{sector}</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-slate-900">£{price.toFixed(2)}</span>
        <button
          onClick={handlePurchase}
          disabled={purchasing}
          className="px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {purchasing ? "..." : "Buy"}
        </button>
      </div>
    </div>
  );
}
