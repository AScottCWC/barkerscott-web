'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SubscribePage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [plan, setPlan] = useState<'individual' | 'bundle'>('bundle');
  const router = useRouter();

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, plan }),
      });

      if (!res.ok) throw new Error('Checkout failed');
      const { url } = await res.json();
      if (url) router.push(url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-12 text-center">Choose Your Plan</h1>

        {/* Plan Selector */}
        <div className="flex gap-4 mb-12 justify-center">
          <button
            onClick={() => setPlan('bundle')}
            className={`px-6 py-3 rounded-lg font-bold transition ${
              plan === 'bundle'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-800 hover:bg-gray-100'
            }`}
          >
            Bundle (All Access)
          </button>
          <button
            onClick={() => setPlan('individual')}
            className={`px-6 py-3 rounded-lg font-bold transition ${
              plan === 'individual'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-800 hover:bg-gray-100'
            }`}
          >
            Individual Items
          </button>
        </div>

        {/* Pricing Cards */}
        {plan === 'bundle' ? (
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">All Access Bundle</h2>
            <div className="text-5xl font-bold text-indigo-600 mb-2">£349.99</div>
            <p className="text-gray-600 mb-6">per month</p>
            <ul className="space-y-3 mb-8 text-gray-700">
              <li>✓ 100 policies</li>
              <li>✓ 60 risk assessments</li>
              <li>✓ All sectors</li>
              <li>✓ Monthly updates</li>
              <li>✓ Cancel anytime</li>
            </ul>

            <form onSubmit={handleCheckout} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {error && <div className="bg-red-50 text-red-700 px-4 py-3 rounded">{error}</div>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Subscribe Now'}
              </button>
            </form>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Policies */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Individual Policies</h3>
              <div className="text-4xl font-bold text-indigo-600 mb-2">£39.99</div>
              <p className="text-gray-600 mb-6">each</p>
              <p className="text-sm text-gray-600 mb-6">Choose from 100+ templates across all sectors</p>
              <button
                onClick={handleCheckout}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg"
              >
                Browse Policies
              </button>
            </div>

            {/* Risk Assessments */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Risk Assessments</h3>
              <div className="text-4xl font-bold text-indigo-600 mb-2">£34.99</div>
              <p className="text-gray-600 mb-6">each</p>
              <p className="text-sm text-gray-600 mb-6">Customizable templates for your organization</p>
              <button
                onClick={handleCheckout}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg"
              >
                Browse RAs
              </button>
            </div>
          </div>
        )}

        <p className="text-center text-xs text-gray-500 mt-8">Secure payment powered by Stripe</p>
      </div>
    </div>
  );
}