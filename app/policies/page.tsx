'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Bundle {
  id: string;
  name: string;
  description: string;
  price: number;
  save: string;
  items: string;
  icon?: string;
}

const BUNDLES: Bundle[] = [
  {
    id: 'bundle-care-home',
    name: 'Care Home Starter',
    description: 'Essential policies and risk assessments for care home compliance',
    price: 199.99,
    save: 'Save £150+',
    items: '5 Policies + 3 Risk Assessments'
  },
  {
    id: 'bundle-dental',
    name: 'Dental Pro',
    description: 'Complete dental practice compliance package',
    price: 299.99,
    save: 'Save £200+',
    items: '8 Policies + 5 Risk Assessments'
  },
  {
    id: 'bundle-aesthetic',
    name: 'Aesthetic Complete',
    description: 'Full aesthetic clinic compliance bundle',
    price: 349.99,
    save: 'Save £280+',
    items: '10 Policies + 10 Risk Assessments'
  },
  {
    id: 'bundle-gp',
    name: 'GP Practice Bundle',
    description: 'Comprehensive GP surgery compliance package',
    price: 249.99,
    save: 'Save £180+',
    items: '8 Policies + 8 Risk Assessments'
  },
  {
    id: 'bundle-private-clinic',
    name: 'Private Clinic Complete',
    description: 'All-in-one private healthcare clinic bundle',
    price: 329.99,
    save: 'Save £250+',
    items: '10 Policies + 10 Risk Assessments'
  },
  {
    id: 'bundle-ultimate',
    name: 'Ultimate Package',
    description: 'Everything - all sectors, all templates',
    price: 699.99,
    save: 'Save £1000+',
    items: 'ALL Templates (70+ Policies + 60+ Risk Assessments)'
  }
];

