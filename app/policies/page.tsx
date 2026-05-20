'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PoliciesPage() {
  const [selectedSector, setSelectedSector] = useState<string>('aesthetic');
  const [selectedType, setSelectedType] = useState<'all' | 'policy' | 'ra'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const SECTORS = {
    aesthetic: {
      name: 'Aesthetic Clinic',
      icon: '✨',
      bundlePrice: 549.99,
      items: [
        // Policies
        { id: 'aes-pol-001', name: 'Adverse Event Management Policy', price: 37.99, type: 'policy', desc: 'Handle complications from injectable treatments' },
        { id: 'aes-pol-002', name: 'Client Safeguarding Policy', price: 39.99, type: 'policy', desc: 'Protect vulnerable clients' },
        { id: 'aes-pol-003', name: 'Complaints Policy', price: 34.99, type: 'policy', desc: 'Handle patient complaints' },
        { id: 'aes-pol-004', name: 'Consent Risk Disclosure Policy', price: 36.99, type: 'policy', desc: 'Document informed consent' },
        { id: 'aes-pol-005', name: 'Health Safety Policy', price: 38.99, type: 'policy', desc: 'Health & safety at work' },
        { id: 'aes-pol-006', name: 'Infection Control Policy', price: 35.99, type: 'policy', desc: 'Prevent cross-contamination' },
        { id: 'aes-pol-007', name: 'Marketing Advertising Policy', price: 33.99, type: 'policy', desc: 'Compliant advertising' },
        { id: 'aes-pol-008', name: 'Practitioner Competency Policy', price: 37.99, type: 'policy', desc: 'Staff training & competency' },
        { id: 'aes-pol-009', name: 'Privacy Data Protection Policy', price: 36.99, type: 'policy', desc: 'GDPR compliance' },
        { id: 'aes-pol-010', name: 'Product Management Policy', price: 34.99, type: 'policy', desc: 'Drug & device management' },
        // Risk Assessments
        { id: 'aes-ra-001', name: 'Botulinum Toxin Administration RA', price: 32.99, type: 'ra', desc: 'Risk assessment for Botox' },
        { id: 'aes-ra-002', name: 'Chemical Skin Peels RA', price: 29.99, type: 'ra', desc: 'Chemical peel risks' },
        { id: 'aes-ra-003', name: 'Cryotherapy Cryolipolysis RA', price: 31.99, type: 'ra', desc: 'Cryotherapy risks' },
        { id: 'aes-ra-004', name: 'Dermal Filler Treatments RA', price: 33.99, type: 'ra', desc: 'Dermal filler risks' },
        { id: 'aes-ra-005', name: 'Infection Prevention Control IPC RA', price: 28.99, type: 'ra', desc: 'Infection control assessment' },
        { id: 'aes-ra-006', name: 'Laser IPL Treatments RA', price: 32.99, type: 'ra', desc: 'Laser & IPL risks' },
      ]
    },
    gp: {
      name: 'GP Surgery',
      icon: '⚕️',
      bundlePrice: 519.99,
      items: [
        { id: 'gp-pol-001', name: 'Complaints Handling', price: 36.99, type: 'policy', desc: 'Patient complaint procedures' },
        { id: 'gp-pol-002', name: 'Consent and Confidentiality', price: 38.99, type: 'policy', desc: 'Consent & confidentiality' },
        { id: 'gp-pol-003', name: 'Data Protection and Information Governance', price: 37.99, type: 'policy', desc: 'GDPR & data governance' },
        { id: 'gp-pol-004', name: 'Equality Diversity and Inclusion', price: 33.99, type: 'policy', desc: 'Equality & diversity' },
        { id: 'gp-pol-005', name: 'Fire Safety', price: 34.99, type: 'policy', desc: 'Fire safety procedures' },
        { id: 'gp-pol-006', name: 'Health and Safety', price: 38.99, type: 'policy', desc: 'Health & safety standards' },
        { id: 'gp-pol-007', name: 'Infection Prevention and Control', price: 35.99, type: 'policy', desc: 'Infection control' },
        { id: 'gp-pol-008', name: 'Lone Working', price: 32.99, type: 'policy', desc: 'Lone worker safety' },
        { id: 'gp-pol-009', name: 'Medicines Management', price: 39.99, type: 'policy', desc: 'Safe medicines management' },
        { id: 'gp-pol-010', name: 'Safeguarding Children and Adults', price: 37.99, type: 'policy', desc: 'Safeguarding procedures' },
        { id: 'gp-ra-001', name: 'COSHH RA', price: 28.99, type: 'ra', desc: 'Hazardous substances' },
        { id: 'gp-ra-002', name: 'Data Protection RA', price: 27.99, type: 'ra', desc: 'Data security assessment' },
        { id: 'gp-ra-003', name: 'Display Screen Equipment DSE RA', price: 26.99, type: 'ra', desc: 'Screen work assessment' },
        { id: 'gp-ra-004', name: 'Fire Safety RA', price: 29.99, type: 'ra', desc: 'Fire safety assessment' },
        { id: 'gp-ra-005', name: 'Infection Prevention and Control RA', price: 28.99, type: 'ra', desc: 'IPC assessment' },
        { id: 'gp-ra-006', name: 'Lone Working RA', price: 25.99, type: 'ra', desc: 'Lone working assessment' },
      ]
    },
    'private-health': {
      name: 'Private Healthcare',
      icon: '🏥',
      bundlePrice: 579.99,
      items: [
        { id: 'ph-pol-001', name: 'Business Continuity Policy', price: 37.99, type: 'policy', desc: 'Business continuity planning' },
        { id: 'ph-pol-002', name: 'Clinical Governance Policy', price: 39.99, type: 'policy', desc: 'Clinical governance' },
        { id: 'ph-pol-003', name: 'Complaints Handling Policy', price: 36.99, type: 'policy', desc: 'Complaint procedures' },
        { id: 'ph-pol-004', name: 'Consent to Treatment Policy', price: 35.99, type: 'policy', desc: 'Treatment consent' },
        { id: 'ph-pol-005', name: 'Data Protection and Confidentiality Policy', price: 37.99, type: 'policy', desc: 'Data confidentiality' },
        { id: 'ph-pol-006', name: 'Health and Safety Policy', price: 38.99, type: 'policy', desc: 'Health & safety' },
        { id: 'ph-pol-007', name: 'Infection Prevention and Control Policy', price: 35.99, type: 'policy', desc: 'Infection control' },
        { id: 'ph-pol-008', name: 'Medicines Management Policy', price: 39.99, type: 'policy', desc: 'Medicines management' },
        { id: 'ph-pol-009', name: 'Safeguarding Adults Policy', price: 36.99, type: 'policy', desc: 'Adult safeguarding' },
        { id: 'ph-pol-010', name: 'Staffing and Recruitment Policy', price: 33.99, type: 'policy', desc: 'Recruitment & staffing' },
        { id: 'ph-ra-001', name: 'COSHH RA', price: 28.99, type: 'ra', desc: 'Hazardous substances' },
        { id: 'ph-ra-002', name: 'Fire Safety RA', price: 29.99, type: 'ra', desc: 'Fire safety assessment' },
      ]
    },
    adhd: {
      name: 'ADHD Clinic',
      icon: '🧠',
      bundlePrice: 429.99,
      items: [
        { id: 'adhd-pol-001', name: 'ADHD Assessment Protocol', price: 36.99, type: 'policy', desc: 'Assessment documentation' },
        { id: 'adhd-pol-002', name: 'Medication Management & Shared Care', price: 38.99, type: 'policy', desc: 'Shared care agreements' },
        { id: 'adhd-pol-003', name: 'Safeguarding Children & Young People', price: 37.99, type: 'policy', desc: 'Child safeguarding' },
        { id: 'adhd-pol-004', name: 'Consent & Capacity Assessment', price: 35.99, type: 'policy', desc: 'Consent procedures' },
        { id: 'adhd-pol-005', name: 'Confidentiality & Data Protection', price: 36.99, type: 'policy', desc: 'Data protection' },
        { id: 'adhd-pol-006', name: 'Complaints Handling', price: 34.99, type: 'policy', desc: 'Complaint procedures' },
        { id: 'adhd-pol-007', name: 'Clinical Governance', price: 39.99, type: 'policy', desc: 'Clinical governance' },
        { id: 'adhd-pol-008', name: 'Health & Safety', price: 33.99, type: 'policy', desc: 'Health & safety' },
        { id: 'adhd-ra-001', name: 'Medication Safety & Prescribing RA', price: 32.99, type: 'ra', desc: 'Medication safety' },
        { id: 'adhd-ra-002', name: 'Safeguarding Risk RA', price: 31.99, type: 'ra', desc: 'Safeguarding assessment' },
        { id: 'adhd-ra-003', name: 'Assessment Validity RA', price: 29.99, type: 'ra', desc: 'Assessment validity' },
        { id: 'adhd-ra-004', name: 'Data Protection RA', price: 28.99, type: 'ra', desc: 'Data security assessment' },
        { id: 'adhd-ra-005', name: 'Patient Consent Capacity RA', price: 27.99, type: 'ra', desc: 'Consent assessment' },
      ]
    },
    weightloss: {
      name: 'Weight Loss Clinic',
      icon: '⚖️',
      bundlePrice: 559.99,
      items: [
        { id: 'wl-pol-001', name: 'GLP-1 & Weight Loss Medication Prescribing', price: 38.99, type: 'policy', desc: 'GLP-1 prescribing protocol' },
        { id: 'wl-pol-002', name: 'Cardiovascular Assessment & Monitoring', price: 37.99, type: 'policy', desc: 'CV monitoring' },
        { id: 'wl-pol-003', name: 'Psychological Screening & Assessment', price: 36.99, type: 'policy', desc: 'Psychological assessment' },
        { id: 'wl-pol-004', name: 'Informed Consent & Risk Disclosure', price: 35.99, type: 'policy', desc: 'Informed consent' },
        { id: 'wl-pol-005', name: 'Safeguarding (Eating Disorders)', price: 37.99, type: 'policy', desc: 'ED safeguarding' },
        { id: 'wl-pol-006', name: 'Data Protection & Confidentiality', price: 36.99, type: 'policy', desc: 'Data protection' },
        { id: 'wl-pol-007', name: 'Complaints Handling', price: 34.99, type: 'policy', desc: 'Complaint procedures' },
        { id: 'wl-pol-008', name: 'Clinical Governance', price: 39.99, type: 'policy', desc: 'Clinical governance' },
        { id: 'wl-pol-009', name: 'Health & Safety at Work', price: 33.99, type: 'policy', desc: 'Health & safety' },
        { id: 'wl-pol-010', name: 'Staff Training & Competency', price: 35.99, type: 'policy', desc: 'Staff training' },
        { id: 'wl-ra-001', name: 'Cardiovascular Risk RA', price: 33.99, type: 'ra', desc: 'CV risk assessment' },
        { id: 'wl-ra-002', name: 'Medication Safety (GLP-1) RA', price: 32.99, type: 'ra', desc: 'GLP-1 safety assessment' },
      ]
    },
    telehealth: {
      name: 'Online/Virtual Clinic',
      icon: '💻',
      bundlePrice: 559.99,
      items: [
        { id: 'th-pol-001', name: 'Telehealth Consent & Patient Verification', price: 37.99, type: 'policy', desc: 'Remote consent procedures' },
        { id: 'th-pol-002', name: 'Digital Security & Cybersecurity', price: 38.99, type: 'policy', desc: 'Cybersecurity policy' },
        { id: 'th-pol-003', name: 'Remote Patient Assessment Protocol', price: 36.99, type: 'policy', desc: 'Remote assessment' },
        { id: 'th-pol-004', name: 'Confidentiality & Data Protection (GDPR + Telehealth)', price: 37.99, type: 'policy', desc: 'Remote data protection' },
        { id: 'th-pol-005', name: 'Emergency Response & Patient Escalation', price: 35.99, type: 'policy', desc: 'Emergency procedures' },
        { id: 'th-pol-006', name: 'Prescribing via Telemedicine', price: 39.99, type: 'policy', desc: 'Remote prescribing' },
        { id: 'th-pol-007', name: 'Clinical Governance (Remote Delivery)', price: 38.99, type: 'policy', desc: 'Remote governance' },
        { id: 'th-pol-008', name: 'Service Continuity & Technology Failure', price: 36.99, type: 'policy', desc: 'Business continuity' },
        { id: 'th-pol-009', name: 'Complaints Handling', price: 34.99, type: 'policy', desc: 'Complaint procedures' },
        { id: 'th-pol-010', name: 'Health & Safety (Home-based)', price: 33.99, type: 'policy', desc: 'Remote H&S' },
        { id: 'th-ra-001', name: 'Digital Access/Exclusion RA', price: 31.99, type: 'ra', desc: 'Digital access assessment' },
        { id: 'th-ra-002', name: 'Cybersecurity & Data Breach RA', price: 32.99, type: 'ra', desc: 'Cyber risk assessment' },
      ]
    }
  };

  const current = SECTORS[selectedSector as keyof typeof SECTORS];
  const filtered = current.items.filter(item => {
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesSearch = searchTerm === '' || item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const policyCount = current.items.filter(i => i.type === 'policy').length;
  const raCount = current.items.filter(i => i.type === 'ra').length;

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", color: '#1a1a1a', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      {/* HEADER */}
      <header style={{ backgroundColor: '#0B1D3A', color: '#fff', padding: '2rem 1.5rem', borderBottom: '1px solid #1a2f4a' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
              <div style={{ backgroundColor: '#D4AF37', color: '#0B1D3A', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>BS</div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '16px' }}>BarkerScott</div>
                <div style={{ fontSize: '11px', color: '#d1d5db', fontWeight: '600' }}>CQC COMPLIANCE</div>
              </div>
            </div>
          </Link>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <button style={{ backgroundColor: 'transparent', color: '#D4AF37', border: '2px solid #D4AF37', padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>
              ← Back
            </button>
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section style={{ padding: '3rem 1.5rem', backgroundColor: '#fff', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#0B1D3A', marginBottom: '0.5rem' }}>
            Templates for {current.name}
          </h1>
          <p style={{ fontSize: '16px', color: '#666', marginBottom: '0' }}>
            {policyCount} policies + {raCount} risk assessments | Bundle all {current.items.length} items for £{current.bundlePrice}
          </p>
        </div>
      </section>

      {/* SECTOR TABS */}
      <section style={{ padding: '2rem 1.5rem', backgroundColor: '#fff', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem' }}>
          {Object.entries(SECTORS).map(([key, sector]) => (
            <button
              key={key}
              onClick={() => { setSelectedSector(key); setSearchTerm(''); }}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: selectedSector === key ? '#D4AF37' : '#f9f9f9',
                color: selectedSector === key ? '#0B1D3A' : '#666',
                border: `2px solid ${selectedSector === key ? '#D4AF37' : '#e5e5e5'}`,
                borderRadius: '6px',
                fontWeight: selectedSector === key ? '700' : '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontSize: '14px'
              }}
            >
              {sector.icon} {sector.name}
            </button>
          ))}
        </div>
      </section>

      {/* FILTERS & SEARCH */}
      <section style={{ padding: '2rem 1.5rem', backgroundColor: '#fff', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {/* SEARCH */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#0B1D3A', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                Search
              </label>
              <input
                type="text"
                placeholder="Find a policy or risk assessment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e5e5e5',
                  borderRadius: '6px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* TYPE FILTER */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#0B1D3A', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as 'all' | 'policy' | 'ra')}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e5e5e5',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                <option value="all">All ({current.items.length})</option>
                <option value="policy">Policies ({policyCount})</option>
                <option value="ra">Risk Assessments ({raCount})</option>
              </select>
            </div>

            {/* BUNDLE CTA */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <button style={{
                backgroundColor: '#D4AF37',
                color: '#0B1D3A',
                padding: '0.75rem 1.5rem',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '700',
                fontSize: '14px',
                cursor: 'pointer'
              }}>
                🎁 Bundle All {current.items.length} for £{current.bundlePrice}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section style={{ padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
              <p style={{ fontSize: '16px' }}>No templates match your search.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
              {filtered.map((item) => (
                <div key={item.id} style={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e5e5',
                  borderRadius: '8px',
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      color: item.type === 'policy' ? '#3B82F6' : '#8B5CF6',
                      textTransform: 'uppercase',
                      backgroundColor: item.type === 'policy' ? '#EFF6FF' : '#F5F3FF',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '4px'
                    }}>
                      {item.type === 'policy' ? 'Policy' : 'Risk Assessment'}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0B1D3A', marginBottom: '0.5rem' }}>
                    {item.name}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#666', marginBottom: '1.5rem', flex: 1 }}>
                    {item.desc}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #e5e5e5' }}>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: '#D4AF37' }}>
                      £{item.price}
                    </div>
                    <button style={{
                      backgroundColor: 'transparent',
                      color: '#D4AF37',
                      border: '1px solid #D4AF37',
                      padding: '0.5rem 1rem',
                      borderRadius: '6px',
                      fontWeight: '600',
                      fontSize: '13px',
                      cursor: 'pointer'
                    }}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '2rem 1.5rem', backgroundColor: '#000', color: '#999', textAlign: 'center', fontSize: '13px', borderTop: '1px solid #222' }}>
        <p>© 2026 BarkerScott Ltd. All rights reserved.</p>
      </footer>
    </div>
  );
}
