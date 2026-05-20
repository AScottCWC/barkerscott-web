"use client";
import { useState } from "react";

interface DocumentCardProps {
  id: string;
  name: string;
  type: "policy" | "ra";
  sector: string;
  price: number;
}

export default function DocumentCard({ id, name, type, sector, price }: DocumentCardProps) {
  const [purchasing, setPurchasing] = useState(false);

  const handlePurchase = async () => {
    setPurchasing(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documentId: id, productName: name, price, type, sector }),
      });
      const { sessionId } = await response.json();
      window.location.href = `https://checkout.stripe.com/pay/${sessionId}`;
    } catch (error) {
      alert("Error: " + (error as Error).message);
      setPurchasing(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#fff', border: '1px solid #e5e5e5', borderRadius: '8px', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
      <span style={{ fontSize: '11px', fontWeight: '700', color: type === 'policy' ? '#3B82F6' : '#8B5CF6', backgroundColor: type === 'policy' ? '#EFF6FF' : '#F5F3FF', padding: '0.25rem 0.75rem', borderRadius: '4px', alignSelf: 'fit-content', marginBottom: '1rem', textTransform: 'uppercase' }}>
        {type === 'policy' ? 'Policy' : 'RA'}
      </span>
      <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0B1D3A', margin: '0 0 1.5rem 0' }}>{name}</h3>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #e5e5e5', marginTop: 'auto' }}>
        <div style={{ fontSize: '18px', fontWeight: '700', color: '#D4AF37' }}>£{price.toFixed(2)}</div>
        <button onClick={handlePurchase} disabled={purchasing} style={{ backgroundColor: 'transparent', color: '#D4AF37', border: '1px solid #D4AF37', padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: '600', fontSize: '13px', cursor: purchasing ? 'not-allowed' : 'pointer', opacity: purchasing ? 0.5 : 1 }}>
          {purchasing ? '⏳' : 'Buy'}
        </button>
      </div>
    </div>
  );
}