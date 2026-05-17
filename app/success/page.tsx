'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FILENAME_MAP } from '@/app/lib/filename-map';

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
  const [downloadedItems, setDownloadedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchSessionData = async () => {
      if (!sessionId) {
        setError('Missing session information');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch session data');
        }

        const data = await response.json();
        
        if (data.metadata?.cartItems) {
          const items = JSON.parse(data.metadata.cartItems);
          setCartItems(items);
        }
      } catch (err) {
        console.error('Error fetching session:', err);
        setError('Failed to retrieve purchase information');
      } finally {
        setLoading(false);
      }
    };

    fetchSessionData();
  }, [sessionId]);

  const getDownloadFileName = (item: CartItem): string | null => {
    return FILENAME_MAP[item.id] || null;
  };

  const handleDownload = (item: CartItem) => {
    const fileName = getDownloadFileName(item);
    
    if (!fileName) {
      console.error(`No filename mapping found for product ${item.id}`);
      alert('Download not available for this item');
      return;
    }

    const folderName = item.category === 'policy' ? 'policies' : 'risk-assessments';
    const filePath = `/downloads/${folderName}/${fileName}`;
    
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName.split('/').pop() || 'document.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadedItems(new Set([...downloadedItems, item.id]));
  };

  const handleDownloadAll = () => {
    cartItems.forEach((item, index) => {
      setTimeout(() => {
        handleDownload(item);
      }, index * 500);
    });
  };

  if (loading) {
    return (
      <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
          <p style={{ color: '#6b7280', fontSize: '1rem' }}>Loading your purchase details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxWidth: '500px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❌</div>
          <p style={{ color: '#dc2626', fontSize: '1rem', marginBottom: '1.5rem' }}>{error}</p>
          <button onClick={() => window.location.href = '/'} style={{ backgroundColor: '#0B1D3A', color: 'white', padding: '0.75rem 1.5rem', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', marginBottom: '2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#0B1D3A', marginBottom: '0.5rem' }}>Payment Successful!</h1>
          <p style={{ color: '#6b7280', fontSize: '1rem', marginBottom: '1rem' }}>Thank you for your purchase. Your documents are ready to download below.</p>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>Transaction ID: <code style={{ backgroundColor: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>{sessionId?.slice(0, 20)}...</code></p>
        </div>

        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0B1D3A', marginBottom: '1.5rem' }}>📋 Your Documents</h2>
          
          {cartItems.length === 0 ? (
            <p style={{ color: '#9ca3af' }}>No items in this purchase</p>
          ) : (
            <>
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
                      <h3 style={{ fontWeight: '600', color: '#0B1D3A', marginBottom: '0.25rem', fontSize: '0.9375rem', margin: 0 }}>
                        {item.name}
                      </h3>
                      <p style={{ color: '#9ca3af', fontSize: '0.8125rem', margin: 0 }}>
                        {item.category === 'policy' ? '📋 Policy' : item.category === 'risk-assessment' ? '⚠️ Risk Assessment' : '💰 Bundle'}
                      </p>
                      <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '0.25rem', margin: 0 }}>£{item.price.toFixed(2)}</p>
                    </div>
                    <div>
                      {downloadedItems.has(item.id) ? (
                        <span style={{ color: '#059669', fontWeight: '600', fontSize: '0.875rem' }}>✓ Downloaded</span>
                      ) : (
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
                            fontSize: '0.8125rem',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          📥 Download
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '2px solid #e5e7eb', paddingTop: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1rem', fontWeight: '700', color: '#0B1D3A' }}>Order Total:</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0B1D3A' }}>£{total.toFixed(2)}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  onClick={handleDownloadAll}
                  style={{ 
                    flex: 1,
                    backgroundColor: '#D4AF37', 
                    color: '#0B1D3A', 
                    padding: '1rem',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: '700',
                    fontSize: '1rem'
                  }}
                >
                  📥 Download All
                </button>
                <button 
                  onClick={() => window.location.href = '/policies'}
                  style={{ 
                    flex: 1,
                    backgroundColor: '#e5e7eb', 
                    color: '#0B1D3A', 
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
            </>
          )}
        </div>

        <div style={{ backgroundColor: '#ecfdf5', border: '1px solid #86efac', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ color: '#059669', fontWeight: '600', marginBottom: '0.5rem', margin: 0 }}>💌 Confirmation Email</p>
          <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>A confirmation email with download links has been sent to your email address.</p>
        </div>
      </div>
    </div>
  );
}