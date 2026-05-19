'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ContactPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
          <button onClick={() => router.push('/')} className="text-slate-300 hover:text-white text-sm">← Home</button>
        </div>
      </nav>

      <div className="bg-[#1e293b] py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#d4a843] text-sm font-semibold tracking-widest uppercase mb-4">Get in Touch</p>
          <h1 className="text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-slate-300 text-lg">Have a question? We are here to help.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-8">Contact Information</h2>
            <div className="space-y-6">
              {[
                { icon: '📧', label: 'Email', value: 'info@barkerscott.co.uk' },
                { icon: '📞', label: 'Phone', value: '0800 000 0000' },
                { icon: '📍', label: 'Location', value: 'United Kingdom' },
                { icon: '⏰', label: 'Hours', value: 'Mon–Fri 9am–5pm' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#d4a843]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span>{item.icon}</span>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">{item.label}</p>
                    <p className="text-white font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div>
            {submitted ? (
              <div className="bg-emerald-900/30 border border-emerald-700/50 rounded-2xl p-10 text-center">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-xl font-bold text-emerald-300 mb-2">Message Sent</h3>
                <p className="text-slate-300">We will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-slate-300 text-sm mb-1 block">Full Name</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 bg-[#1e293b] border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#d4a843]" />
                </div>
                <div>
                  <label className="text-slate-300 text-sm mb-1 block">Email</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 bg-[#1e293b] border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#d4a843]" />
                </div>
                <div>
                  <label className="text-slate-300 text-sm mb-1 block">Subject</label>
                  <input type="text" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full px-4 py-3 bg-[#1e293b] border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#d4a843]" />
                </div>
                <div>
                  <label className="text-slate-300 text-sm mb-1 block">Message</label>
                  <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 bg-[#1e293b] border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#d4a843] resize-none" />
                </div>
                <button type="submit" className="w-full bg-[#d4a843] hover:bg-[#c49a3a] text-[#0f172a] font-bold py-4 rounded-lg transition text-lg">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </div>

      <footer className="border-t border-slate-700/50 py-8">
        <p className="text-center text-slate-500 text-sm">© 2026 BarkerScott. All rights reserved.</p>
      </footer>
    </div>
  );
}