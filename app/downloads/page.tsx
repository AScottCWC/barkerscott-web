'use client';

import { useState } from 'react';

const downloadSections = {
  policies: {
    title: '📋 Policies',
    files: [
      { name: 'Safeguarding Adults Policy', path: '/downloads/policies/care-home/safeguarding-adults-policy.docx.docx' },
      { name: 'Infection Prevention & Control Policy', path: '/downloads/policies/care-home/infection-prevention-control-policy.docx.docx' },
      { name: 'Dental Safeguarding Policy', path: '/downloads/policies/dental/safeguarding-children-vulnerable-adults-policy.docx.docx' },
    ],
  },
};

export default function DownloadsPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>('policies');

  const handleDownload = (filePath: string) => {
    const link = document.createElement('a');
    link.href = filePath;
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#0066cc' }}>📥 Download Your Templates</h1>
      {Object.entries(downloadSections).map(([sectionKey, section]) => (
        <div key={sectionKey}>
          <button onClick={() => setExpandedSection(expandedSection === sectionKey ? null : sectionKey)} style={{ width: '100%', padding: '15px', background: '#0066cc', color: 'white', border: 'none', cursor: 'pointer', fontSize: '16px' }}>
            {section.title}
          </button>
          {expandedSection === sectionKey && (
            <div style={{ padding: '20px' }}>
              {section.files.map((file, idx) => (
                <button key={idx} onClick={() => handleDownload(file.path)} style={{ display: 'block', width: '100%', padding: '10px', margin: '10px 0', background: '#e3f2fd', border: '1px solid #0066cc', borderRadius: '4px', cursor: 'pointer', color: '#0066cc' }}>
                  ⬇️ {file.name}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}