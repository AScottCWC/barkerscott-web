'use client';

import { useState } from 'react';

const policies = [
  { name: 'Care Home Starter', price: 199.99, policies: 5, riskAssessments: 3 },
  { name: 'Dental Pro', price: 299.99, policies: 8, riskAssessments: 5 },
  { name: 'Aesthetic Complete', price: 349.99, policies: 10, riskAssessments: 10 },
];

const downloadFiles = {
  'Care Home Starter': [
    { name: 'Safeguarding Adults Policy', path: '/downloads/policies/care-home/safeguarding-adults-policy.docx.docx' },
    { name: 'Infection Control Policy', path: '/downloads/policies/care-home/infection-prevention-control-policy.docx.docx' },
    { name: 'Safeguarding Risk Assessment', path: '/downloads/risk-assessments/care-home/safeguarding-adults.docx.docx' },
  ],
  'Dental Pro': [
    { name: 'Dental Safeguarding Policy', path: '/downloads/policies/dental/safeguarding-children-vulnerable-adults-policy.docx.docx' },
    { name: 'Infection Control Policy', path: '/downloads/policies/dental/infection-prevention-control-policy.docx.docx' },
    { name: 'Safeguarding Risk Assessment', path: '/downloads/risk-assessments/dental/safeguarding-vulnerable_patients-adults-children-risk-assessment.docx.docx' },
  ],
  'Aesthetic Complete': [
    { name: 'Client Safeguarding Policy', path: '/downloads/policies/aesthetic/client-safeguarding-policy.docx.docx' },
    { name: 'Infection Control Policy', path: '/downloads/policies/aesthetic/infection-control-policy.docx.docx' },
    { name: 'Health & Safety Policy', path: '/downloads/policies/aesthetic/health-safety-policy.docx.docx' },
  ],
};

export default function PoliciesPage() {
  const [selectedBundle, setSelectedBundle] = useState<string | null>(null);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#0066cc', textAlign: 'center', marginBottom: '40px' }}>📋 Healthcare Compliance Bundles</h1>

      {!selectedBundle ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          {policies.map((bundle) => (
            <div key={bundle.name} style={{ padding: '20px', border: '2px solid #0066cc', borderRadius: '8px', background: '#f9f9f9', cursor: 'pointer' }} onClick={() => setSelectedBundle(bundle.name)} onMouseEnter={(e) => e.currentTarget.style.background = '#e3f2fd'} onMouseLeave={(e) => e.currentTarget.style.background = '#f9f9f9'}>
              <h3 style={{ color: '#0066cc', margin: '0 0 10px 0' }}>{bundle.name}</h3>
              <p style={{ color: '#666', margin: '5px 0' }}>{bundle.policies} Policies</p>
              <p style={{ color: '#666', margin: '5px 0 15px 0' }}>{bundle.riskAssessments} Risk Assessments</p>
              <p style={{ color: '#0066cc', fontSize: '18px', fontWeight: 'bold', margin: '0' }}>£{bundle.price.toFixed(2)}</p>
              <p style={{ color: '#0066cc', marginTop: '15px', fontSize: '14px', fontWeight: 'bold' }}>View & Download →</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={() => setSelectedBundle(null)} style={{ padding: '10px 20px', background: '#0066cc', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px' }}>← Back to Bundles</button>
          
          <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
            <h2 style={{ color: '#0066cc', margin: '0 0 10px 0' }}>{selectedBundle}</h2>
            <p style={{ color: '#666', margin: '0' }}>Click any file below to download instantly</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' }}>
            {(downloadFiles[selectedBundle as keyof typeof downloadFiles] || []).map((file, idx) => (
              <a key={idx} href={file.path} download style={{ padding: '15px', background: '#e3f2fd', border: '2px solid #0066cc', borderRadius: '6px', textDecoration: 'none', color: '#0066cc', fontWeight: '500', fontSize: '14px', cursor: 'pointer', textAlign: 'center', display: 'block' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#0066cc'; e.currentTarget.style.color = 'white'; }} onMouseLeave={(e) => { e.currentTarget.style.background = '#e3f2fd'; e.currentTarget.style.color = '#0066cc'; }}>
                ⬇️ {file.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}