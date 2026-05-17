'use client';

import { useState } from 'react';
import { POLICIES, RISK_ASSESSMENTS, BUNDLES } from '@/app/lib/products';

interface CartItem {
  id: string;
  name: string;
  category: 'policy' | 'risk-assessment' | 'bundle';
  price: number;
}

export default function PoliciesPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState<'bundles' | 'policies' | 'risk-assessments'>('bundles');
  const [sectorFilter, setSectorFilter] = useState<string>('all');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const sectors = ['Care Homes', 'Dental Practices', 'Aesthetic Clinics', 'GP Practices', 'Private Clinics'];

  const filteredPolicies = sectorFilter === 'all' 
    ? POLICIES 
    : POLICIES.filter(p => p.sector === sectorFilter);

  const filteredRAs = sectorFilter === 'all'
    ? RISK_ASSESSMENTS
    : RISK_ASSESSMENTS.filter(ra => ra.sector === sectorFilter);

  const filteredBundles = sectorFilter === 'all'
    ? BUNDLES
    : BUNDLES.filter(b => b.sector === sectorFilter || b.sector === 'All Sectors');

  const addToCart = (item: CartItem) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handleCheckout = async () => {
    console.log('Checkout clicked');
    console.log('Cart items:', cart);
    
    setCheckoutLoading(true);
    setCheckoutError(null);

    try {
      console.log('Sending checkout request...');
      
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems: cart }),
      });

      console.log('API Response status:', response.status);
      
      const data = await response.json();
      console.log('API Response data:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Checkout failed');
      }
      
      if (!data.sessionId) {
        throw new Error('No session ID returned from server');
      }

      console.log('Session ID:', data.sessionId);
      console.log('Redirecting to Stripe...');

      if (data.url) {
  window.location.href = data.url;
} else {
  throw new Error('No checkout URL returned');
}
    } catch (err) {
      console.error('Checkout error:', err);
      const errorMsg = err instanceof Error ? err.message : 'Checkout failed';
      setCheckoutError(errorMsg);
      setCheckoutLoading(false);
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      {/* Header */}
      <div style={{ backgroundColor: '#0B1D3A', color: 'white', padding: '2rem 1rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', margin: '0 0 0.5rem 0' }}>Healthcare Policies & Risk Assessments</h1>
        <p style={{ margin: 0, opacity: 0.9 }}>Comprehensive compliance documents for UK healthcare providers</p>
      </div>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 120px)' }}>
        {/* Main Content */}
        <div style={{ flex: 1, padding: '2rem 1rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Sector Filter */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: '#0B1D3A' }}>Filter by Sector:</label>
              <select 
                value={sectorFilter}
                onChange={(e) => setSectorFilter(e.target.value)}
                style={{
                  padding: '0.75rem',
                  borderRadius: '4px',
                  border: '1px solid #d1d5db',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  width: '100%',
                  maxWidth: '300px'
                }}
              >
                <option value="all">All Sectors</option>
                {sectors.map(sector => (
                  <option key={sector} value={sector}>{sector}</option>
                ))}
              </select>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '2px solid #d1d5db' }}>
              {['bundles', 'policies', 'risk-assessments'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  style={{
                    padding: '1rem 1.5rem',
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    fontWeight: activeTab === tab ? '700' : '600',
                    color: activeTab === tab ? '#0B1D3A' : '#6b7280',
                    borderBottom: activeTab === tab ? '3px solid #D4AF37' : 'none',
                    marginBottom: '-2px',
                    fontSize: '1rem'
                  }}
                >
                  {tab === 'bundles' && '💰 Bundles'}
                  {tab === 'policies' && '📋 Policies'}
                  {tab === 'risk-assessments' && '⚠️ Risk Assessments'}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              {activeTab === 'bundles' && filteredBundles.map(bundle => (
                <div key={bundle.id} style={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0B1D3A', marginBottom: '0.5rem' }}>
                    {bundle.name}
                  </h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '1rem' }}>{bundle.sector}</p>
                  <p style={{ color: '#6b7280', fontSize: '0.9375rem', marginBottom: '1.5rem', flex: 1 }}>
                    {bundle.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div>
                      <p style={{ fontSize: '2rem', fontWeight: '700', color: '#0B1D3A', margin: 0 }}>£{bundle.price.toFixed(2)}</p>
                      {bundle.savings && <p style={{ color: '#059669', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>{bundle.savings}</p>}
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(bundle)}
                    style={{
                      backgroundColor: '#0B1D3A',
                      color: 'white',
                      padding: '0.75rem 1.5rem',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '0.9375rem'
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}

              {activeTab === 'policies' && filteredPolicies.map(policy => (
                <div key={policy.id} style={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#0B1D3A', marginBottom: '0.5rem' }}>
                    {policy.name}
                  </h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.75rem' }}>{policy.sector}</p>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1.5rem', flex: 1 }}>
                    {policy.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0B1D3A', margin: 0 }}>£{policy.price.toFixed(2)}</p>
                    <button
                      onClick={() => addToCart(policy)}
                      style={{
                        backgroundColor: '#0B1D3A',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '0.8125rem'
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}

              {activeTab === 'risk-assessments' && filteredRAs.map(ra => (
                <div key={ra.id} style={{
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#0B1D3A', marginBottom: '0.5rem' }}>
                    {ra.name}
                  </h3>
                  <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginBottom: '0.75rem' }}>{ra.sector}</p>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1.5rem', flex: 1 }}>
                    {ra.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0B1D3A', margin: 0 }}>£{ra.price.toFixed(2)}</p>
                    <button
                      onClick={() => addToCart(ra)}
                      style={{
                        backgroundColor: '#0B1D3A',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: '600',
                        fontSize: '0.8125rem'
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cart Sidebar */}
        <div style={{
          width: '350px',
          backgroundColor: 'white',
          borderLeft: '1px solid #d1d5db',
          padding: '2rem 1.5rem',
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 120px)',
          position: 'sticky',
          top: '0'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0B1D3A', marginTop: 0 }}>🛒 Your Cart</h2>
          
          {cart.length === 0 ? (
            <p style={{ color: '#9ca3af' }}>Your cart is empty</p>
          ) : (
            <>
              <div style={{ marginBottom: '1.5rem', maxHeight: '400px', overflowY: 'auto' }}>
                {cart.map((item, index) => (
                  <div key={index} style={{
                    backgroundColor: '#f9fafb',
                    padding: '1rem',
                    borderRadius: '4px',
                    marginBottom: '0.75rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start'
                  }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: '600', color: '#0B1D3A', margin: '0 0 0.25rem 0', fontSize: '0.9375rem' }}>
                        {item.name}
                      </p>
                      <p style={{ color: '#6b7280', margin: '0.25rem 0 0 0', fontSize: '0.8125rem' }}>
                        £{item.price.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(index)}
                      style={{
                        backgroundColor: '#fee2e2',
                        color: '#dc2626',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '0.25rem 0.5rem',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        marginLeft: '0.5rem'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '2px solid #e5e7eb', paddingTop: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1rem', fontWeight: '700', color: '#0B1D3A' }}>Total:</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0B1D3A' }}>£{cartTotal.toFixed(2)}</span>
                </div>

                {checkoutError && (
                  <div style={{
                    backgroundColor: '#fee2e2',
                    border: '1px solid #fca5a5',
                    borderRadius: '4px',
                    padding: '0.75rem',
                    marginBottom: '1rem',
                    color: '#dc2626',
                    fontSize: '0.875rem'
                  }}>
                    {checkoutError}
                  </div>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={cart.length === 0 || checkoutLoading}
                  style={{
                    width: '100%',
                    backgroundColor: cart.length === 0 || checkoutLoading ? '#d1d5db' : '#D4AF37',
                    color: '#0B1D3A',
                    padding: '1rem',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: cart.length === 0 || checkoutLoading ? 'not-allowed' : 'pointer',
                    fontWeight: '700',
                    fontSize: '1rem',
                    opacity: cart.length === 0 || checkoutLoading ? 0.6 : 1
                  }}
                >
                  {checkoutLoading ? '⏳ Processing...' : '💳 CHECKOUT'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}