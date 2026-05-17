'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    const sendEmail = async () => {
      try {
        // First get the session data to get customer email and items
        const sessionResponse = await fetch('/api/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });

        if (sessionResponse.ok) {
          const sessionData = await sessionResponse.json();
          
          if (sessionData.metadata?.cartItems) {
            const items = JSON.parse(sessionData.metadata.cartItems);
            const customerEmail = sessionData.customer_email;

            // Send email with purchase details
            await fetch('/api/send-email', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                customerEmail,
                items,
                sessionId,
              }),
            });

            setEmailSent(true);
          }
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    sendEmail();
  }, [sessionId]);

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', fontFamily: 'system-ui' }}>
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#0B1D3A', marginBottom: '1rem' }}>
          ✅ Payment Successful!
        </h1>
        
        <p style={{ color: '#6b7280', marginBottom: '1.5rem', fontSize: '1.125rem' }}>
          Thank you for your purchase.
        </p>

        {loading ? (
          <div style={{ color: '#6b7280' }}>
            <p>Processing your order...</p>
          </div>
        ) : emailSent ? (
          <div style={{ backgroundColor: '#ecfdf5', border: '1px solid #86efac', borderRadius: '8px', padding: '1.5rem', marginBottom: '2rem' }}>
            <p style={{ color: '#059669', fontWeight: '600', marginBottom: '0.5rem', margin: 0 }}>
              📧 Confirmation Email Sent
            </p>
            <p style={{ color: '#6b7280', fontSize: '0.9375rem', margin: '0.5rem 0 0 0' }}>
              Check your email inbox for your purchase confirmation and documents.
            </p>
          </div>
        ) : (
          <div style={{ backgroundColor: '#fef3c7', border: '1px solid #fcd34d', borderRadius: '8px', padding: '1.5rem', marginBottom: '2rem' }}>
            <p style={{ color: '#92400e', fontWeight: '600', margin: 0 }}>
              Please check your email for confirmation.
            </p>
          </div>
        )}

        <button
          onClick={() => (window.location.href = '/policies')}
          style={{
            width: '100%',
            backgroundColor: '#0B1D3A',
            color: 'white',
            padding: '1rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '700',
            fontSize: '1rem',
          }}
        >
          ← Back to Shop
        </button>
      </div>
    </div>
  );
}