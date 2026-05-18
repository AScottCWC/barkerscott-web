'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CartItem {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  // Load cart from URL params or localStorage
  useEffect(() => {
    try {
      const cartParam = searchParams.get('cart');
      let items: CartItem[] = [];

      if (cartParam) {
        items = JSON.parse(decodeURIComponent(cartParam));
      } else {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          items = JSON.parse(storedCart);
        }
      }

      setCartItems(items);
      const total = items.reduce((sum, item) => sum + item.price, 0);
      setTotalPrice(total);

      if (items.length === 0) {
        setError('Your cart is empty');
      }
    } catch (err) {
      console.error('Error loading cart:', err);
      setError('Error loading cart items');
    }
  }, [searchParams]);

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Checkout failed');
      }

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'Checkout failed. Please try again.');
      setLoading(false);
    }
  };

  const removeItem = (itemId: string) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
    const total = updatedItems.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(total);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const clearCart = () => {
    setCartItems([]);
    setTotalPrice(0);
    localStorage.removeItem('cart');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '40px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#0B1D3A',
              marginBottom: '20px',
              cursor: 'pointer'
            }}>
              📋 Healthcare Compliance Bundles
            </div>
          </Link>
        </div>

        {/* Cart Title */}
        <h1 style={{ color: '#0B1D3A', marginBottom: '30px', fontSize: '32px' }}>
          Your Cart
        </h1>

        {error && cartItems.length === 0 ? (
          /* Empty Cart Message */
          <div style={{
            backgroundColor: '#fff',
            padding: '40px',
            borderRadius: '8px',
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <p style={{ color: '#999', fontSize: '18px', marginBottom: '20px' }}>
              Your cart is empty
            </p>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <button style={{
                backgroundColor: '#0B1D3A',
                color: '#fff',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '4px',
                fontSize: '16px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}>
                ← Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px' }}>
            {/* Cart Items */}
            <div>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    backgroundColor: '#fff',
                    padding: '20px',
                    marginBottom: '15px',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  <div>
                    <h3 style={{ color: '#0B1D3A', margin: '0 0 8px 0' }}>
                      {item.name}
                    </h3>
                    {item.description && (
                      <p style={{ color: '#666', margin: '0', fontSize: '14px' }}>
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{
                      color: '#0B1D3A',
                      fontSize: '24px',
                      fontWeight: 'bold',
                      margin: '0 0 12px 0'
                    }}>
                      £{item.price.toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      style={{
                        backgroundColor: '#ff6b6b',
                        color: '#fff',
                        padding: '8px 16px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div style={{
              backgroundColor: '#fff',
              padding: '24px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              height: 'fit-content'
            }}>
              <h2 style={{
                color: '#0B1D3A',
                margin: '0 0 24px 0',
                fontSize: '20px'
              }}>
                Order Summary
              </h2>

              {/* Item Count */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingBottom: '12px',
                borderBottom: '1px solid #eee',
                marginBottom: '12px'
              }}>
                <span style={{ color: '#666' }}>Items:</span>
                <span style={{ color: '#0B1D3A', fontWeight: 'bold' }}>
                  {cartItems.length}
                </span>
              </div>

              {/* Subtotal */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingBottom: '12px',
                marginBottom: '16px'
              }}>
                <span style={{ color: '#666' }}>Subtotal:</span>
                <span style={{ color: '#0B1D3A' }}>
                  £{totalPrice.toFixed(2)}
                </span>
              </div>

              {/* Total */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '16px',
                borderTop: '2px solid #0B1D3A',
                marginBottom: '24px'
              }}>
                <span style={{
                  color: '#0B1D3A',
                  fontWeight: 'bold',
                  fontSize: '18px'
                }}>
                  Total:
                </span>
                <span style={{
                  color: '#0B1D3A',
                  fontWeight: 'bold',
                  fontSize: '24px'
                }}>
                  £{totalPrice.toFixed(2)}
                </span>
              </div>

              {/* Error Message */}
              {error && (
                <div style={{
                  backgroundColor: '#ffe0e0',
                  color: '#c00',
                  padding: '12px',
                  borderRadius: '4px',
                  marginBottom: '16px',
                  fontSize: '14px'
                }}>
                  {error}
                </div>
              )}

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={loading || cartItems.length === 0}
                style={{
                  width: '100%',
                  backgroundColor: loading ? '#ccc' : '#0B1D3A',
                  color: '#fff',
                  padding: '14px',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  marginBottom: '12px'
                }}
              >
                {loading ? 'Processing...' : '💳 Pay with Stripe'}
              </button>

              {/* Continue Shopping */}
              <Link href="/" style={{ textDecoration: 'none' }}>
                <button style={{
                  width: '100%',
                  backgroundColor: '#f0f0f0',
                  color: '#0B1D3A',
                  padding: '14px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginBottom: '12px'
                }}>
                  ← Continue Shopping
                </button>
              </Link>

              {/* Clear Cart */}
              <button
                onClick={clearCart}
                style={{
                  width: '100%',
                  backgroundColor: '#fff',
                  color: '#ff6b6b',
                  padding: '14px',
                  border: '1px solid #ff6b6b',
                  borderRadius: '4px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                Clear Cart
              </button>

              {/* Info */}
              <div style={{
                marginTop: '20px',
                padding: '12px',
                backgroundColor: '#f0f4f8',
                borderRadius: '4px',
                fontSize: '12px',
                color: '#666'
              }}>
                <p style={{ margin: '0 0 8px 0' }}>
                  ✅ Secure payment via Stripe
                </p>
                <p style={{ margin: '0 0 8px 0' }}>
                  📧 Download link sent via email
                </p>
                <p style={{ margin: 0 }}>
                  🔒 Your data is secure
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}