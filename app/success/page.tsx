'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    if (sessionId) localStorage.setItem('sessionId', sessionId);
    setTimeout(() => router.push('/account'), 3000);
  }, [router]);

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="w-20 h-20 bg-emerald-900/30 border border-emerald-700/50 rounded-full flex items-center justify-center mx-auto mb-8">
          <span className="text-emerald-400 text-4xl">✓</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Payment Successful</h1>
        <p className="text-slate-300 mb-8">Your subscription is now active. Redirecting to your account...</p>
        <div className="w-full bg-slate-800 rounded-full h-1">
          <div className="bg-[#d4a843] h-1 rounded-full animate-pulse" style={{ width: '60%' }}></div>
        </div>
      </div>
    </div>
  );
}