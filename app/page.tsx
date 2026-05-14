export default function Home() {
  return (
    <main style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <header style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', padding: '1.5rem 2rem', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#0B1D3A' }}>BS Barker Scott</h1>
          <nav style={{ display: 'flex', gap: '2rem' }}>
            <a href="#services" style={{ color: '#0B1D3A', textDecoration: 'none' }}>Services</a>
            <a href="/policies" style={{ color: '#0B1D3A', textDecoration: 'none' }}>Policies</a>
            <a href="#contact" style={{ color: '#0B1D3A', textDecoration: 'none' }}>Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(to right, #0B1D3A, #0E7C7B)', color: 'white', padding: '5rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>
            Achieve CQC Compliance <br />
            <span style={{ color: '#fbbf24' }}>With Confidence.</span>
          </h2>
          <p style={{ fontSize: '1.125rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Barker Scott Ltd provides specialist CQC compliance consultancy and policy templates for private healthcare providers across the UK.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#contact" style={{ padding: '0.75rem 2rem', backgroundColor: 'white', color: '#0B1D3A', borderRadius: '0.5rem', fontWeight: 'bold', textDecoration: 'none', cursor: 'pointer', display: 'inline-block' }}>Book a Free Consultation</a>
            <a href="/policies" style={{ padding: '0.75rem 2rem', border: '2px solid white', color: 'white', borderRadius: '0.5rem', fontWeight: 'bold', textDecoration: 'none', cursor: 'pointer', display: 'inline-block' }}>View Policies</a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" style={{ padding: '4rem 2rem', backgroundColor: '#f9fafb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '3rem', fontWeight: 'bold' }}>Our Services</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {[
              { title: 'CQC Registration', description: 'End-to-end guidance through CQC registration' },
              { title: 'Monthly Auditing', description: 'Ongoing compliance audits to maintain your rating' },
              { title: 'Risk Assessments', description: 'Comprehensive, CQC-aligned assessments' },
              { title: 'Policy Development', description: 'Bespoke policies aligned to CQC requirements' },
              { title: 'Mock Inspections', description: 'Thorough inspections before the regulator' },
              { title: 'Staff Training', description: 'Compliance training for your team' },
            ].map((service, i) => (
              <div key={i} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 'bold', color: '#0B1D3A' }}>{service.title}</h3>
                <p style={{ color: '#6b7280' }}>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '2rem', fontWeight: 'bold', color: '#0B1D3A' }}>Book a Free Consultation</h2>
          <form style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: '#0B1D3A' }}>Full Name *</label>
              <input type="text" style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }} required />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: '#0B1D3A' }}>Email *</label>
              <input type="email" style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }} required />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: '#0B1D3A' }}>Phone *</label>
              <input type="tel" style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }} required />
            </div>
            <button type="submit" style={{ padding: '0.75rem', backgroundColor: '#0B1D3A', color: 'white', border: 'none', borderRadius: '0.375rem', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>Book Consultation</button>
          </form>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginTop: '3rem', textAlign: 'center' }}>
            <div>
              <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📞</p>
              <a href="tel:07407184948" style={{ fontWeight: 'bold', color: '#0B1D3A', textDecoration: 'none' }}>07407 184948</a>
            </div>
            <div>
              <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✉️</p>
              <a href="mailto:info@barkerscott.co.uk" style={{ fontWeight: 'bold', color: '#0B1D3A', textDecoration: 'none' }}>Email</a>
            </div>
            <div>
              <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📍</p>
              <p style={{ fontWeight: 'bold', color: '#0B1D3A' }}>Essex, UK</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#0B1D3A', color: 'white', padding: '2rem', textAlign: 'center' }}>
        <p>© 2025 Barker Scott Ltd. All rights reserved.</p>
      </footer>
    </main>
  );
}