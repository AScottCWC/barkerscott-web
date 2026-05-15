'use client';
import { useState } from 'react';
import { POLICIES, RISK_ASSESSMENTS, BUNDLES } from '@/app/lib/products';
import { SAMPLE_POLICY_PDF, SAMPLE_RA_PDF } from '@/app/lib/samples';

export default function PoliciesPage() {
  const [selectedSector, setSelectedSector] = useState('All');
  const [activeTab, setActiveTab] = useState('bundles');
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);

  const sectors = ['All', ...new Set(POLICIES.map(p => p.sector))];

  const filteredPolicies = selectedSector === 'All' 
    ? POLICIES 
    : POLICIES.filter(p => p.sector === selectedSector);

  const filteredRAs = selectedSector === 'All'
    ? RISK_ASSESSMENTS
    : RISK_ASSESSMENTS.filter(ra => ra.sector === selectedSector);

  const addToCart = (item: any) => {
    setCart([...cart, { ...item, cartId: Math.random() }]);
    setShowCart(true);
  };

  const removeFromCart = (cartId: number) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const handleViewPolicyPDF = () => { window.open(SAMPLE_POLICY_PDF, '_blank'); };
  const handleViewRAPDF = () => { window.open(SAMPLE_RA_PDF, '_blank'); };

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <style>{`
        @media (max-width: 768px) {
          .desktop-cart { display: none !important; }
          .mobile-cart-btn { display: flex !important; }
          .mobile-cart-overlay { display: block !important; }
          .main-content { padding: 1rem !important; }
          .preview-banner-inner { flex-direction: column !important; gap: 1rem !important; text-align: center !important; }
          .preview-buttons { flex-direction: column !important; width: 100% !important; }
          .preview-buttons button { width: 100% !important; }
          .tab-bar { overflow-x: auto !important; -webkit-overflow-scrolling: touch !important; }
          .tab-bar button { white-space: nowrap !important; font-size: 0.8125rem !important; padding: 0.625rem 1rem !important; }
          .products-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Header */}
      <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ backgroundColor: '#0B1D3A', color: '#D4AF37', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '1.125rem', flexShrink: 0 }}>BS</div>
            <div>
              <div style={{ fontWeight: '600', color: '#0B1D3A', fontSize: '1rem' }}>Barker Scott Ltd</div>
              <div style={{ fontSize: '0.625rem', color: '#D4AF37', fontWeight: '700', letterSpacing: '0.08em', marginTop: '1px' }}>CQC COMPLIANCE SPECIALISTS</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            {/* Mobile cart button */}
            <button className="mobile-cart-btn" onClick={() => setShowCart(!showCart)} style={{ display: 'none', alignItems: 'center', gap: '0.25rem', backgroundColor: '#0B1D3A', color: 'white', border: 'none', padding: '0.5rem 0.75rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8125rem', fontWeight: '600' }}>
              🛒 {cart.length > 0 && <span style={{ backgroundColor: '#D4AF37', color: '#0B1D3A', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6875rem', fontWeight: '700' }}>{cart.length}</span>}
            </button>
            <a href="/" style={{ color: '#6b7280', textDecoration: 'none', fontWeight: '500', fontSize: '0.8125rem' }}>← Home</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ backgroundColor: '#0B1D3A', color: 'white', padding: '2rem 1.25rem' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: '700', marginBottom: '0.375rem' }}>Policies & Risk Assessments</h1>
          <p style={{ fontSize: 'clamp(0.8125rem, 2vw, 1rem)', color: '#d1d5db' }}>70+ CQC-compliant policies + 60+ HSE-compliant risk assessments</p>
        </div>
      </section>

      {/* Sample Preview Banner */}
      <section style={{ backgroundColor: '#ecfdf5', borderBottom: '1px solid #86efac', padding: '1.25rem' }}>
        <div className="preview-banner-inner" style={{ maxWidth: '1320px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ color: '#059669', fontWeight: '700', marginBottom: '0.25rem', fontSize: '0.9375rem' }}>👀 Want to see what you&apos;re buying?</h3>
            <p style={{ color: '#6b7280', fontSize: '0.8125rem' }}>Preview professional sample templates before purchasing</p>
          </div>
          <div className="preview-buttons" style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={handleViewPolicyPDF} style={{ backgroundColor: 'white', color: '#059669', padding: '0.625rem 1rem', border: '1px solid #059669', fontWeight: '600', cursor: 'pointer', fontSize: '0.8125rem', borderRadius: '4px' }}>📋 Sample Policy</button>
            <button onClick={handleViewRAPDF} style={{ backgroundColor: 'white', color: '#059669', padding: '0.625rem 1rem', border: '1px solid #059669', fontWeight: '600', cursor: 'pointer', fontSize: '0.8125rem', borderRadius: '4px' }}>⚠️ Sample RA</button>
          </div>
        </div>
      </section>

      <div style={{ display: 'flex', maxWidth: '1320px', margin: '0 auto', minHeight: 'calc(100vh - 300px)' }}>
        {/* Main Content */}
        <div className="main-content" style={{ flex: 1, padding: '1.5rem' }}>
          {/* Sector Filter */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ fontWeight: '600', color: '#0B1D3A', marginRight: '0.75rem', fontSize: '0.875rem' }}>Filter by Sector:</label>
            <select value={selectedSector} onChange={(e) => setSelectedSector(e.target.value)} style={{ padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', fontFamily: 'inherit', fontSize: '0.875rem', width: '100%', maxWidth: '300px' }}>
              {sectors.map(sector => (<option key={sector} value={sector}>{sector}</option>))}
            </select>
          </div>

          {/* Tabs */}
          <div className="tab-bar" style={{ display: 'flex', gap: '0.5rem', borderBottom: '2px solid #e5e7eb', marginBottom: '1.5rem' }}>
            {[
              { id: 'bundles', label: `💰 Bundles (${BUNDLES.length})` },
              { id: 'policies', label: `📋 Policies (${filteredPolicies.length})` },
              { id: 'riskassessments', label: `⚠️ RAs (${filteredRAs.length})` }
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                padding: '0.625rem 1.25rem', backgroundColor: activeTab === tab.id ? '#0B1D3A' : 'transparent',
                color: activeTab === tab.id ? 'white' : '#6b7280', border: 'none', fontWeight: '600',
                cursor: 'pointer', fontSize: '0.8125rem',
                borderBottom: activeTab === tab.id ? '3px solid #D4AF37' : 'none', marginBottom: '-2px'
              }}>{tab.label}</button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
            {activeTab === 'bundles' && BUNDLES.map(bundle => (
              <div key={bundle.id} style={{ border: '1px solid #e5e7eb', padding: '1.25rem', borderTop: '3px solid #D4AF37', backgroundColor: '#f9fafb' }}>
                <h3 style={{ color: '#0B1D3A', fontWeight: '700', marginBottom: '0.375rem', fontSize: '0.9375rem' }}>{bundle.name}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.8125rem', marginBottom: '0.75rem' }}>{bundle.description}</p>
                <div style={{ backgroundColor: '#fef3c7', color: '#92400e', padding: '0.375rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.75rem', textAlign: 'center' }}>
                  {bundle.savings}
                </div>
                <div style={{ fontSize: '1.375rem', fontWeight: '700', color: '#0B1D3A', marginBottom: '0.75rem' }}>£{bundle.price.toFixed(2)}</div>
                <button onClick={() => addToCart(bundle)} style={{ width: '100%', backgroundColor: '#0B1D3A', color: 'white', padding: '0.625rem', border: 'none', fontWeight: '600', cursor: 'pointer', borderRadius: '4px', fontSize: '0.8125rem' }}>Add to Cart</button>
              </div>
            ))}

            {activeTab === 'policies' && filteredPolicies.map(policy => (
              <div key={policy.id} style={{ border: '1px solid #e5e7eb', padding: '1.25rem' }}>
                <h3 style={{ color: '#0B1D3A', fontWeight: '700', marginBottom: '0.25rem', fontSize: '0.875rem' }}>{policy.name}</h3>
                <p style={{ color: '#9ca3af', fontSize: '0.6875rem', marginBottom: '0.75rem' }}>{policy.sector}</p>
                <div style={{ fontSize: '1.125rem', fontWeight: '700', color: '#0B1D3A', marginBottom: '0.75rem' }}>£{policy.price.toFixed(2)}</div>
                <button onClick={() => addToCart(policy)} style={{ width: '100%', backgroundColor: '#0B1D3A', color: 'white', padding: '0.625rem', border: 'none', fontWeight: '600', cursor: 'pointer', borderRadius: '4px', fontSize: '0.8125rem' }}>Add to Cart</button>
              </div>
            ))}

            {activeTab === 'riskassessments' && filteredRAs.map(ra => (
              <div key={ra.id} style={{ border: '1px solid #e5e7eb', padding: '1.25rem' }}>
                <h3 style={{ color: '#0B1D3A', fontWeight: '700', marginBottom: '0.25rem', fontSize: '0.875rem' }}>{ra.name}</h3>
                <p style={{ color: '#9ca3af', fontSize: '0.6875rem', marginBottom: '0.75rem' }}>{ra.sector}</p>
                <div style={{ fontSize: '1.125rem', fontWeight: '700', color: '#0B1D3A', marginBottom: '0.75rem' }}>£{ra.price.toFixed(2)}</div>
                <button onClick={() => addToCart(ra)} style={{ width: '100%', backgroundColor: '#0B1D3A', color: 'white', padding: '0.625rem', border: 'none', fontWeight: '600', cursor: 'pointer', borderRadius: '4px', fontSize: '0.8125rem' }}>Add to Cart</button>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Shopping Cart Sidebar */}
        <div className="desktop-cart" style={{ width: '300px', backgroundColor: '#f9fafb', padding: '1.5rem', borderLeft: '1px solid #e5e7eb', maxHeight: 'fit-content', position: 'sticky', top: '80px' }}>
          <h2 style={{ color: '#0B1D3A', fontWeight: '700', marginBottom: '1rem', fontSize: '1rem' }}>🛒 Cart ({cart.length})</h2>
          {cart.length === 0 ? (
            <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Your cart is empty</p>
          ) : (
            <>
              <div style={{ maxHeight: '350px', overflowY: 'auto', marginBottom: '1rem' }}>
                {cart.map((item) => (
                  <div key={item.cartId} style={{ backgroundColor: 'white', padding: '0.75rem', marginBottom: '0.5rem', borderRadius: '4px', fontSize: '0.8125rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: '600', color: '#0B1D3A', fontSize: '0.75rem' }}>{item.name}</span>
                      <button onClick={() => removeFromCart(item.cartId)} style={{ backgroundColor: '#fee2e2', color: '#dc2626', border: 'none', padding: '0.125rem 0.375rem', cursor: 'pointer', fontSize: '0.625rem', fontWeight: '600', borderRadius: '2px' }}>✕</button>
                    </div>
                    <div style={{ color: '#6b7280', fontSize: '0.75rem' }}>£{item.price.toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', color: '#0B1D3A', marginBottom: '0.75rem' }}>
                  <span>Total:</span><span>£{cartTotal.toFixed(2)}</span>
                </div>
                <button style={{ width: '100%', backgroundColor: '#D4AF37', color: '#0B1D3A', padding: '0.75rem', border: 'none', fontWeight: '700', cursor: 'pointer', borderRadius: '4px', marginBottom: '0.5rem', fontSize: '0.8125rem' }}>CHECKOUT</button>
                <button onClick={() => setCart([])} style={{ width: '100%', backgroundColor: 'white', color: '#dc2626', padding: '0.5rem', border: '1px solid #fee2e2', fontWeight: '600', cursor: 'pointer', borderRadius: '4px', fontSize: '0.75rem' }}>Clear Cart</button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Cart Overlay */}
      {showCart && (
        <div className="mobile-cart-overlay" style={{ display: 'none', position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: 'white', boxShadow: '0 -4px 20px rgba(0,0,0,0.15)', zIndex: 100, maxHeight: '60vh', overflowY: 'auto', borderTopLeftRadius: '16px', borderTopRightRadius: '16px', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ color: '#0B1D3A', fontWeight: '700', fontSize: '1rem' }}>🛒 Cart ({cart.length})</h3>
            <button onClick={() => setShowCart(false)} style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer', color: '#6b7280' }}>✕</button>
          </div>
          {cart.length === 0 ? (
            <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Your cart is empty</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.cartId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.625rem 0', borderBottom: '1px solid #f3f4f6' }}>
                  <div>
                    <div style={{ fontWeight: '600', color: '#0B1D3A', fontSize: '0.8125rem' }}>{item.name}</div>
                    <div style={{ color: '#6b7280', fontSize: '0.75rem' }}>£{item.price.toFixed(2)}</div>
                  </div>
                  <button onClick={() => removeFromCart(item.cartId)} style={{ backgroundColor: '#fee2e2', color: '#dc2626', border: 'none', padding: '0.25rem 0.5rem', cursor: 'pointer', fontSize: '0.6875rem', fontWeight: '600', borderRadius: '2px' }}>Remove</button>
                </div>
              ))}
              <div style={{ borderTop: '2px solid #e5e7eb', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', color: '#0B1D3A', marginBottom: '0.75rem', fontSize: '1.0625rem' }}>
                  <span>Total:</span><span>£{cartTotal.toFixed(2)}</span>
                </div>
                <button style={{ width: '100%', backgroundColor: '#D4AF37', color: '#0B1D3A', padding: '0.875rem', border: 'none', fontWeight: '700', cursor: 'pointer', borderRadius: '4px', fontSize: '0.875rem' }}>PROCEED TO CHECKOUT</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}