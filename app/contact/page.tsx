'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    sector: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Submit to your form handler (e.g., Formspree, etc.)
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', sector: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", color: '#1a1a1a' }}>
      {/* HEADER */}
      <header style={{
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderBottom: '1px solid #f0f0f0',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
              <div style={{ backgroundColor: '#0B1D3A', color: '#D4AF37', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' }}>BS</div>
              <div>
                <div style={{ fontWeight: '700', color: '#0B1D3A', fontSize: '16px' }}>BarkerScott</div>
                <div style={{ fontSize: '11px', color: '#999', fontWeight: '600', letterSpacing: '0.05em' }}>CONSULTANCY</div>
              </div>
            </div>
          </Link>

          <Link href="/" style={{ textDecoration: 'none' }}>
            <button style={{
              backgroundColor: '#f0f0f0',
              color: '#0B1D3A',
              padding: '0.75rem 1.5rem',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer'
            }}>
              ← Home
            </button>
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section style={{ backgroundColor: '#0B1D3A', color: '#fff', padding: '3rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>
            BarkerScott CQC Consultancy
          </h1>
          <p style={{ fontSize: '18px', color: '#d1d5db', marginBottom: '2rem', lineHeight: '1.6' }}>
            Expert guidance on CQC compliance, policy implementation, and healthcare governance. Get in touch with our team.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section style={{ padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
            {/* CONTACT INFO */}
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: '#0B1D3A' }}>
                Get in Touch
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { icon: '📧', title: 'Email', content: 'info@barker-scott.co.uk', link: 'mailto:info@barker-scott.co.uk' },
                  { icon: '📞', title: 'Phone', content: '07407 184948', link: 'tel:07407184948' },
                  { icon: '⏰', title: 'Response Time', content: '24 hours', link: null },
                  { icon: '🕐', title: 'Hours', content: 'Monday–Friday, 9am–5pm', link: null },
                ].map((item, i) => (
                  <div key={i}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                    <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#0B1D3A', marginBottom: '0.25rem' }}>
                      {item.title}
                    </h3>
                    {item.link ? (
                      <a href={item.link} style={{ fontSize: '16px', color: '#D4AF37', textDecoration: 'none', fontWeight: '600' }}>
                        {item.content}
                      </a>
                    ) : (
                      <p style={{ fontSize: '16px', color: '#666', margin: 0 }}>{item.content}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* FORM */}
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: '#0B1D3A' }}>
                Send us a Message
              </h2>

              {submitted && (
                <div style={{
                  backgroundColor: '#e8f5e9',
                  border: '2px solid #27AE60',
                  color: '#27AE60',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                  fontWeight: '600'
                }}>
                  ✓ Message sent! We'll get back to you within 24 hours.
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#0B1D3A' }}>
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#0B1D3A' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#0B1D3A' }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                    placeholder="07407 184948"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#0B1D3A' }}>
                    Your Sector
                  </label>
                  <select
                    name="sector"
                    value={formData.sector}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '16px',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="">Select a sector...</option>
                    <option value="care-homes">Care Home</option>
                    <option value="dental">Dental Clinic</option>
                    <option value="gp">GP Surgery</option>
                    <option value="aesthetic">Aesthetic Clinic</option>
                    <option value="private-health">Private Healthcare</option>
                    <option value="online-doctor">Online Doctor</option>
                    <option value="weight-loss">Weight Loss Clinic</option>
                    <option value="adhd">ADHD Clinic</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#0B1D3A' }}>
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '6px',
                      fontSize: '16px',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box',
                      resize: 'vertical'
                    }}
                    placeholder="Tell us about your needs..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: '1rem',
                    backgroundColor: loading ? '#ccc' : '#0B1D3A',
                    color: '#D4AF37',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: '700',
                    fontSize: '16px',
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {loading ? 'Sending...' : '✓ Send Message'}
                </button>
              </form>
            </div>
          </div>

          {/* SERVICES */}
          <div style={{ paddingTop: '3rem', borderTop: '1px solid #e5e5e5' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '2rem', color: '#0B1D3A', textAlign: 'center' }}>
              How We Can Help
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem'
            }}>
              {[
                { icon: '📋', title: 'Policy Customization', desc: 'Tailor templates to your specific organization' },
                { icon: '✓', title: 'Compliance Audit', desc: 'Review your current policies for CQC readiness' },
                { icon: '🎓', title: 'Staff Training', desc: 'Educate your team on policies and procedures' },
                { icon: '🔄', title: 'Annual Reviews', desc: 'Keep policies updated and compliant' },
                { icon: '🤝', title: 'Implementation Support', desc: 'Hands-on guidance implementing policies' },
                { icon: '📊', title: 'Governance Support', desc: 'Assist with governance documentation' },
              ].map((service, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: '#f9f9f9',
                    padding: '1.5rem',
                    borderRadius: '8px',
                    border: '1px solid #e5e5e5'
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{service.icon}</div>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '0.5rem', color: '#0B1D3A' }}>
                    {service.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '3rem 1.5rem', backgroundColor: '#0B1D3A', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: '#D4AF37' }}>
            Ready to Get Compliant?
          </h2>
          <p style={{ fontSize: '16px', color: '#d1d5db', marginBottom: '2rem', lineHeight: '1.6' }}>
            Browse our templates or schedule a consultation with our CQC specialists.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/policies" style={{ textDecoration: 'none' }}>
              <button style={{
                backgroundColor: '#D4AF37',
                color: '#0B1D3A',
                padding: '1rem 1.5rem',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '700',
                cursor: 'pointer'
              }}>
                Browse Templates
              </button>
            </Link>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <button style={{
                backgroundColor: 'transparent',
                color: '#D4AF37',
                padding: '1rem 1.5rem',
                border: '2px solid #D4AF37',
                borderRadius: '6px',
                fontWeight: '700',
                cursor: 'pointer'
              }}>
                Back Home
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: '2rem 1.5rem',
        backgroundColor: '#000',
        color: '#999',
        textAlign: 'center',
        fontSize: '13px',
        borderTop: '1px solid #222'
      }}>
        <p>© 2026 BarkerScott Ltd. | CQC Compliance & Consultancy</p>
        <p style={{ marginTop: '0.5rem' }}>📞 07407 184948 | 📧 info@barker-scott.co.uk</p>
      </footer>
    </div>
  );
}