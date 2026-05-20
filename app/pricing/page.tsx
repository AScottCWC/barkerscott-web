"use client";
import { useState } from "react";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PricingPage() {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      window.location.href = `https://checkout.stripe.com/pay/${sessionId}`;
    } catch (error) {
      alert("Error: " + (error as Error).message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-300">
            Choose what works best for your organisation
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Monthly Subscription */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8">
              <h3 className="text-2xl font-bold text-white mb-2">Monthly Subscription</h3>
              <p className="text-blue-100">All sectors included</p>
            </div>
            <div className="p-8">
              <div className="mb-8">
                <span className="text-5xl font-bold text-slate-900">£34.99</span>
                <p className="text-slate-600 mt-2">/month, cancel anytime</p>
              </div>

              <ul className="space-y-4 mb-8 text-slate-700">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>All 88+ CQC-compliant documents</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Access all 6 sectors</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Monthly updates & templates</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Email support</span>
                </li>
              </ul>

              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
              >
                {loading ? "Loading..." : "Start Subscription"}
              </button>
            </div>
          </div>

          {/* One-Time Bundles */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-8">
              <h3 className="text-2xl font-bold text-white mb-2">One-Time Bundles</h3>
              <p className="text-emerald-100">Pick what you need</p>
            </div>
            <div className="p-8">
              <div className="mb-8">
                <span className="text-3xl font-bold text-slate-900">£219.99–£249.99</span>
                <p className="text-slate-600 mt-2">per sector, lifetime access</p>
              </div>

              <ul className="space-y-4 mb-8 text-slate-700">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>10 documents per sector</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>No recurring charges</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Great for single-sector clinics</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Email support</span>
                </li>
              </ul>

              <Link
                href="/bundles"
                className="block w-full text-center bg-emerald-600 text-white py-3 rounded font-semibold hover:bg-emerald-700 transition"
              >
                Browse Bundles
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-lg p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">FAQ</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Can I switch from bundles to subscription?</h3>
              <p className="text-slate-600">Yes. We'll credit any bundle purchase toward your first subscription month.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Are documents CQC-compliant?</h3>
              <p className="text-slate-600">All documents meet current CQC Key Lines of Enquiry (KLOE) standards and include legal frameworks & risk matrices.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">What if I need customisation?</h3>
              <p className="text-slate-600">Contact us at support@barkerscott.co.uk for bespoke policy work.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
