'use client';

import { useState } from 'react';

const downloadSections = {
  policies: {
    title: '📋 Policies',
    files: [
      { name: 'Safeguarding Adults Policy', path: '/downloads/policies/care-home/safeguarding-adults-policy.docx.docx' },
      { name: 'Infection Prevention & Control Policy', path: '/downloads/policies/care-home/infection-prevention-control-policy.docx.docx' },
      { name: 'Recruitment & Staff Suitability Policy', path: '/downloads/policies/care-home/recruitment-staff-suitability-policy.docx.docx' },
      { name: 'Medication Management Policy', path: '/downloads/policies/care-home/medication-management-policy.docx.docx' },
      { name: 'Fire Safety Policy', path: '/downloads/policies/care-home/fire-safety-policy.docx.docx' },
      { name: 'Mental Capacity & Deprivation of Liberty Policy', path: '/downloads/policies/care-home/mental-capacity-deprivation-of-liberty-safeguards-dols-policy.docx.docx' },
      { name: 'Moving & Handling Policy', path: '/downloads/policies/care-home/moving-handling-policy.docx.docx' },
      { name: 'Falls Prevention & Management Policy', path: '/downloads/policies/care-home/falls-prevention-management-policy.docx.docx' },
      { name: 'End of Life Care Policy', path: '/downloads/policies/care-home/end-of-life-care-policy.docx.docx' },
      { name: 'Complaints & Compliments Policy', path: '/downloads/policies/care-home/complaints-compliments-policy.docx.docx' },
      { name: 'Dental Safeguarding Policy', path: '/downloads/policies/dental/safeguarding-children-vulnerable-adults-policy.docx.docx' },
      { name: 'Dental Infection Control Policy', path: '/downloads/policies/dental/infection-prevention-control-policy.docx.docx' },
      { name: 'Dental Data Protection Policy', path: '/downloads/policies/dental/data-protection-confidentiality-policy.docx.docx' },
      { name: 'Medical Emergencies Policy', path: '/downloads/policies/dental/medical-emergencies-policy.docx.docx' },
      { name: 'Consent to Treatment Policy', path: '/downloads/policies/dental/consent-to-treatment-policy.docx.docx' },
      { name: 'Complaints Handling Policy', path: '/downloads/policies/dental/complaints-handling-policy.docx.docx' },
      { name: 'Whistleblowing Policy', path: '/downloads/policies/dental/whistleblowing-raising-concerns-policy.docx.docx' },
      { name: 'Staff Training & CPD Policy', path: '/downloads/policies/dental/staff-training-cpd-competency-policy.docx.docx' },
      { name: 'Radiation Protection Policy', path: '/downloads/policies/dental/radiation-protection-policy.docx.docx' },
      { name: 'Equality & Diversity Policy', path: '/downloads/policies/dental/equality-diversity-Reasonable-adjustments-policy.docx.docx' },
    ],
  },
  assessments: {
    title: '⚠️ Risk Assessments',
    files: [
      { name: 'Safeguarding Adults Risk Assessment', path: '/downloads/risk-assessments/care-home/safeguarding-adults.docx.docx' },
      { name: 'Infection Control Risk Assessment', path: '/downloads/risk-assessments/care-home/infection-prevention-control.docx.docx' },
      { name: 'Falls Prevention Risk Assessment', path: '/downloads/risk-assessments/care-home/Falls-prevention-management.docx.docx' },
      { name: 'Lone Working Risk Assessment', path: '/downloads/risk-assessments/care-home/lone-working-staff-safety.docx.docx' },
      { name: 'Medication Management Risk Assessment', path: '/downloads/risk-assessments/care-home/medication-management.docx.docx' },
      { name: 'Nutrition & Hydration Risk Assessment', path: '/downloads/risk-assessments/care-home/nutrition-hydration-choking.docx.docx' },
      { name: 'Pressure Ulcer Prevention Risk Assessment', path: '/downloads/risk-assessments/care-home/pressure-ulcer-prevention-skin-integrity.docx.docx' },
      { name: 'Moving & Handling Risk Assessment', path: '/downloads/risk-assessments/care-home/moving-handling.docx.docx' },
      { name: 'Mental Capacity Risk Assessment', path: '/downloads/risk-assessments/care-home/mental-capacity-deprivation-of-liberty.docx.docx' },
      { name: 'Fire Safety Risk Assessment', path: '/downloads/risk-assessments/care-home/fire-safety.docx.docx' },
      { name: 'Dental Safeguarding Risk Assessment', path: '/downloads/risk-assessments/dental/safeguarding-vulnerable_patients-adults-children-risk-assessment.docx.docx' },
      { name: 'Dental Medical Emergencies Risk Assessment', path: '/downloads/risk-assessments/dental/medical-emergencies-in-the-dental-practice-risk-assessment.docx.docx' },
      { name: 'Aesthetic Chemical Skin Peels Risk Assessment', path: '/downloads/risk-assessments/aesthetic/chemical-skin-peels.docx.docx' },
      { name: 'Aesthetic Laser & IPL Risk Assessment', path: '/downloads/risk-assessments/aesthetic/laser-intense-pulsed-light-ipl-treatments.docx.docx' },
      { name: 'Aesthetic Botox Administration Risk Assessment', path: '/downloads/risk-assessments/aesthetic/botulinum-toxin-botox-administration.docx.docx' },
    ],
  },
};

export default function DownloadsPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>('policies');

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#0066cc', marginBottom: '10px', fontSize: '32px' }}>📥 Download Your Templates</h1>
        <p style={{ color: '#666', fontSize: '16px' }}>Click any file below to download instantly</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {Object.entries(downloadSections).map(([sectionKey, section]) => (
          <div key={sectionKey} style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
            <button
              onClick={() => setExpandedSection(expandedSection === sectionKey ? null : sectionKey)}
              style={{
                width: '100%',
                padding: '15px 20px',
                background: '#f9f9f9',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#0066cc',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>{section.title}</span>
              <span>{expandedSection === sectionKey ? '▼' : '▶'}</span>
            </button>

            {expandedSection === sectionKey && (
              <div style={{ padding: '20px', background: '#fff' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' }}>
                  {section.files.map((file, idx) => (
                    
                      key={idx}
                      href={file.path}
                      download
                      style={{
                        padding: '15px',
                        background: '#e3f2fd',
                        border: '2px solid #0066cc',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        color: '#0066cc',
                        fontWeight: '500',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'block',
                        textAlign: 'center',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#0066cc';
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#e3f2fd';
                        e.currentTarget.style.color = '#0066cc';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      ⬇️ {file.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '40px', padding: '20px', background: '#f5f5f5', borderRadius: '8px', borderLeft: '4px solid #0066cc' }}>
        <h3 style={{ color: '#0066cc', margin: '0 0 10px 0' }}>💡 Tips:</h3>
        <ul style={{ margin: '0', paddingLeft: '20px', color: '#666', fontSize: '14px' }}>
          <li>All files are Microsoft Word templates (.docx)</li>
          <li>Click any file to download instantly</li>
          <li>Edit the files with your organization's specific information</li>
          <li>Review with legal or compliance professionals before use</li>
        </ul>
      </div>
    </div>
  );
}