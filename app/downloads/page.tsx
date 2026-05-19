'use client';

import { useRouter } from 'next/navigation';

export default function DownloadsPage() {
  const router = useRouter();

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
          <button onClick={() => router.push('/')} className="text-slate-300 hover:text-white text-sm">← Home</button>
        </div>
      </nav>

      <div className="bg-[#1e293b] py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#d4a843] text-sm font-semibold tracking-widest uppercase mb-4">Your Library</p>
          <h1 className="text-5xl font-bold text-white mb-4">Downloads</h1>
          <p className="text-slate-300 text-lg">Access your purchased templates</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-12">
          <div className="w-16 h-16 bg-[#d4a843]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-[#d4a843] text-2xl">📥</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">No Downloads Yet</h2>
          <p className="text-slate-400 mb-8">Purchase templates or subscribe to access your downloads</p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => router.push('/policies')} className="bg-[#d4a843] hover:bg-[#c49a3a] text-[#0f172a] px-8 py-3 rounded-lg font-bold transition">Browse Templates</button>
            <button onClick={() => router.push('/subscription')} className="border border-[#d4a843] text-[#d4a843] px-8 py-3 rounded-lg font-semibold hover:bg-[#d4a843]/10 transition">Subscribe</button>
          </div>
        </div>
      </div>

      <footer className="border-t border-slate-700/50 py-8">
        <p className="text-center text-slate-500 text-sm">© 2026 BarkerScott. All rights reserved.</p>
      </footer>
    </div>
  );
}