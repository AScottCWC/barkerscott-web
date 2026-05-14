'use client';
import { useState } from 'react';
import { POLICIES, RISK_ASSESSMENTS, BUNDLES } from '@/app/lib/products';
import { SAMPLE_POLICY_PDF, SAMPLE_RA_PDF } from '@/app/lib/samples';

export default function PoliciesPage() {
  const [selectedSector, setSelectedSector] = useState('All');
  const [activeTab, setActiveTab] = useState('bundles');
  const [cart, setCart] = useState<any[]>([]);

  const sectors = ['All', ...new Set(POLICIES.map(p => p.sector))];

  const filteredPolicies = selectedSector === 'All' 
    ? POLICIES 
    : POLICIES.filter(p => p.sector === selectedSector);

  const filteredRAs = selectedSector === 'All'
    ? RISK_ASSESSMENTS
    : RISK_ASSESSMENTS.filter(ra => ra.sector === selectedSector);

  const addToCart = (item: any) => {
    setCart([...cart, { ...item, cartId: Math.random() }]);
  };

  const removeFromCart = (cartId: number) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const handleViewPolicyPDF = () => {
    window.open(SAMPLE_POLICY_PDF, '_blank');
  };

  const handleViewRAPDF = () => {
    window.open(SAMPLE_RA_PDF, '_blank');
  };

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '1.25rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ backgroundColor: '#0B1D3A', color: '#D4AF37', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '1.25rem' }}>BS</div>
            <div>
              <div style={{ fontWeight: '600', color: '#0B1D3A', fontSize: '1.0625rem' }}>Barker Scott Ltd</div>
              <div style={{ fontSize: '0.6875rem', color: '#D4AF37', fontWeight: '700', letterSpacing: '0.08em', marginTop: '2px' }}>CQC COMPLIANCE SPECIALISTS</div>
            </div>
          </div>
          <a href="/" style={{ color: '#6b7280', textDecoration: 'none', fontWeight: '500', fontSize: '0.875rem', letterSpacing: '0.01em' }}>← Back to Home</a>
        </div>
      </header>

      <section style={{ backgroundColor: '#0B1D3A', color: 'white', padding: '3rem 2rem' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>Policies & Risk Assessments Marketplace</h1>
          <p style={{ fontSize: '1rem', color: '#d1d5db' }}>70+ CQC-compliant policies + 60+ HSE-compliant risk assessments</p>
        </div>
      </section>

      <section style={{ backgroundColor: '#ecfdf5', borderBottom: '1px solid #86efac', padding: '1.5rem 2rem' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ color: '#059669', fontWeight: '700', marginBottom: '0.25rem' }}>👀 Want to see what you're buying?</h3>
            <p style={{ color: '#6b7280', fontSize: '0.9375rem' }}>Preview professional sample templates before purchasing</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={handleViewPolicyPDF} style={{ backgroundColor: 'white', color: '#059669', padding: '0.75rem 1.5rem', border: '1px solid #059669', fontWeight: '600', cursor: 'pointer', fontSize: '0.875rem', borderRadius: '4px' }}>📋 View Sample Policy</button>
            <button onClick={handleViewRAPDF} style={{ backgroundColor: 'white', color: '#059669', padding: '0.75rem 1.5rem', border: '1px solid #059669', fontWeight: '600', cursor: 'pointer', fontSize: '0.875rem', borderRadius: '4px' }}>⚠️ View Sample Risk Assessment</button>
          </div>
        </div>
      </section>

      <div style={{ display: 'flex', maxWidth: '1320px', margin: '0 auto', minHeight: 'calc(100vh - 300px)' }}>
        <div style={{ flex: 1, padding: '2rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ fontWeight: '600', color: '#0B1D3A', marginRight: '1rem' }}>Filter by Sector:</label>
            <select value={selectedSector} onChange={(e) => setSelectedSector(e.target.value)} style={{ padding: '0.5rem 1rem', border: '1px solid #d1d5db', borderRadius: '4px', fontFamily: 'inherit', fontSize: '0.9375rem' }}>
              {sectors.map(sector => (<option key={sector} value={sector}>{sector}</option>))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: '1rem', borderBottom: '2px solid #e5e7eb', marginBottom: '2rem' }}>
            {[{ id: 'bundles', label: `💰 Bundles (${BUNDLES.length})` }, { id: 'policies', label: `📋 Policies (${filteredPolicies.length})` }, { id: 'riskassessments', label: `⚠️ Risk Assessments (${filteredRAs.length})` }].map(tab => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: '0.75rem 1.5rem', backgroundColor: activeTab === tab.id ? '#0B1D3A' : 'transparent', color: activeTab === tab.id ? 'white' : '#6b7280', border: 'none', fontWeight: '600', cursor: 'pointer', fontSize: '0.9375rem', borderBottom: activeTab === tab.id ? '3px solid #D4AF37' : 'none', marginBottom: '-2px' }}>{tab.label}</button>))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {activeTab === 'bundles' && BUNDLES.map(bundle => (<div key={bundle.id} style={{ border: '1px solid #e5e7eb', padding: '1.5rem', borderTop: '3px solid #D4AF37', backgroundColor: '#f9fafb' }}><h3 style={{ color: '#0B1D3A', fontWeight: '700', marginBottom: '0.5rem', fontSize: '1rem' }}>{bundle.name}</h3><p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>{bundle.description}</p><div style={{ backgroundColor: '#fef3c7', color: '#92400e', padding: '0.5rem 0.75rem', borderRadius: '4px', fontSize: '0.8125rem', fontWeight: '600', marginBottom: '1rem', textAlign: 'center' }}>Save {bundle.savings}</div><div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0B1D3A', marginBottom: '1rem' }}>£{bundle.price.toFixed(2)}</div><button onClick={() => addToCart(bundle)} style={{ width: '100%', backgroundColor: '#0B1D3A', color: 'white', padding: '0.75rem', border: 'none', fontWeight: '600', cursor: 'pointer', borderRadius: '4px', fontSize: '0.875rem' }}>Add to Cart</button></div>))}

            {activeTab === 'policies' && filteredPolicies.map(policy => (<div key={policy.id} style={{ border: '1px solid #e5e7eb', padding: '1.5rem' }}><h3 style={{ color: '#0B1D3A', fontWeight: '700', marginBottom: '0.25rem', fontSize: '0.9375rem' }}>{policy.name}</h3><p style={{ color: '#9ca3af', fontSize: '0.75rem', marginBottom: '1rem' }}>{policy.sector}</p><div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0B1D3A', marginBottom: '1rem' }}>£{policy.price.toFixed(2)}</div><button onClick={() => addToCart(policy)} style={{ width: '100%', backgroundColor: '#0B1D3A', color: 'white', padding: '0.75rem', border: 'none', fontWeight: '600', cursor: 'pointer', borderRadius: '4px', fontSize: '0.875rem' }}>Add to Cart</button></div>))}

            {activeTab === 'riskassessments' && filteredRAs.map(ra => (<div key={ra.id} style={{ border: '1px solid #e5e7eb', padding: '1.5rem' }}><h3 style={{ color: '#0B1D3A', fontWeight: '700', marginBottom: '0.25rem', fontSize: '0.9375rem' }}>{ra.name}</h3><p style={{ color: '#9ca3af', fontSize: '0.75rem', marginBottom: '1rem' }}>{ra.sector}</p><div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0B1D3A', marginBottom: '1rem' }}>£{ra.price.toFixed(2)}</div><button onClick={() => addToCart(ra)} style={{ width: '100%', backgroundColor: '#0B1D3A', color: 'white', padding: '0.75rem', border: 'none', fontWeight: '600', cursor: 'pointer', borderRadius: '4px', fontSize: '0.875rem' }}>Add to Cart</button></div>))}
          </div>
        </div>

        <div style={{ width: '320px', backgroundColor: '#f9fafb', padding: '2rem', borderLeft: '1px solid #e5e7eb', maxHeight: 'fit-content', position: 'sticky', top: '80px' }}>
          <h2 style={{ color: '#0B1D3A', fontWeight: '700', marginBottom: '1.5rem', fontSize: '1.125rem' }}>🛒 Shopping Cart</h2>

          {cart.length === 0 ? (<p style={{ color: '#9ca3af', fontSize: '0.9375rem' }}>Your cart is empty</p>) : (<><div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '1.5rem' }}>{cart.map((item) => (<div key={item.cartId} style={{ backgroundColor: 'white', padding: '1rem', marginBottom: '0.75rem', borderRadius: '4px', fontSize: '0.875rem' }}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}><span style={{ fontWeight: '600', color: '#0B1D3A' }}>{item.name}</span><button onClick={() => removeFromCart(item.cartId)} style={{ backgroundColor: '#fee2e2', color: '#dc2626', border: 'none', padding: '0.25rem 0.5rem', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '600', borderRadius: '2px' }}>Remove</button></div><div style={{ color: '#6b7280' }}>£{item.price.toFixed(2)}</div></div>))}</div><div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem', marginTop: '1rem' }}><div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', color: '#0B1D3A', marginBottom: '1rem', fontSize: '1.0625rem' }}><span>Total:</span><span>£{cartTotal.toFixed(2)}</span></div><button style={{ width: '100%', backgroundColor: '#D4AF37', color: '#0B1D3A', padding: '0.875rem', border: 'none', fontWeight: '700', cursor: 'pointer', borderRadius: '4px', marginBottom: '0.75rem', fontSize: '0.875rem' }}>PROCEED TO CHECKOUT</button><button onClick={() => setCart([])} style={{ width: '100%', backgroundColor: 'white', color: '#dc2626', padding: '0.75rem', border: '1px solid #fee2e2', fontWeight: '600', cursor: 'pointer', borderRadius: '4px', fontSize: '0.875rem' }}>Clear Cart</button></div></>)}
        </div>
      </div>
    </div>
  );
}