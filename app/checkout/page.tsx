'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, plan: 'bundle' }),
      });
      if (!res.ok) throw new Error('Checkout failed');
      const { url } = await res.json();
      if (url) router.push(url);
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a]">
      <nav className="border-b border-slate-700/50 bg-[#0f172a]/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={() => router.push('/')} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#d4a843] rounded-lg flex items-center justify-center text-[#0f172a] font-bold text-sm">BS</div>
            <div>
              <div className="text-white font-bold text-lg tracking-tight">BarkerScott</div>
              <div className="text-slate-400 text-xs tracking-widest uppercase">CQC Compliance</div>
            </div>
          </button>
          <button onClick={() => router.push('/policies')} className="text-slate-300 hover:text-white text-sm">← Back</button>
        </div>
      </nav>

      <div className="max-w-lg mx-auto px-6 py-20">
        <div className="text-center mb-10">
          <p className="text-[#d4a843] text-sm font-semibold tracking-widest uppercase mb-3">Secure Checkout</p>
          <h1 className="text-4xl font-bold text-white">Complete Your Order</h1>
        </div>

        <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-8">
          <form onSubmit={handleCheckout} className="space-y-6">
            <div>
              <label className="text-slate-300 text-sm mb-2 block">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="your@email.com" className="w-full px-4 py-3 bg-[#0f172a] border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#d4a843]" />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-[#d4a843] hover:bg-[#c49a3a] text-[#0f172a] font-bold py-4 rounded-lg transition disabled:opacity-50 text-lg">
              {loading ? 'Redirecting to Stripe...' : 'Pay Securely'}
            </button>
          </form>
          <p className="text-center text-slate-500 text-xs mt-4">Powered by Stripe. Your data is encrypted.</p>
        </div>
      </div>

      <footer className="border-t border-slate-700/50 py-8">
        <p className="text-center text-slate-500 text-sm">© 2026 BarkerScott. All rights reserved.</p>
      </footer>
    </div>
  );
}