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
    { id: 6, name: 'Botulinum Toxin Administration RA', type: 'RA', price: 34.99 },
    { id: 7, name: 'Chemical Skin Peels RA', type: 'RA', price: 34.99 },
    { id: 8, name: 'Dermal Filler Treatments RA', type: 'RA', price: 34.99 },
  ],
  gp: [
    { id: 1, name: 'Complaints Handling', type: 'Policy', price: 39.99 },
    { id: 2, name: 'Consent and Confidentiality', type: 'Policy', price: 39.99 },
    { id: 3, name: 'Data Protection and Information Governance', type: 'Policy', price: 39.99 },
    { id: 4, name: 'Equality Diversity and Inclusion', type: 'Policy', price: 39.99 },
    { id: 5, name: 'Fire Safety', type: 'Policy', price: 39.99 },
    { id: 6, name: 'COSHH RA', type: 'RA', price: 34.99 },
    { id: 7, name: 'Data Protection RA', type: 'RA', price: 34.99 },
    { id: 8, name: 'Display Screen Equipment DSE RA', type: 'RA', price: 34.99 },
  ],
  private: [
    { id: 1, name: 'Business Continuity and Emergency Planning Policy', type: 'Policy', price: 39.99 },
    { id: 2, name: 'Clinical Governance Policy', type: 'Policy', price: 39.99 },
    { id: 3, name: 'Complaints Handling Policy', type: 'Policy', price: 39.99 },
    { id: 4, name: 'Consent to Treatment Policy', type: 'Policy', price: 39.99 },
    { id: 5, name: 'Data Protection and Confidentiality Policy', type: 'Policy', price: 39.99 },
    { id: 6, name: 'COSHH RA', type: 'RA', price: 34.99 },
    { id: 7, name: 'Fire Safety RA', type: 'RA', price: 34.99 },
    { id: 8, name: 'Infection Control RA', type: 'RA', price: 34.99 },
  ],
};

export default function PoliciesPage() {
  const router = useRouter();
  const [selectedSector, setSelectedSector] = useState('aesthetics');
  const [cart, setCart] = useState<number[]>([]);

  const currentTemplates = templates[selectedSector as keyof typeof templates] || [];

  const handleAddToCart = (id: number) => {
    setCart([...cart, id]);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    localStorage.setItem('cart', JSON.stringify(cart));
    router.push('/subscribe');
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="bg-slate-950 border-b border-slate-700 py-6">
        <div className="max-w-6xl mx-auto px-4">
          <button onClick={() => router.push('/')} className="text-amber-500 hover:text-amber-400 mb-6">← Back to Home</button>
          <h1 className="text-5xl font-bold text-white mb-2">Compliance Templates</h1>
          <p className="text-slate-300">Professional policies and risk assessments for healthcare services</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Sector Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Select Your Sector</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sectors.map((sector) => (
              <button
                key={sector.id}
                onClick={() => setSelectedSector(sector.id)}
                className={`p-8 rounded-lg border-2 transition text-center ${
                  selectedSector === sector.id
                    ? 'border-amber-500 bg-slate-800'
                    : 'border-slate-700 bg-slate-800 hover:border-amber-400'
                }`}
              >
                <div className="text-5xl mb-3">{sector.icon}</div>
                <div className="text-xl font-semibold text-white">{sector.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Available Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentTemplates.map((template) => (
              <div key={template.id} className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-amber-500 transition">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-white flex-1 text-lg">{template.name}</h3>
                </div>
                <span className="text-xs font-semibold text-amber-500 bg-slate-700 px-3 py-1 rounded inline-block mb-4">
                  {template.type}
                </span>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-amber-500">£{template.price.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => handleAddToCart(template.id)}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 rounded transition"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Summary */}
        <div className="bg-slate-800 border border-amber-500 rounded-lg p-8">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Cart: {cart.length} item{cart.length !== 1 ? 's' : ''}</h3>
              <p className="text-slate-400">Or subscribe for all-access at <span className="text-amber-500 font-bold">£349.99/month</span></p>
            </div>
            <button
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className="bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-900 px-8 py-4 rounded-lg font-bold text-lg transition"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}