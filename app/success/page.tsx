'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface CartItem {
  id: string;
  name: string;
  category: 'policy' | 'risk-assessment' | 'bundle';
  price: number;
}

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Success page loaded, sessionId:', sessionId);

    const fetchSessionData = async () => {
      if (!sessionId) {
        console.log('No sessionId found');
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching session data...');
        const response = await fetch('/api/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });

        console.log('Session API response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Session data:', data);
          
          if (data.metadata?.cartItems) {
            const items = JSON.parse(data.metadata.cartItems);
            console.log('Parsed cart items:', items);
            setCartItems(items);
          } else {
            console.log('No cartItems in metadata');
          }
        } else {
          const errorData = await response.json();
          console.error('Session API error:', errorData);
          setError('Failed to fetch session: ' + errorData.error);
        }
      } catch (err) {
        console.error('Error fetching session:', err);
        setError('Error: ' + (err instanceof Error ? err.message : String(err)));
      } finally {
        setLoading(false);
      }
    };

    fetchSessionData();
  }, [sessionId]);

  const handleDownload = (item: CartItem) => {
    console.log('Download clicked for:', item.id);
    const folderName = item.category === 'policy' ? 'policies' : 'risk-assessments';
    const fileName = item.name.toLowerCase().replace(/\s+/g, '-') + '.docx';
    const filePath = `/downloads/${folderName}/${fileName}`;
    
    console.log('Downloading from:', filePath);
    
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
        <p style={{ color: '#6b7280' }}>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', marginBottom: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#0B1D3A', marginBottom: '1rem' }}>✅ Payment Successful!</h1>
          <p style={{ color: '#6b7280', marginBottom: '1rem' }}>Thank you for your purchase.</p>
          <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Session: {sessionId}</p>
        </div>

        {error && (
          <div style={{ backgroundColor: '#fee2e2', border: '1px solid #fca5a5', color: '#dc2626', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        {cartItems.length > 0 ? (
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0B1D3A', marginBottom: '1.5rem' }}>📋 Your Documents ({cartItems.length} items)</h2>
            
            <div style={{ marginBottom: '1.5rem' }}>
              {cartItems.map((item) => (
                <div key={item.id} style={{ 
                  backgroundColor: '#f9fafb', 
                  padding: '1rem', 
                  borderRadius: '4px', 
                  marginBottom: '0.75rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <h3 style={{ fontWeight: '600', color: '#0B1D3A', margin: '0 0 0.5rem 0' }}>
                      {item.name}
                    </h3>
                    <p style={{ color: '#9ca3af', fontSize: '0.875rem', margin: 0 }}>
                      £{item.price.toFixed(2)}
                    </p>
                  </div>
                  <button 
                    onClick={() => handleDownload(item)}
                    style={{ 
                      backgroundColor: '#0B1D3A', 
                      color: 'white', 
                      padding: '0.5rem 1rem',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '0.875rem'
                    }}
                  >
                    📥 Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ backgroundColor: '#fef3c7', border: '1px solid #fcd34d', color: '#92400e', padding: '1rem', borderRadius: '8px', marginBottom: '2rem' }}>
            <p><strong>No items found</strong> - Session data may still be loading or cart was empty.</p>
          </div>
        )}

        <button 
          onClick={() => window.location.href = '/policies'}
          style={{ 
            width: '100%',
            backgroundColor: '#0B1D3A', 
            color: 'white', 
            padding: '1rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '700',
            fontSize: '1rem'
          }}
        >
          ← Back to Shop
        </button>
      </div>
    </div>
  );
}