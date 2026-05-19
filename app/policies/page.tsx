'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const sectors = [
  { id: 'aesthetics', name: 'Aesthetic', icon: '✨' },
  { id: 'gp', name: 'GP Surgery', icon: '⚕️' },
  { id: 'private', name: 'Private Healthcare', icon: '🏥' },
];

const templates = {
  aesthetics: [
    { id: 1, name: 'Adverse Event Management Policy', type: 'Policy', price: 39.99 },
    { id: 2, name: 'Client Safeguarding Policy', type: 'Policy', price: 39.99 },
    { id: 3, name: 'Complaints Policy', type: 'Policy', price: 39.99 },
    { id: 4, name: 'Consent Risk Disclosure Policy', type: 'Policy', price: 39.99 },
    { id: 5, name: 'Health Safety Policy', type: 'Policy', price: 39.99 },
    { id: 6, name: 'Infection Control Policy', type: 'Policy', price: 39.99 },
    { id: 7, name: 'Marketing Advertising Policy', type: 'Policy', price: 39.99 },
    { id: 8, name: 'Practitioner Competency Policy', type: 'Policy', price: 39.99 },
    { id: 9, name: 'Privacy Data Protection Policy', type: 'Policy', price: 39.99 },
    { id: 10, name: 'Product Management Policy', type: 'Policy', price: 39.99 },
    { id: 11, name: 'Botulinum Toxin Administration RA', type: 'RA', price: 34.99 },
    { id: 12, name: 'Chemical Skin Peels RA', type: 'RA', price: 34.99 },
    { id: 13, name: 'Cryotherapy Cryolipolysis RA', type: 'RA', price: 34.99 },
    { id: 14, name: 'Dermal Filler Treatments RA', type: 'RA', price: 34.99 },
    { id: 15, name: 'Infection Prevention Control IPC RA', type: 'RA', price: 34.99 },
    { id: 16, name: 'Laser IPL Treatments RA', type: 'RA', price: 34.99 },
    { id: 17, name: 'Microneedling Collagen Induction RA', type: 'RA', price: 34.99 },
    { id: 18, name: 'Patient Consultation Consent RA', type: 'RA', price: 34.99 },
    { id: 19, name: 'Platelet Rich Plasma PRP RA', type: 'RA', price: 34.99 },
    { id: 20, name: 'Thread Lift Procedures PDO RA', type: 'RA', price: 34.99 },
  ],
  gp: [
    { id: 21, name: 'Complaints Handling', type: 'Policy', price: 39.99 },
    { id: 22, name: 'Consent and Confidentiality', type: 'Policy', price: 39.99 },
    { id: 23, name: 'Data Protection and Information Governance', type: 'Policy', price: 39.99 },
    { id: 24, name: 'Equality Diversity and Inclusion', type: 'Policy', price: 39.99 },
    { id: 25, name: 'Fire Safety', type: 'Policy', price: 39.99 },
    { id: 26, name: 'Health and Safety', type: 'Policy', price: 39.99 },
    { id: 27, name: 'Infection Prevention and Control', type: 'Policy', price: 39.99 },
    { id: 28, name: 'Lone Working', type: 'Policy', price: 39.99 },
    { id: 29, name: 'Medicines Management', type: 'Policy', price: 39.99 },
    { id: 30, name: 'Safeguarding Children and Adults', type: 'Policy', price: 39.99 },
    { id: 31, name: 'COSHH RA', type: 'RA', price: 34.99 },
    { id: 32, name: 'Data Protection RA', type: 'RA', price: 34.99 },
    { id: 33, name: 'Display Screen Equipment DSE RA', type: 'RA', price: 34.99 },
    { id: 34, name: 'Fire Safety RA', type: 'RA', price: 34.99 },
    { id: 35, name: 'Infection Prevention and Control RA', type: 'RA', price: 34.99 },
    { id: 36, name: 'Lone Working RA', type: 'RA', price: 34.99 },
    { id: 37, name: 'Manual Handling RA', type: 'RA', price: 34.99 },
    { id: 38, name: 'Medicines Management and Storage RA', type: 'RA', price: 34.99 },
    { id: 39, name: 'Safeguarding Adults and Children RA', type: 'RA', price: 34.99 },
    { id: 40, name: 'Workplace Violence and Aggression RA', type: 'RA', price: 34.99 },
  ],
  private: [
    { id: 41, name: 'Business Continuity Policy', type: 'Policy', price: 39.99 },
    { id: 42, name: 'Clinical Governance Policy', type: 'Policy', price: 39.99 },
    { id: 43, name: 'Complaints Handling Policy', type: 'Policy', price: 39.99 },
    { id: 44, name: 'Consent to Treatment Policy', type: 'Policy', price: 39.99 },
    { id: 45, name: 'Data Protection and Confidentiality Policy', type: 'Policy', price: 39.99 },
    { id: 46, name: 'Health and Safety Policy', type: 'Policy', price: 39.99 },
    { id: 47, name: 'Infection Prevention and Control Policy', type: 'Policy', price: 39.99 },
    { id: 48, name: 'Medicines Management Policy', type: 'Policy', price: 39.99 },
    { id: 49, name: 'Safeguarding Adults Policy', type: 'Policy', price: 39.99 },
    { id: 50, name: 'Staffing and Recruitment Policy', type: 'Policy', price: 39.99 },
    { id: 51, name: 'COSHH RA', type: 'RA', price: 34.99 },
    { id: 52, name: 'Fire Safety RA', type: 'RA', price: 34.99 },
    { id: 53, name: 'Infection Control RA', type: 'RA', price: 34.99 },
    { id: 54, name: 'Information Governance Cyber RA', type: 'RA', price: 34.99 },
    { id: 55, name: 'Lone Working RA', type: 'RA', price: 34.99 },
    { id: 56, name: 'Manual Handling RA', type: 'RA', price: 34.99 },
    { id: 57, name: 'Medical Equipment Devices RA', type: 'RA', price: 34.99 },
    { id: 58, name: 'Medicines Storage Handling RA', type: 'RA', price: 34.99 },
    { id: 59, name: 'Slips Trips Falls RA', type: 'RA', price: 34.99 },
    { id: 60, name: 'Violence Aggression RA', type: 'RA', price: 34.99 },
  ],
};

