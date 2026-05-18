'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';

function SuccessContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    const sendEmail = async () => {
      try {
        const sid = searchParams.get('session_id');
        if (!sid) {
          setStatus('error');
          setMessage('No session ID found');
          return;
        }

        setSessionId(sid);

        // Get cart from localStorage to extract product IDs
        const cartData = localStorage.getItem('cart');
        if (!cartData) {
          setStatus('error');
          setMessage('No cart data found');
          return;
        }

        const cartItems = JSON.parse(cartData);
        const productIds = cartItems.map((item: any) => item.id);
        const totalAmount = cartItems.reduce((sum: number, item: any) => sum + item.price, 0);

        // For now, use placeholder email/name (in production, get from Stripe session)
        const customerEmail = localStorage.getItem('customerEmail') || 'customer@example.com';
        const customerName = localStorage.getItem('customerName') || 'Valued Customer';

        // Send email with order details
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customerEmail,
            customerName,
            productIds,
            totalAmount: Math.round(totalAmount * 100), // Convert to pence
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to send email');
        }

        // Clear cart and stored customer info
        localStorage.removeItem('cart');
        localStorage.removeItem('customerEmail');
        localStorage.removeItem('customerName');

        setStatus('success');
        setMessage('Order confirmed! Check your email for your documents.');
      } catch (error: any) {
        console.error('Error:', error);
        setStatus('error');
        setMessage(error.message || 'Something went wrong. Please contact support.');
      }
    };

    sendEmail();
  }, [searchParams]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '8px',
        maxWidth: '500px',
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        {status === 'loading' && (
          <>
            <div style={{
              fontSize: '48px',
              marginBottom: '20px'
            }}>⏳</div>
            <h1 style={{
              color: '#0B1D3A',
              marginBottom: '10px',
              fontSize: '28px'
            }}>
              Processing Your Order
            </h1>
            <p style={{
              color: '#666',
              marginBottom: '0'
            }}>
              Please wait while we prepare your documents...
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <div style={{
              fontSize: '64px',
              marginBottom: '20px'
            }}>✅</div>
            <h1 style={{
              color: '#0B1D3A',
              marginBottom: '10px',
              fontSize: '28px'
            }}>
              Thank You!
            </h1>
            <p style={{
              color: '#666',
              marginBottom: '20px',
              lineHeight: '1.6'
            }}>
              {message}
            </p>
            <p style={{
              color: '#999',
              fontSize: '14px',
              marginBottom: '30px'
            }}>
              Session ID: <code style={{ fontSize: '12px' }}>{sessionId}</code>
            </p>
            <div style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
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
                  ← Back to Home
                </button>
              </Link>
              <Link href="/policies" style={{ textDecoration: 'none' }}>
                <button style={{
                  backgroundColor: '#f0f0f0',
                  color: '#0B1D3A',
                  padding: '12px 24px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}>
                  Shop Again
                </button>
              </Link>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <div style={{
              fontSize: '48px',
              marginBottom: '20px'
            }}>❌</div>
            <h1 style={{
              color: '#c00',
              marginBottom: '10px',
              fontSize: '28px'
            }}>
              Oops!
            </h1>
            <p style={{
              color: '#666',
              marginBottom: '30px',
              lineHeight: '1.6'
            }}>
              {message}
            </p>
            <div style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
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
                  ← Go Home
                </button>
              </Link>
              <a href="mailto:info@barker-scott.co.uk" style={{ textDecoration: 'none' }}>
                <button style={{
                  backgroundColor: '#f0f0f0',
                  color: '#0B1D3A',
                  padding: '12px 24px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}>
                  📧 Contact Support
                </button>
              </a>
            </div>
          </>
        )}

        {/* Footer Info */}
        <div style={{
          marginTop: '40px',
          paddingTop: '20px',
          borderTop: '1px solid #eee',
          fontSize: '12px',
          color: '#999'
        }}>
          <p>🏪 BarkerScott - Healthcare Compliance Templates</p>
          <p>📧 info@barker-scott.co.uk | 📞 07407 184948</p>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{
          backgroundColor: '#fff',
          padding: '40px',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <p>Loading...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}