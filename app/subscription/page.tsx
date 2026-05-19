'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SubscriptionPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [plan, setPlan] = useState<'bundle' | 'individual'>('bundle');
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
    <div className="min-h-screen bg-[#0f172a]">
      {/* Nav */}
      <nav className="border-b border-slate-700/50 bg-[#0f172a]/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={() => router.push('/')} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#d4a843] rounded-lg flex items-center justify-center text-[#0f172a] font-bold text-sm">BS</div>
            <div>
              <div className="text-white font-bold text-lg tracking-tight">BarkerScott</div>
              <div className="text-slate-400 text-xs tracking-widest uppercase">CQC Compliance</div>
            </div>
          </button>
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/policies')} className="text-slate-300 hover:text-white text-sm">Browse Templates</button>
            <button onClick={() => router.push('/')} className="text-slate-300 hover:text-white text-sm">Home</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-[#1e293b] py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#d4a843] text-sm font-semibold tracking-widest uppercase mb-4">Subscription Plans</p>
          <h1 className="text-5xl font-bold text-white mb-4">Choose Your Plan</h1>
          <p className="text-slate-300 text-lg">Get instant access to professional compliance templates</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Plan Toggle */}
        <div className="flex justify-center gap-3 mb-16">
          <button onClick={() => setPlan('bundle')} className={`px-8 py-3 rounded-lg font-semibold text-sm transition ${plan === 'bundle' ? 'bg-[#d4a843] text-[#0f172a]' : 'bg-[#1e293b] text-slate-300 border border-slate-600 hover:border-[#d4a843]'}`}>
            All Access Bundle
          </button>
          <button onClick={() => setPlan('individual')} className={`px-8 py-3 rounded-lg font-semibold text-sm transition ${plan === 'individual' ? 'bg-[#d4a843] text-[#0f172a]' : 'bg-[#1e293b] text-slate-300 border border-slate-600 hover:border-[#d4a843]'}`}>
            Individual Items
          </button>
        </div>

        {plan === 'bundle' ? (
          <div className="max-w-lg mx-auto">
            <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-10">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">All Access Bundle</h2>
                <div className="text-6xl font-bold text-[#d4a843] mb-1">£349.99</div>
                <p className="text-slate-400">per month</p>
              </div>
              <div className="space-y-4 mb-10">
                {['All policies across every sector', 'All risk assessments included', 'Quarterly updates delivered to you', 'Cancel anytime — no lock-in', 'Priority email support'].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-[#d4a843]/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-[#d4a843] text-xs">✓</span>
                    </div>
                    <span className="text-slate-300 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <form onSubmit={handleCheckout} className="space-y-4">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="your@email.com" className="w-full px-4 py-3 bg-[#0f172a] border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#d4a843]" />
                {error && <div className="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-sm">{error}</div>}
                <button type="submit" disabled={loading} className="w-full bg-[#d4a843] hover:bg-[#c49a3a] text-[#0f172a] font-bold py-4 rounded-lg transition disabled:opacity-50 text-lg">
                  {loading ? 'Processing...' : 'Subscribe Now'}
                </button>
              </form>
              <p className="text-center text-slate-500 text-xs mt-4">Secure payment powered by Stripe</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-white mb-2">Individual Policy</h3>
              <div className="text-5xl font-bold text-[#d4a843] mb-1">£39.99</div>
              <p className="text-slate-400 mb-6">per template</p>
              <p className="text-slate-300 text-sm mb-8">Single policy document, professionally written and CQC-aligned</p>
              <button onClick={() => router.push('/policies')} className="w-full bg-[#d4a843] hover:bg-[#c49a3a] text-[#0f172a] font-bold py-3 rounded-lg transition">Browse Policies</button>
            </div>
            <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-white mb-2">Individual Risk Assessment</h3>
              <div className="text-5xl font-bold text-[#d4a843] mb-1">£34.99</div>
              <p className="text-slate-400 mb-6">per template</p>
              <p className="text-slate-300 text-sm mb-8">Single RA document, sector-specific and ready to customise</p>
              <button onClick={() => router.push('/policies')} className="w-full bg-[#d4a843] hover:bg-[#c49a3a] text-[#0f172a] font-bold py-3 rounded-lg transition">Browse RAs</button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 py-8">
        <p className="text-center text-slate-500 text-sm">© 2026 BarkerScott. All rights reserved.</p>
      </footer>
    </div>
  );
}