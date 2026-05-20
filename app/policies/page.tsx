'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PoliciesPage() {
  const [selectedSector, setSelectedSector] = useState<string>('aesthetic');
  const [selectedType, setSelectedType] = useState<'all' | 'policy' | 'ra'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');

  const handleCheckout = async (productId: string, productName: string, price: number, sector: string): Promise<void> => {
    if (!email.trim()) {
      alert('Please enter a valid email');
      return;
    }

    setLoading(productId);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          productName,
          price,
          sector,
          customerEmail: email,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(`Error: ${result.error || 'Checkout failed'}`);
        setLoading(null);
        return;
      }

      window.location.href = `https://checkout.stripe.com/pay/${result.sessionId}`;
    } catch (error) {
      alert(`Checkout error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setLoading(null);
    }
  };

  interface Product {
    id: string;
    name: string;
    price: number;
    type: 'policy' | 'ra';
    desc: string;
  }

  interface Sector {
    name: string;
    icon: string;
    bundlePrice: number;
    items: Product[];
  }

  type SectorKey = 'aesthetic' | 'gp' | 'private-health' | 'adhd' | 'weightloss' | 'telehealth';

  const products: Record<SectorKey, Sector> = {
    aesthetic: {
      name: 'Aesthetic Clinic',
      icon: '✨',
      bundlePrice: 549.99,
      items: [
        { id: 'aes-pol-001', name: 'Adverse Event Management Policy', price: 37.99, type: 'policy', desc: 'Handle complications' },
        { id: 'aes-pol-002', name: 'Safeguarding Policy', price: 39.99, type: 'policy', desc: 'Protect clients' },
        { id: 'aes-pol-003', name: 'Complaints Policy', price: 34.99, type: 'policy', desc: 'Patient complaints' },
        { id: 'aes-pol-004', name: 'Consent Risk Policy', price: 36.99, type: 'policy', desc: 'Informed consent' },
        { id: 'aes-pol-005', name: 'Health Safety Policy', price: 38.99, type: 'policy', desc: 'H&S at work' },
        { id: 'aes-pol-006', name: 'Infection Control Policy', price: 35.99, type: 'policy', desc: 'Cross-contamination' },
        { id: 'aes-pol-007', name: 'Marketing Policy', price: 33.99, type: 'policy', desc: 'Compliant ads' },
        { id: 'aes-pol-008', name: 'Competency Policy', price: 37.99, type: 'policy', desc: 'Staff training' },
        { id: 'aes-pol-009', name: 'Data Protection Policy', price: 36.99, type: 'policy', desc: 'GDPR compliance' },
        { id: 'aes-pol-010', name: 'Product Management Policy', price: 34.99, type: 'policy', desc: 'Drug & devices' },
        { id: 'aes-ra-001', name: 'Botox RA', price: 32.99, type: 'ra', desc: 'Botulinum toxin' },
        { id: 'aes-ra-002', name: 'Chemical Peels RA', price: 29.99, type: 'ra', desc: 'Peel risks' },
        { id: 'aes-ra-003', name: 'Cryotherapy RA', price: 31.99, type: 'ra', desc: 'Cryotherapy risks' },
        { id: 'aes-ra-004', name: 'Dermal Fillers RA', price: 33.99, type: 'ra', desc: 'Filler risks' },
        { id: 'aes-ra-005', name: 'IPC RA', price: 28.99, type: 'ra', desc: 'Infection control' },
        { id: 'aes-ra-006', name: 'Laser IPL RA', price: 32.99, type: 'ra', desc: 'Laser risks' },
      ]
    },
    gp: {
      name: 'GP Surgery',
      icon: '⚕️',
      bundlePrice: 519.99,
      items: [
        { id: 'gp-pol-001', name: 'Complaints Handling', price: 36.99, type: 'policy', desc: 'Complaints' },
        { id: 'gp-pol-002', name: 'Consent & Confidentiality', price: 38.99, type: 'policy', desc: 'Consent' },
        { id: 'gp-pol-003', name: 'Data Protection', price: 37.99, type: 'policy', desc: 'GDPR' },
        { id: 'gp-pol-004', name: 'Equality & Diversity', price: 33.99, type: 'policy', desc: 'EDI' },
        { id: 'gp-pol-005', name: 'Fire Safety', price: 34.99, type: 'policy', desc: 'Fire' },
        { id: 'gp-pol-006', name: 'Health & Safety', price: 38.99, type: 'policy', desc: 'H&S' },
        { id: 'gp-pol-007', name: 'Infection Control', price: 35.99, type: 'policy', desc: 'IPC' },
        { id: 'gp-pol-008', name: 'Lone Working', price: 32.99, type: 'policy', desc: 'Safety' },
        { id: 'gp-pol-009', name: 'Medicines Management', price: 39.99, type: 'policy', desc: 'Medicines' },
        { id: 'gp-pol-010', name: 'Safeguarding', price: 37.99, type: 'policy', desc: 'Protection' },
        { id: 'gp-ra-001', name: 'COSHH RA', price: 28.99, type: 'ra', desc: 'Hazardous' },
        { id: 'gp-ra-002', name: 'Data Protection RA', price: 27.99, type: 'ra', desc: 'Security' },
        { id: 'gp-ra-003', name: 'DSE RA', price: 26.99, type: 'ra', desc: 'Screens' },
        { id: 'gp-ra-004', name: 'Fire Safety RA', price: 29.99, type: 'ra', desc: 'Fire' },
        { id: 'gp-ra-005', name: 'IPC RA', price: 28.99, type: 'ra', desc: 'Infection' },
        { id: 'gp-ra-006', name: 'Lone Working RA', price: 25.99, type: 'ra', desc: 'Safety' },
      ]
    },
    'private-health': {
      name: 'Private Healthcare',
      icon: '🏥',
      bundlePrice: 579.99,
      items: [
        { id: 'ph-pol-001', name: 'Business Continuity', price: 37.99, type: 'policy', desc: 'Continuity' },
        { id: 'ph-pol-002', name: 'Clinical Governance', price: 39.99, type: 'policy', desc: 'Governance' },
        { id: 'ph-pol-003', name: 'Complaints Handling', price: 36.99, type: 'policy', desc: 'Complaints' },
        { id: 'ph-pol-004', name: 'Consent to Treatment', price: 35.99, type: 'policy', desc: 'Consent' },
        { id: 'ph-pol-005', name: 'Data Protection', price: 37.99, type: 'policy', desc: 'Data' },
        { id: 'ph-pol-006', name: 'Health & Safety', price: 38.99, type: 'policy', desc: 'H&S' },
        { id: 'ph-pol-007', name: 'Infection Control', price: 35.99, type: 'policy', desc: 'IPC' },
        { id: 'ph-pol-008', name: 'Medicines Management', price: 39.99, type: 'policy', desc: 'Medicines' },
        { id: 'ph-pol-009', name: 'Safeguarding Adults', price: 36.99, type: 'policy', desc: 'Safeguarding' },
        { id: 'ph-pol-010', name: 'Staffing & Recruitment', price: 33.99, type: 'policy', desc: 'Staffing' },
        { id: 'ph-ra-001', name: 'COSHH RA', price: 28.99, type: 'ra', desc: 'Hazardous' },
        { id: 'ph-ra-002', name: 'Fire Safety RA', price: 29.99, type: 'ra', desc: 'Fire' },
      ]
    },
    adhd: {
      name: 'ADHD Clinic',
      icon: '🧠',
      bundlePrice: 429.99,
      items: [
        { id: 'adh-pol-001', name: 'ADHD Assessment', price: 36.99, type: 'policy', desc: 'Assessment' },
        { id: 'adh-pol-002', name: 'Medication Management', price: 38.99, type: 'policy', desc: 'Medicines' },
        { id: 'adh-pol-003', name: 'Safeguarding Children', price: 37.99, type: 'policy', desc: 'Child safety' },
        { id: 'adh-pol-004', name: 'Consent & Capacity', price: 35.99, type: 'policy', desc: 'Consent' },
        { id: 'adh-pol-005', name: 'Data Protection', price: 36.99, type: 'policy', desc: 'Data' },
        { id: 'adh-ra-001', name: 'Medication Safety RA', price: 32.99, type: 'ra', desc: 'Safety' },
        { id: 'adh-ra-002', name: 'Safeguarding RA', price: 31.99, type: 'ra', desc: 'Risk' },
        { id: 'adh-ra-003', name: 'Assessment Validity RA', price: 29.99, type: 'ra', desc: 'Validity' },
      ]
    },
    weightloss: {
      name: 'Weight Loss Clinic',
      icon: '⚖️',
      bundlePrice: 559.99,
      items: [
        { id: 'wei-pol-001', name: 'GLP-1 Prescribing', price: 38.99, type: 'policy', desc: 'GLP-1' },
        { id: 'wei-pol-002', name: 'Cardiovascular Assessment', price: 37.99, type: 'policy', desc: 'CV' },
        { id: 'wei-pol-003', name: 'Psychological Screening', price: 36.99, type: 'policy', desc: 'Psych' },
        { id: 'wei-pol-004', name: 'Informed Consent', price: 35.99, type: 'policy', desc: 'Consent' },
        { id: 'wei-pol-005', name: 'Eating Disorder Safeguarding', price: 37.99, type: 'policy', desc: 'ED' },
        { id: 'wei-ra-001', name: 'Cardiovascular Risk RA', price: 33.99, type: 'ra', desc: 'CV Risk' },
        { id: 'wei-ra-002', name: 'GLP-1 Safety RA', price: 32.99, type: 'ra', desc: 'Safety' },
      ]
    },
    telehealth: {
      name: 'Online/Virtual Clinic',
      icon: '💻',
      bundlePrice: 559.99,
      items: [
        { id: 'tel-pol-001', name: 'Telehealth Consent', price: 37.99, type: 'policy', desc: 'Consent' },
        { id: 'tel-pol-002', name: 'Cybersecurity', price: 38.99, type: 'policy', desc: 'Security' },
        { id: 'tel-pol-003', name: 'Remote Assessment', price: 36.99, type: 'policy', desc: 'Assessment' },
        { id: 'tel-pol-004', name: 'Data Protection', price: 37.99, type: 'policy', desc: 'Data' },
        { id: 'tel-pol-005', name: 'Emergency Response', price: 35.99, type: 'policy', desc: 'Emergency' },
        { id: 'tel-pol-006', name: 'Remote Prescribing', price: 39.99, type: 'policy', desc: 'Prescribing' },
        { id: 'tel-ra-001', name: 'Digital Access RA', price: 31.99, type: 'ra', desc: 'Access' },
        { id: 'tel-ra-002', name: 'Cybersecurity RA', price: 32.99, type: 'ra', desc: 'Cyber' },
      ]
    }
  };

  const current = products[selectedSector as SectorKey];
  const filtered = current.items.filter(item => {
    const typeMatch = selectedType === 'all' || item.type === selectedType;
    const searchMatch = !searchTerm || item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return typeMatch && searchMatch;
  });

  const policyCount = current.items.filter(i => i.type === 'policy').length;
  const raCount = current.items.filter(i => i.type === 'ra').length;

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
          <Link href="/">
            <button style={{ backgroundColor: 'transparent', color: '#D4AF37', border: '2px solid #D4AF37', padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>← Back</button>
          </Link>
        </div>
      </header>

      <section style={{ padding: '3rem 1.5rem', backgroundColor: '#fff', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#0B1D3A', margin: '0 0 0.5rem 0' }}>Templates for {current.name}</h1>
          <p style={{ fontSize: '16px', color: '#666', margin: 0 }}>{policyCount} policies + {raCount} RAs | Bundle: £{current.bundlePrice}</p>
        </div>
      </section>

      <section style={{ padding: '2rem 1.5rem', backgroundColor: '#fff', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '1rem', overflowX: 'auto' }}>
          {Object.entries(products).map(([key, sector]) => (
            <button key={key} onClick={() => setSelectedSector(key)} style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: selectedSector === key ? '#D4AF37' : '#f9f9f9',
              color: selectedSector === key ? '#0B1D3A' : '#666',
              border: `2px solid ${selectedSector === key ? '#D4AF37' : '#e5e5e5'}`,
              borderRadius: '6px',
              fontWeight: selectedSector === key ? '700' : '600',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontSize: '14px'
            }}>
              {sector.icon} {sector.name}
            </button>
          ))}
        </div>
      </section>

      <section style={{ padding: '2rem 1.5rem', backgroundColor: '#fff', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#0B1D3A', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Email</label>
            <input type="email" placeholder="info@barker-scott.co.uk" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '0.75rem', border: '1px solid #e5e5e5', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#0B1D3A', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Search</label>
            <input type="text" placeholder="Find template..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '0.75rem', border: '1px solid #e5e5e5', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#0B1D3A', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Type</label>
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value as 'all' | 'policy' | 'ra')} style={{ width: '100%', padding: '0.75rem', border: '1px solid #e5e5e5', borderRadius: '6px', fontSize: '14px' }}>
              <option value="all">All ({current.items.length})</option>
              <option value="policy">Policies ({policyCount})</option>
              <option value="ra">Risk Assessments ({raCount})</option>
            </select>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button onClick={() => handleCheckout(`bundle-${selectedSector}`, `${current.name} Bundle`, current.bundlePrice, current.name)} disabled={!email.trim()} style={{ width: '100%', backgroundColor: '#D4AF37', color: '#0B1D3A', padding: '0.75rem', border: 'none', borderRadius: '6px', fontWeight: '700', cursor: email.trim() ? 'pointer' : 'not-allowed', opacity: email.trim() ? 1 : 0.5 }}>
              🎁 Bundle £{current.bundlePrice}
            </button>
          </div>
        </div>
      </section>

      <section style={{ padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {filtered.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#666' }}>No templates match</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
              {filtered.map(item => (
                <div key={item.id} style={{ backgroundColor: '#fff', border: '1px solid #e5e5e5', borderRadius: '8px', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '11px', fontWeight: '700', color: item.type === 'policy' ? '#3B82F6' : '#8B5CF6', backgroundColor: item.type === 'policy' ? '#EFF6FF' : '#F5F3FF', padding: '0.25rem 0.75rem', borderRadius: '4px', alignSelf: 'fit-content', marginBottom: '1rem', textTransform: 'uppercase' }}>
                    {item.type === 'policy' ? 'Policy' : 'RA'}
                  </span>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0B1D3A', margin: '0 0 0.5rem 0' }}>{item.name}</h3>
                  <p style={{ fontSize: '13px', color: '#666', margin: '0 0 1.5rem 0', flex: 1 }}>{item.desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #e5e5e5' }}>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: '#D4AF37' }}>£{item.price}</div>
                    <button onClick={() => handleCheckout(item.id, item.name, item.price, current.name)} disabled={!email.trim() || loading === item.id} style={{ backgroundColor: 'transparent', color: '#D4AF37', border: '1px solid #D4AF37', padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: '600', fontSize: '13px', cursor: email.trim() && loading !== item.id ? 'pointer' : 'not-allowed', opacity: email.trim() && loading !== item.id ? 1 : 0.5 }}>
                      {loading === item.id ? '⏳' : 'Add'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer style={{ padding: '2rem 1.5rem', backgroundColor: '#000', color: '#999', textAlign: 'center', fontSize: '13px', borderTop: '1px solid #222' }}>
        <p>© 2026 BarkerScott Ltd. All rights reserved.</p>
      </footer>
    </div>
  );
}
