// app/subscribe/page.tsx
'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/js';
import { useRouter } from 'next/navigation';

export default function SubscribePage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Checkout failed');
      }

      const { url } = await res.json();
      
      // Redirect to Stripe Checkout
      if (url) {
        router.push(url);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Subscribe Now</h1>
        <p className="text-gray-600 mb-6">Access all 100 policies & risk assessments</p>

        {/* Price Card */}
        <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-6 mb-8">
          <div className="text-4xl font-bold text-gray-900">£34.99</div>
          <div className="text-gray-600 mt-1">per month</div>
          <ul className="mt-4 space-y-2 text-sm text-gray-700">
            <li>✓ 100 policies & risk assessments</li>
            <li>✓ All sectors (Aesthetics, Dental, GP, Care Home, Private Clinic)</li>
            <li>✓ Monthly updates</li>
            <li>✓ Cancel anytime</li>
          </ul>
        </div>

        {/* Form */}
        <form onSubmit={handleSubscribe} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Continue to Payment'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-4">
          Secure payment powered by Stripe
        </p>
      </div>
    </div>
  );
}