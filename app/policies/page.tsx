'use client';

import { useState } from 'react';

const POLICIES = [
  { id: 1, title: 'Safeguarding Adults Policy', sector: 'Care Homes', price: 9.99 },
  { id: 2, title: 'Medication Management Policy', sector: 'Care Homes', price: 8.99 },
  { id: 3, title: 'Infection Control Policy', sector: 'Dental', price: 7.99 },
  { id: 4, title: 'Decontamination & Sterilization', sector: 'Dental', price: 8.99 },
  { id: 5, title: 'Thread Lift Procedures', sector: 'Aesthetics', price: 9.99 },
  { id: 6, title: 'Informed Consent Policy', sector: 'Aesthetics', price: 7.99 },
];

export default function PoliciesPage() {
  const [cart, setCart] = useState<typeof POLICIES>([]);
  const total = cart.reduce((sum, p) => sum + p.price, 0).toFixed(2);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <a href="/" style={{ color: '#0B1D3A', marginBottom: '2rem', display: 'inline-block', fontWeight: 'bold' }}>← Back to Home</a>
      
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem', fontWeight: 'bold', color: '#0B1D3A' }}>CQC Compliance Policies</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        {POLICIES.map(policy => (
          <div key={policy.id} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <p style={{ fontSize: '0.875rem', color: '#0E7C7B', fontWeight: 'bold', marginBottom: '0.5rem' }}>{policy.sector}</p>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', fontWeight: 'bold', color: '#0B1D3A' }}>{policy.title}</h3>
            <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#0B1D3A', marginBottom: '1rem' }}>£{policy.price}</p>
            <button
              onClick={() => setCart([...cart, policy])}
              style={{ width: '100%', padding: '0.75rem', backgroundColor: '#0B1D3A', color: 'white', border: 'none', borderRadius: '0.375rem', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div style={{ position: 'fixed', bottom: 0, right: 0, backgroundColor: 'white', padding: '2rem', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', maxWidth: '350px', zIndex: 100, borderTopLeftRadius: '0.5rem' }}>
          <h3 style={{ fontWeight: 'bold', marginBottom: '1rem', color: '#0B1D3A' }}>Cart ({cart.length})</h3>
          <div style={{ maxHeight: '150px', overflowY: 'auto', marginBottom: '1rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
            {cart.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem', color: '#1f2937' }}>
                <span>{item.title}</span>
                <span>£{item.price}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginBottom: '1rem', color: '#0B1D3A' }}>
            <span>Total:</span>
            <span>£{total}</span>
          </div>
          <button style={{ width: '100%', padding: '0.75rem', backgroundColor: '#0B1D3A', color: 'white', border: 'none', borderRadius: '0.375rem', fontWeight: 'bold', cursor: 'pointer', marginBottom: '0.5rem' }}>Checkout (Coming Soon)</button>
          <button onClick={() => setCart([])} style={{ width: '100%', padding: '0.75rem', backgroundColor: 'transparent', color: '#0B1D3A', border: '2px solid #0B1D3A', borderRadius: '0.375rem', fontWeight: 'bold', cursor: 'pointer' }}>Clear</button>
        </div>
      )}
    </div>
  );
}