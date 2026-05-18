'use client';

import { useState } from 'react';

const bundleData = {
  'care-home-starter': {
    name: 'Care Home Starter Bundle',
    description: '8 essential documents (5 policies + 3 risk assessments)',
    files: [
      { name: 'Safeguarding Adults Policy', path: '/downloads/policies/care-home/safeguarding-adults-policy.docx' },
      { name: 'Infection Prevention & Control Policy', path: '/downloads/policies/care-home/infection-prevention-control-policy.docx' },
      { name: 'Recruitment & Staff Suitability Policy', path: '/downloads/policies/care-home/recruitment-staff-suitability-policy.docx' },
      { name: 'Safeguarding Adults Risk Assessment', path: '/downloads/risk-assessments/care-home/safeguarding-adults.docx' },
      { name: 'Infection Control Risk Assessment', path: '/downloads/risk-assessments/care-home/infection-prevention-control.docx' },
      { name: 'Falls Prevention Risk Assessment', path: '/downloads/risk-assessments/care-home/Falls-prevention-management.docx' },
      { name: 'Lone Working Risk Assessment', path: '/downloads/risk-assessments/care-home/lone-working-staff-safety.docx' },
      { name: 'Medication Management Risk Assessment', path: '/downloads/risk-assessments/care-home/medication-management.docx' },
    ],
  },
  'dental-pro': {
    name: 'Dental Pro Bundle',
    description: '13 comprehensive documents (8 policies + 5 risk assessments)',
    files: [
      { name: 'Safeguarding Policy', path: '/downloads/policies/dental/safeguarding-children-vulnerable-adults-policy.docx' },
      { name: 'Infection Control Policy', path: '/downloads/policies/dental/infection-prevention-control-policy.docx' },
      { name: 'Data Protection Policy', path: '/downloads/policies/dental/data-protection-confidentiality-policy.docx' },
      { name: 'Medical Emergencies Policy', path: '/downloads/policies/dental/medical-emergencies-policy.docx' },
      { name: 'Consent to Treatment Policy', path: '/downloads/policies/dental/consent-to-treatment-policy.docx' },
      { name: 'Complaints Handling Policy', path: '/downloads/policies/dental/complaints-handling-policy.docx' },
      { name: 'Whistleblowing Policy', path: '/downloads/policies/dental/whistleblowing-raising-concerns-policy.docx' },
      { name: 'Staff Training Policy', path: '/downloads/policies/dental/staff-training-cpd-competency-policy.docx' },
      { name: 'Safeguarding Risk Assessment', path: '/downloads/risk-assessments/dental/safeguarding-vulnerable_patients-adults-children-risk-assessment.docx' },
    ],
  },
  'aesthetic-complete': {
    name: 'Aesthetic Complete Bundle',
    description: '20 complete documents (10 policies + 10 risk assessments)',
    files: [
      { name: 'Client Safeguarding Policy', path: '/downloads/policies/aesthetic/client-safeguarding-policy.docx' },
      { name: 'Privacy & Data Protection Policy', path: '/downloads/policies/aesthetic/privacy-data-protection-policy.docx' },
      { name: 'Health & Safety Policy', path: '/downloads/policies/aesthetic/health-safety-policy.docx' },
      { name: 'Infection Control Policy', path: '/downloads/policies/aesthetic/infection-control-policy.docx' },
      { name: 'Adverse Event Management Policy', path: '/downloads/policies/aesthetic/adverse-event-management-policy.docx' },
      { name: 'Practitioner Competency Policy', path: '/downloads/policies/aesthetic/practitioner-competency-policy.docx' },
      { name: 'Chemical Skin Peels Risk Assessment', path: '/downloads/risk-assessments/aesthetic/chemical-skin-peels.docx' },
      { name: 'Laser & IPL Risk Assessment', path: '/downloads/risk-assessments/aesthetic/laser-intense-pulsed-light-ipl-treatments.docx' },
      { name: 'Botox Administration Risk Assessment', path: '/downloads/risk-assessments/aesthetic/botulinum-toxin-botox-administration.docx' },
    ],
  },
};

export default function BundlesPage() {
  const [selectedBundle, setSelectedBundle] = useState(null);

  const bundle = selectedBundle ? bundleData[selectedBundle] : null;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#0066cc', marginBottom: '10px' }}>📦 Bundle Downloads</h1>
        <p style={{ color: '#666', fontSize: '16px' }}>Select your bundle to download all files</p>
      </div>

      {!bundle ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {Object.entries(bundleData).map(([key, data]) => (
            <div key={key} onClick={() => setSelectedBundle(key)} style={{ padding: '20px', border: '2px solid #0066cc', borderRadius: '8px', cursor: 'pointer', background: '#f9f9f9' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#e3f2fd'; }} onMouseLeave={(e) => { e.currentTarget.style.background = '#f9f9f9'; }}>
              <h3 style={{ color: '#0066cc', margin: '0 0 10px 0' }}>{data.name}</h3>
              <p style={{ color: '#666', margin: '0', fontSize: '14px' }}>{data.description}</p>
              <p style={{ color: '#0066cc', margin: '10px 0 0 0', fontSize: '14px', fontWeight: 'bold' }}>View files →</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={() => setSelectedBundle(null)} style={{ padding: '10px 20px', background: '#0066cc', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px', fontSize: '14px' }}>← Back to Bundles</button>
          <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
            <h2 style={{ color: '#0066cc', margin: '0 0 10px 0' }}>{bundle.name}</h2>
            <p style={{ color: '#666', margin: '0', fontSize: '14px' }}>{bundle.description}</p>
          </div>
          <div>
            <h3 style={{ color: '#333', marginBottom: '15px' }}>📄 Files in this bundle:</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {bundle.files.map((file, idx) => (
                <a key={idx} href={file.path} download style={{ padding: '12px 15px', background: '#e3f2fd', border: '1px solid #0066cc', borderRadius: '4px', textDecoration: 'none', color: '#0066cc', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.background = '#0066cc'; e.currentTarget.style.color = 'white'; }} onMouseLeave={(e) => { e.currentTarget.style.background = '#e3f2fd'; e.currentTarget.style.color = '#0066cc'; }}>
                  <span>{file.name}</span>
                  <span>⬇️</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}