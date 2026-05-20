'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert('Cart is empty');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(`Error: ${result.error || 'Checkout failed'}`);
        setLoading(false);
        return;
      }

      window.location.href = `https://checkout.stripe.com/pay/${result.sessionId}`;
    } catch (error) {
      alert(`Checkout error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <header style={{ backgroundColor: '#0B1D3A', color: '#fff', padding: '2rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ backgroundColor: '#D4AF37', color: '#0B1D3A', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>BS</div>
              <div>
                <div style={{ fontWeight: '700' }}>BarkerScott</div>
                <div style={{ fontSize: '11px', color: '#d1d5db' }}>CQC COMPLIANCE</div>
              </div>
            </div>
          </Link>
          <Link href="/policies">
            <button style={{ backgroundColor: 'transparent', color: '#D4AF37', border: '2px solid #D4AF37', padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>← Continue Shopping</button>
          </Link>
        </div>
      </header>

      <section style={{ padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#0B1D3A', marginBottom: '2rem' }}>Shopping Cart</h1>

          {cart.length === 0 ? (
            <div style={{ backgroundColor: '#fff', padding: '3rem', borderRadius: '8px', textAlign: 'center' }}>
              <p style={{ fontSize: '18px', color: '#666', marginBottom: '2rem' }}>Your cart is empty</p>
              <Link href="/policies" style={{ textDecoration: 'none' }}>
                <button style={{ backgroundColor: '#D4AF37', color: '#0B1D3A', padding: '0.75rem 1.5rem', border: 'none', borderRadius: '6px', fontWeight: '700', cursor: 'pointer' }}>
                  Browse Templates
                </button>
              </Link>
            </div>
          ) : (
            <>
              <div style={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e5e5', marginBottom: '2rem' }}>
                {cart.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: idx < cart.length - 1 ? '1px solid #e5e5e5' : 'none' }}>
                    <div>
                      <div style={{ fontWeight: '600', color: '#0B1D3A', fontSize: '16px' }}>{item.name}</div>
                      <div style={{ fontSize: '13px', color: '#666', marginTop: '0.25rem' }}>{item.type === 'policy' ? 'Policy' : 'Risk Assessment'} • {item.sector}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                      <div style={{ fontWeight: '700', color: '#D4AF37', fontSize: '18px' }}>£{item.price.toFixed(2)}</div>
                      <button onClick={() => removeFromCart(item.id, idx)} style={{ backgroundColor: '#ff6b6b', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', border: '1px solid #e5e5e5', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '14px', color: '#666' }}>
                  <span>Subtotal ({cart.length} items)</span>
                  <span>£{cartTotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #e5e5e5', fontSize: '18px', fontWeight: '700', color: '#0B1D3A' }}>
                  <span>Total</span>
                  <span style={{ color: '#D4AF37' }}>£{cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button onClick={handleCheckout} disabled={loading} style={{ flex: 1, backgroundColor: '#D4AF37', color: '#0B1D3A', padding: '1rem', border: 'none', borderRadius: '6px', fontWeight: '700', fontSize: '16px', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.5 : 1 }}>
                  {loading ? '⏳ Processing...' : 'Proceed to Checkout'}
                </button>
                <button onClick={() => clearCart()} style={{ backgroundColor: 'transparent', color: '#666', padding: '1rem 1.5rem', border: '1px solid #e5e5e5', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      <footer style={{ padding: '2rem 1.5rem', backgroundColor: '#000', color: '#999', textAlign: 'center', fontSize: '13px', borderTop: '1px solid #222', marginTop: '3rem' }}>
        <p>© 2026 BarkerScott Ltd. All rights reserved.</p>
      </footer>
    </div>
  );
}