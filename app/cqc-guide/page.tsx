'use client';

export default function CQCInterpretationPage() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px', fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
      <h1 style={{ color: '#0066cc', marginBottom: '20px' }}>📋 CQC Law & Regulations - Interpretation Guide</h1>
      
      <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '30px', borderLeft: '4px solid #0066cc' }}>
        <h2 style={{ color: '#0066cc', marginBottom: '15px' }}>Understanding CQC Requirements</h2>
        <p>The Care Quality Commission (CQC) regulates health and social care in England. This guide helps you interpret and implement CQC standards in your organization.</p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#0066cc', marginBottom: '15px' }}>Key CQC Standards</h2>
        <ul style={{ paddingLeft: '20px' }}>
          <li><strong>Safe:</strong> People are protected from abuse and neglect. Procedures for safeguarding must be in place.</li>
          <li><strong>Effective:</strong> People's care, treatment and support achieves good outcomes. Staff are trained and competent.</li>
          <li><strong>Caring:</strong> Staff involve and treat people with compassion, kindness, dignity and respect.</li>
          <li><strong>Responsive:</strong> Services are organized so that they meet people's needs.</li>
          <li><strong>Well-led:</strong> The leadership, management and governance of the organization assure delivery of high-quality person-centred care.</li>
        </ul>
      </div>

      <div style={{ background: '#e3f2fd', padding: '20px', borderRadius: '8px', marginBottom: '30px', borderLeft: '4px solid #0066cc' }}>
        <h3 style={{ color: '#0066cc', marginBottom: '15px' }}>What You Need to Do</h3>
        <ol style={{ paddingLeft: '20px' }}>
          <li>Review CQC standards applicable to your healthcare setting</li>
          <li>Create documented policies covering all required areas</li>
          <li>Implement procedures and train staff accordingly</li>
          <li>Maintain records demonstrating compliance</li>
          <li>Conduct regular audits and improvements</li>
          <li>Be prepared for CQC inspections at any time</li>
        </ol>
      </div>

      <div style={{ background: '#fff3cd', padding: '20px', borderRadius: '8px', marginBottom: '30px', borderLeft: '4px solid #ff9800' }}>
        <h3 style={{ color: '#ff6f00', marginBottom: '15px' }}>⚠️ Important Note</h3>
        <p>CQC regulations are complex and frequently updated. This guide provides general information only. <strong>You should consult with healthcare compliance specialists or legal advisors</strong> to ensure your organization fully complies with current CQC requirements.</p>
      </div>

      <div>
        <h3 style={{ color: '#0066cc', marginBottom: '15px' }}>Resources</h3>
        <ul style={{ paddingLeft: '20px', color: '#0066cc' }}>
          <li><a href="https://www.cqc.org.uk" target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc' }}>CQC Official Website →</a></li>
          <li><a href="https://www.cqc.org.uk/what-we-do" target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc' }}>What CQC Regulates →</a></li>
          <li><a href="https://www.cqc.org.uk/guidance-providers" target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc' }}>CQC Guidance for Providers →</a></li>
        </ul>
      </div>
    </div>
  );
}