export default function PoliciesPage() {
  const [cart, setCart] = useState<Bundle[]>([]);
  const [addedItem, setAddedItem] = useState<string | null>(null);
  const [showCart, setShowCart] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (err) {
        console.error('Error loading cart:', err);
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (bundle: Bundle) => {
    setCart([...cart, bundle]);
    setAddedItem(bundle.id);
    setTimeout(() => setAddedItem(null), 2000);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const proceedToCheckout = () => {
    if (cart.length === 0) return;
    
    const cartParam = encodeURIComponent(JSON.stringify(cart));
    window.location.href = `/checkout?cart=${cartParam}`;
  };

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
              <div style={{ backgroundColor: '#0B1D3A', color: '#D4AF37', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '1.125rem', flexShrink: 0 }}>BS</div>
              <div>
                <div style={{ fontWeight: '600', color: '#0B1D3A', fontSize: '1rem' }}>Barker Scott Ltd</div>
                <div style={{ fontSize: '0.625rem', color: '#D4AF37', fontWeight: '700', letterSpacing: '0.08em', marginTop: '1px' }}>CQC COMPLIANCE SPECIALISTS</div>
              </div>
            </div>
          </Link>
          
          <button
            onClick={() => setShowCart(!showCart)}
            style={{
              backgroundColor: '#0B1D3A',
              color: '#D4AF37',
              padding: '0.5rem 1.25rem',
              border: 'none',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '0.75rem',
              letterSpacing: '0.03em',
              borderRadius: '2px',
              position: 'relative'
            }}
          >
            🛒 Cart {cart.length > 0 && <span style={{ marginLeft: '0.5rem' }}>({cart.length})</span>}
          </button>
        </div>
      </header>

      {/* Page Title */}
      <section style={{ backgroundColor: '#0B1D3A', color: 'white', padding: '2rem 1.25rem' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: '700', margin: '0 0 0.5rem 0' }}>
            📋 Healthcare Compliance Bundles
          </h1>
          <p style={{ color: '#d1d5db', marginBottom: 0, fontSize: '0.9375rem' }}>
            Choose the perfect bundle for your healthcare organization
          </p>
        </div>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: showCart ? '1fr 320px' : '1fr', gap: '2rem', maxWidth: '1400px', margin: '0 auto', padding: '2rem 1.25rem', minHeight: 'calc(100vh - 200px)' }}>
        {/* Products Grid */}
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {BUNDLES.map((bundle) => (
              <div
                key={bundle.id}
                style={{
                  backgroundColor: '#fafbfc',
                  border: '2px solid #D4AF37',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Save Badge */}
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '1rem',
                  backgroundColor: '#D4AF37',
                  color: '#0B1D3A',
                  padding: '0.3rem 0.8rem',
                  fontWeight: '700',
                  fontSize: '0.65rem',
                  borderRadius: '2px'
                }}>
                  {bundle.save}
                </div>

                {/* Content */}
                <h3 style={{
                  fontSize: '1.1875rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                  marginTop: '0.75rem',
                  color: '#0B1D3A'
                }}>
                  {bundle.name}
                </h3>

                <p style={{
                  color: '#6b7280',
                  fontSize: '0.875rem',
                  marginBottom: '1rem',
                  minHeight: '2.5rem'
                }}>
                  {bundle.description}
                </p>

                <p style={{
                  color: '#6b7280',
                  fontSize: '0.8125rem',
                  marginBottom: '1rem',
                  fontStyle: 'italic'
                }}>
                  {bundle.items}
                </p>

                <div style={{ marginTop: 'auto' }}>
                  <div style={{
                    fontSize: '1.875rem',
                    fontWeight: '700',
                    color: '#D4AF37',
                    marginBottom: '1rem'
                  }}>
                    £{bundle.price.toFixed(2)}
                  </div>

                  <button
                    onClick={() => addToCart(bundle)}
                    style={{
                      width: '100%',
                      backgroundColor: addedItem === bundle.id ? '#27AE60' : '#0B1D3A',
                      color: '#fff',
                      padding: '0.75rem',
                      border: 'none',
                      borderRadius: '4px',
                      fontWeight: '700',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease'
                    }}
                  >
                    {addedItem === bundle.id ? '✅ Added!' : '🛒 Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shopping Cart Sidebar */}
        {showCart && (
          <div style={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '1.5rem',
            height: 'fit-content',
            position: 'sticky',
            top: '100px'
          }}>
            <h2 style={{
              fontSize: '1.125rem',
              fontWeight: '700',
              color: '#0B1D3A',
              marginBottom: '1rem',
              margin: '0 0 1rem 0'
            }}>
              🛒 Your Cart
            </h2>

            {cart.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '2rem 0',
                color: '#999'
              }}>
                <p style={{ margin: '0 0 1rem 0', fontSize: '0.9375rem' }}>
                  Your cart is empty
                </p>
                <p style={{ margin: 0, fontSize: '0.8125rem' }}>
                  Add bundles to get started!
                </p>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div style={{
                  maxHeight: '300px',
                  overflowY: 'auto',
                  marginBottom: '1.5rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid #e5e7eb'
                }}>
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        marginBottom: '0.75rem',
                        padding: '0.75rem',
                        backgroundColor: '#f9fafb',
                        borderRadius: '4px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: '0.5rem'
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <p style={{
                          margin: '0 0 0.25rem 0',
                          fontSize: '0.8125rem',
                          fontWeight: '600',
                          color: '#0B1D3A'
                        }}>
                          {item.name}
                        </p>
                        <p style={{
                          margin: 0,
                          fontSize: '0.75rem',
                          color: '#D4AF37',
                          fontWeight: '700'
                        }}>
                          £{item.price.toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(index)}
                        style={{
                          backgroundColor: '#ff6b6b',
                          color: '#fff',
                          border: 'none',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '2px',
                          fontSize: '0.65rem',
                          cursor: 'pointer',
                          fontWeight: '600'
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div style={{
                  paddingBottom: '1rem',
                  borderBottom: '1px solid #e5e7eb',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem',
                    fontSize: '0.8125rem'
                  }}>
                    <span style={{ color: '#6b7280' }}>Items:</span>
                    <span style={{ color: '#0B1D3A', fontWeight: '600' }}>{cart.length}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '1.125rem',
                    fontWeight: '700'
                  }}>
                    <span style={{ color: '#0B1D3A' }}>Total:</span>
                    <span style={{ color: '#D4AF37' }}>£{totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={proceedToCheckout}
                  style={{
                    width: '100%',
                    backgroundColor: '#0B1D3A',
                    color: '#fff',
                    padding: '0.875rem',
                    border: 'none',
                    borderRadius: '4px',
                    fontWeight: '700',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    marginBottom: '0.75rem'
                  }}
                >
                  💳 Proceed to Checkout
                </button>

                <button
                  onClick={() => setShowCart(false)}
                  style={{
                    width: '100%',
                    backgroundColor: '#f9fafb',
                    color: '#0B1D3A',
                    padding: '0.75rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '4px',
                    fontWeight: '600',
                    fontSize: '0.8125rem',
                    cursor: 'pointer'
                  }}
                >
                  Continue Shopping
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: '#000', color: '#999', padding: '1.5rem 1.25rem', textAlign: 'center', fontSize: '0.75rem', borderTop: '1px solid #111', marginTop: '2rem' }}>
        <p>© 2025 Barker Scott Ltd. All rights reserved. Registered in England & Wales.</p>
      </footer>
    </div>
  );
}