export default function PoliciesPage() {
  const router = useRouter();
  const [selectedSector, setSelectedSector] = useState('aesthetics');
  const [cart, setCart] = useState<number[]>([]);
  const [typeFilter, setTypeFilter] = useState('All');

  const currentTemplates = templates[selectedSector as keyof typeof templates] || [];
  const filteredTemplates = typeFilter === 'All' ? currentTemplates : currentTemplates.filter(t => t.type === typeFilter);

  const handleAddToCart = (id: number) => {
    if (!cart.includes(id)) setCart([...cart, id]);
  };

  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Nav */}
      <nav className="border-b border-slate-700/50 bg-[#0f172a]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <button onClick={() => router.push('/')} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#d4a843] rounded-lg flex items-center justify-center text-[#0f172a] font-bold text-sm">BS</div>
            <div>
              <div className="text-white font-bold text-lg tracking-tight">BarkerScott</div>
              <div className="text-slate-400 text-xs tracking-widest uppercase">CQC Compliance</div>
            </div>
          </button>
          <div className="flex items-center gap-4">
            <button onClick={() => router.push('/subscription')} className="text-slate-300 hover:text-white text-sm">Subscription</button>
            <button onClick={() => router.push('/')} className="text-slate-300 hover:text-white text-sm">Home</button>
            {cart.length > 0 && (
              <button onClick={() => router.push('/subscription')} className="bg-[#d4a843] text-[#0f172a] px-4 py-2 rounded-lg font-bold text-sm">
                Cart ({cart.length})
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-[#1e293b] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-[#d4a843] text-sm font-semibold tracking-widest uppercase mb-4">Browse Templates</p>
          <h1 className="text-5xl font-bold text-white mb-4">Compliance Templates</h1>
          <p className="text-slate-300 text-lg">Professional policies and risk assessments for UK healthcare</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Sector Selection */}
        <h2 className="text-xl font-bold text-white mb-6">Select Your Sector</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {sectors.map((sector) => (
            <button key={sector.id} onClick={() => setSelectedSector(sector.id)} className={`p-6 rounded-xl border-2 transition text-center ${selectedSector === sector.id ? 'border-[#d4a843] bg-[#d4a843]/5' : 'border-slate-700 bg-[#1e293b] hover:border-[#d4a843]/50'}`}>
              <div className="text-4xl mb-3">{sector.icon}</div>
              <div className="text-lg font-semibold text-white">{sector.name}</div>
              <div className="text-slate-400 text-sm mt-1">{(templates[sector.id as keyof typeof templates] || []).length} templates</div>
            </button>
          ))}
        </div>

        {/* Type Filter */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-white">Available Templates</h2>
          <div className="flex gap-2">
            {['All', 'Policy', 'RA'].map((type) => (
              <button key={type} onClick={() => setTypeFilter(type)} className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${typeFilter === type ? 'bg-[#d4a843] text-[#0f172a]' : 'bg-[#1e293b] text-slate-300 border border-slate-600 hover:border-[#d4a843]'}`}>
                {type === 'RA' ? 'Risk Assessments' : type === 'Policy' ? 'Policies' : 'All'}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="bg-[#1e293b] border border-slate-700 rounded-xl p-6 hover:border-[#d4a843] transition">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-white flex-1 text-sm leading-tight">{template.name}</h3>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded inline-block mb-4 ${template.type === 'Policy' ? 'text-[#d4a843] bg-[#d4a843]/10' : 'text-emerald-400 bg-emerald-900/30'}`}>
                {template.type === 'RA' ? 'Risk Assessment' : 'Policy'}
              </span>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-white">£{template.price.toFixed(2)}</span>
                <button onClick={() => handleAddToCart(template.id)} disabled={cart.includes(template.id)} className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${cart.includes(template.id) ? 'bg-slate-700 text-slate-400' : 'bg-[#d4a843] hover:bg-[#c49a3a] text-[#0f172a]'}`}>
                  {cart.includes(template.id) ? 'Added ✓' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="bg-[#1e293b] border border-[#d4a843]/30 rounded-xl p-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Cart: {cart.length} item{cart.length !== 1 ? 's' : ''}</h3>
            <p className="text-slate-400 text-sm">Or subscribe for all-access at <span className="text-[#d4a843] font-bold">£349.99/month</span></p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => router.push('/subscription')} className="border border-[#d4a843] text-[#d4a843] px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#d4a843]/10 transition">
              Subscribe Instead
            </button>
            <button onClick={() => router.push('/subscription')} disabled={cart.length === 0} className="bg-[#d4a843] hover:bg-[#c49a3a] disabled:opacity-50 text-[#0f172a] px-8 py-3 rounded-lg font-bold text-sm transition">
              Checkout
            </button>
          </div>
        </div>
      </div>

      <footer className="border-t border-slate-700/50 py-8">
        <p className="text-center text-slate-500 text-sm">© 2026 BarkerScott. All rights reserved.</p>
      </footer>
    </div>
  );
}