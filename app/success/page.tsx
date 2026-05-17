'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    fetch('/api/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.metadata?.cartItems) {
          setItems(JSON.parse(data.metadata.cartItems));
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [sessionId]);

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>✅ Payment Successful!</h1>
      <p>Thank you for your purchase.</p>

      {!loading && items.length > 0 && (
        <div style={{ backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '8px', margin: '2rem 0' }}>
          <h2>📋 Your Documents</h2>
          {items.map((item, i) => (
            <div key={i} style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '4px', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: 0, fontWeight: 'bold' }}>{item.name}</p>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>£{item.price.toFixed(2)}</p>
              </div>
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/downloads/policies/care-home/safeguarding-adults-policy.docx.docx';
                  link.download = 'document.docx';
                  link.click();
                }}
                style={{ backgroundColor: '#0B1D3A', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                📥 Download
              </button>
            </div>
          ))}
        </div>
      )}

      <a href="/policies" style={{ display: 'inline-block', marginTop: '2rem', padding: '0.75rem 1.5rem', backgroundColor: '#0B1D3A', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
        ← Back to Shop
      </a>
    </div>
  );
}