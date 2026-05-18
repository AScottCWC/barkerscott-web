'use client';

export default function CQCRegistrationPage() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px', fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
      <h1 style={{ color: '#0066cc', marginBottom: '20px' }}>🏥 Do I Need to be CQC Registered?</h1>
      
      <div style={{ background: '#e3f2fd', padding: '20px', borderRadius: '8px', marginBottom: '30px', borderLeft: '4px solid #0066cc' }}>
        <p style={{ fontSize: '16px', margin: '0' }}><strong>In short:</strong> Most healthcare providers must be registered with CQC. If you provide healthcare services in England, you likely need to register. This page helps you determine if your organization requires CQC registration and what that means.</p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#0066cc', marginBottom: '15px' }}>Who MUST Register with CQC?</h2>
        <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
          <h3 style={{ color: '#333', marginBottom: '10px' }}>Healthcare Services</h3>
          <ul style={{ paddingLeft: '20px', margin: '0' }}>
            <li>GP practices and medical centres</li>
            <li>Dental practices (most independent practitioners)</li>
            <li>Private hospitals and clinics</li>
            <li>Cosmetic and aesthetic treatment clinics</li>
            <li>Sexual health clinics</li>
            <li>Substance abuse treatment services</li>
            <li>Mental health services</li>
          </ul>
        </div>

        <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '8px' }}>
          <h3 style={{ color: '#333', marginBottom: '10px' }}>Social Care Services</h3>
          <ul style={{ paddingLeft: '20px', margin: '0' }}>
            <li>Care homes (residential and nursing)</li>
            <li>Supported living services</li>
            <li>Day care centres</li>
            <li>Home care agencies</li>
            <li>Extra care facilities</li>
          </ul>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#0066cc', marginBottom: '15px' }}>Who Might NOT Need to Register?</h2>
        <ul style={{ paddingLeft: '20px', background: '#f5f5f5', padding: '15px', borderRadius: '8px', margin: '0' }}>
          <li>Professional therapists (some exemptions)</li>
          <li>Fitness trainers and sports coaches</li>
          <li>Some beauty and wellness services</li>
          <li>Organizations regulated by other bodies</li>
        </ul>
      </div>

      <div style={{ background: '#fff3cd', padding: '20px', borderRadius: '8px', marginBottom: '30px', borderLeft: '4px solid #ff9800' }}>
        <h3 style={{ color: '#ff6f00', marginBottom: '15px' }}>❓ Need Clarification?</h3>
        <p style={{ margin: '0' }}><strong>With Claire:</strong> Contact Claire or a CQC-registered compliance advisor for personalized guidance. <strong>Contact CQC:</strong> Visit <a href="https://www.cqc.org.uk/contact-us" target="_blank" rel="noopener noreferrer" style={{ color: '#ff6f00' }}>CQC Contact Page</a></p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#0066cc', marginBottom: '15px' }}>What Happens If You Need to Register?</h2>
        <ol style={{ paddingLeft: '20px' }}>
          <li>Complete the online application at www.cqc.org.uk</li>
          <li>Provide information about your organization and services</li>
          <li>Pay the application fee (varies by service type)</li>
          <li>Await initial assessment by CQC inspectors</li>
          <li>Receive inspection and rating (Outstanding, Good, Requires Improvement, or Inadequate)</li>
          <li>Implement recommendations from the inspection</li>
          <li>Undergo ongoing compliance monitoring and regular inspections</li>
        </ol>
      </div>

      <div style={{ background: '#e8f4f8', padding: '20px', borderRadius: '8px', marginBottom: '30px', borderLeft: '4px solid #0066cc' }}>
        <h3 style={{ color: '#0066cc', marginBottom: '15px' }}>FAQs</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <strong>Q: How much does CQC registration cost?</strong>
          <p style={{ color: '#666', marginTop: '5px', margin: '0' }}>A: Application fees vary. Registration fees range from £1,000 to £4,000+ depending on service type and size. Annual compliance fees also apply.</p>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <strong>Q: How long does registration take?</strong>
          <p style={{ color: '#666', marginTop: '5px', margin: '0' }}>A: Initial registration typically takes 8-12 weeks after submission.</p>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <strong>Q: Can I operate without CQC registration?</strong>
          <p style={{ color: '#666', marginTop: '5px', margin: '0' }}>A: If required and you operate without it, you may face legal action, fines, or closure.</p>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <strong>Q: How often does CQC inspect?</strong>
          <p style={{ color: '#666', marginTop: '5px', margin: '0' }}>A: CQC typically conducts inspections every 2-3 years, though services with concerns may be inspected more frequently.</p>
        </div>

        <div>
          <strong>Q: What happens if I get a poor rating?</strong>
          <p style={{ color: '#666', marginTop: '5px', margin: '0' }}>A: Poor ratings trigger improvement plans, frequent inspections, and potential enforcement action.</p>
        </div>
      </div>

      <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
        <h3 style={{ color: '#0066cc', marginBottom: '15px' }}>Get Professional Advice</h3>
        <p>CQC compliance is complex and regulations change frequently. Contact us for guidance.</p>
        <p style={{ color: '#0066cc', marginTop: '15px', fontWeight: 'bold' }}>📧 Contact: <a href="mailto:support@barker-scott.co.uk" style={{ color: '#0066cc', textDecoration: 'none' }}>support@barker-scott.co.uk</a></p>
      </div>
    </div>
  );
}