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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Compliance Templates</h1>
          <p className="text-gray-600">Professional policies and risk assessments for healthcare services</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Select Your Sector</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sectors.map((sector) => (
              <button
                key={sector.id}
                onClick={() => setSelectedSector(sector.id)}
                className={`p-6 rounded-lg border-2 transition ${
                  selectedSector === sector.id
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-200 bg-white hover:border-indigo-300'
                }`}
              >
                <div className="text-4xl mb-2">{sector.icon}</div>
                <div className="font-semibold text-gray-900">{sector.name}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Available Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentTemplates.map((template) => (
              <div key={template.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-gray-900 flex-1">{template.name}</h3>
                  <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                    {template.type}
                  </span>
                </div>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-gray-900">£{template.price.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => handleAddToCart(template.id)}
                  className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Cart Items: {cart.length}</h3>
              <p className="text-gray-600">Or subscribe for all-access at £349.99/month</p>
            </div>
            <button
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 disabled:opacity-50"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}