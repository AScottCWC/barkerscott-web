'use client';

import { useState } from 'react';

export default function Home() {
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '1.25rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ backgroundColor: '#0B1D3A', color: '#D4AF37', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '1.25rem' }}>BS</div>
            <div>
              <div style={{ fontWeight: '600', color: '#0B1D3A', fontSize: '1.0625rem' }}>Barker Scott Ltd</div>
              <div style={{ fontSize: '0.6875rem', color: '#D4AF37', fontWeight: '700', letterSpacing: '0.08em', marginTop: '2px' }}>CQC COMPLIANCE SPECIALISTS</div>
            </div>
          </div>
          
          <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
            <a href="#templates" style={{ color: '#6b7280', textDecoration: 'none', fontWeight: '500', fontSize: '0.875rem', letterSpacing: '0.01em', cursor: 'pointer' }}>TEMPLATES</a>
            <a href="#sectors" style={{ color: '#6b7280', textDecoration: 'none', fontWeight: '500', fontSize: '0.875rem', letterSpacing: '0.01em', cursor: 'pointer' }}>BY SECTOR</a>
            <a href="#how-it-works" style={{ color: '#6b7280', textDecoration: 'none', fontWeight: '500', fontSize: '0.875rem', letterSpacing: '0.01em', cursor: 'pointer' }}>HOW IT WORKS</a>
            <a href="#about" style={{ color: '#6b7280', textDecoration: 'none', fontWeight: '500', fontSize: '0.875rem', letterSpacing: '0.01em', cursor: 'pointer' }}>ABOUT</a>
            
            {/* Primary CTA - Shop Now */}
            <a href="/policies" style={{ backgroundColor: '#D4AF37', color: '#0B1D3A', padding: '0.65rem 1.75rem', border: 'none', fontWeight: '700', cursor: 'pointer', fontSize: '0.8125rem', letterSpacing: '0.03em', textDecoration: 'none', display: 'inline-block', borderRadius: '2px' }}>SHOP NOW</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ backgroundColor: '#0B1D3A', color: 'white', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ color: '#D4AF37', fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.12em', marginBottom: '1.5rem' }}>
            UK'S LEADING CQC COMPLIANCE TEMPLATE PROVIDER
          </div>
          
          <h1 style={{ fontSize: '4rem', fontWeight: '700', lineHeight: '1.2', marginBottom: '1.5rem' }}>
            Professional CQC Compliance<br />
            <span style={{ color: '#D4AF37' }}>Professional CQC & HSE Templates</span>
          </h1>
          
          <p style={{ fontSize: '1.125rem', lineHeight: '1.7', color: '#d1d5db', marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem' }}>
            70+ CQC-compliant policies and 60+ risk assessments created by 12+ years of compliance expertise. Professional templates ready to customize. From £39.99.
          </p>
          
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <a href="/policies" style={{ backgroundColor: '#D4AF37', color: '#0B1D3A', padding: '1rem 2.5rem', border: 'none', fontWeight: '700', cursor: 'pointer', fontSize: '0.9375rem', letterSpacing: '0.03em', textDecoration: 'none', display: 'inline-block', borderRadius: '2px' }}>BROWSE TEMPLATES</a>
            <a href="#consultation" style={{ border: '2px solid #D4AF37', color: '#D4AF37', padding: '0.875rem 2.5rem', fontWeight: '700', cursor: 'pointer', fontSize: '0.9375rem', letterSpacing: '0.03em', textDecoration: 'none', display: 'inline-block', borderRadius: '2px' }}>FREE CONSULTATION</a>
          </div>

          {/* Quick Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(212,175,55,0.25)' }}>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#D4AF37', marginBottom: '0.5rem' }}>70+</div>
              <div style={{ fontSize: '0.9375rem', color: '#d1d5db' }}>CQC-Compliant Policies</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#D4AF37', marginBottom: '0.5rem' }}>60+</div>
              <div style={{ fontSize: '0.9375rem', color: '#d1d5db' }}>Risk Assessments</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#D4AF37', marginBottom: '0.5rem' }}>12+</div>
              <div style={{ fontSize: '0.9375rem', color: '#d1d5db' }}>Years Expertise</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#D4AF37', marginBottom: '0.5rem' }}>£39.99+</div>
              <div style={{ fontSize: '0.9375rem', color: '#d1d5db' }}>From Just</div>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" style={{ padding: '5rem 2rem', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: '700', textAlign: 'center', marginBottom: '1rem', color: '#0B1D3A' }}>Professional Templates Built on Expertise</h2>
          <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '3.5rem', fontSize: '1rem', maxWidth: '600px', margin: '0 auto 3.5rem' }}>Created by CQC compliance specialists with over 12 years of experience. Every template is professionally written, sector-specific, and ready to customize.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', marginBottom: '3rem' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: '#0B1D3A' }}>📋 Policies</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.8', marginBottom: '1.5rem' }}>Professional, CQC-aligned policy templates covering all aspects of healthcare compliance. Each policy is tailored to your sector and ready to adapt to your organisation.</p>
              <ul style={{ listStyle: 'none', padding: 0, color: '#6b7280' }}>
                <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.75rem' }}>
                  <span style={{ color: '#D4AF37', fontWeight: '700' }}>✓</span>
                  <span>Safeguarding & Consent Policies</span>
                </li>
                <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.75rem' }}>
                  <span style={{ color: '#D4AF37', fontWeight: '700' }}>✓</span>
                  <span>Infection Control & Safety</span>
                </li>
                <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.75rem' }}>
                  <span style={{ color: '#D4AF37', fontWeight: '700' }}>✓</span>
                  <span>Staff & Training Policies</span>
                </li>
                <li style={{ display: 'flex', gap: '0.75rem' }}>
                  <span style={{ color: '#D4AF37', fontWeight: '700' }}>✓</span>
                  <span>And 66+ More</span>
                </li>
              </ul>
            </div>
            <div style={{ backgroundColor: '#f9fafb', padding: '2.5rem', border: '1px solid #e5e7eb', borderLeft: '4px solid #D4AF37' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#D4AF37' }}>£49.99</div>
              <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '0.9375rem' }}>Starting from per policy</p>
              <p style={{ color: '#6b7280', marginBottom: '1.5rem', fontSize: '0.875rem' }}>Professional Word document, instantly downloadable</p>
              <a href="/policies" style={{ display: 'inline-block', backgroundColor: '#0B1D3A', color: 'white', padding: '0.75rem 1.5rem', textDecoration: 'none', fontWeight: '700', fontSize: '0.875rem', letterSpacing: '0.03em', borderRadius: '2px' }}>Browse Policies</a>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', gridAutoFlow: 'dense' }}>
            <div style={{ gridColumn: '2' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: '#0B1D3A' }}>⚠️ Risk Assessments</h3>
              <p style={{ color: '#6b7280', lineHeight: '1.8', marginBottom: '1.5rem' }}>Comprehensive risk assessments for all healthcare hazards. Identify and mitigate risks before they become compliance issues. Essential for CQC readiness.</p>
              <ul style={{ listStyle: 'none', padding: 0, color: '#6b7280' }}>
                <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.75rem' }}>
                  <span style={{ color: '#D4AF37', fontWeight: '700' }}>✓</span>
                  <span>Fire, Manual Handling & Chemical</span>
                </li>
                <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.75rem' }}>
                  <span style={{ color: '#D4AF37', fontWeight: '700' }}>✓</span>
                  <span>Infection Control & Safeguarding</span>
                </li>
                <li style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.75rem' }}>
                  <span style={{ color: '#D4AF37', fontWeight: '700' }}>✓</span>
                  <span>Pressure Ulcers, Falls & Allergens</span>
                </li>
                <li style={{ display: 'flex', gap: '0.75rem' }}>
                  <span style={{ color: '#D4AF37', fontWeight: '700' }}>✓</span>
                  <span>And 56+ More</span>
                </li>
              </ul>
            </div>
            <div style={{ backgroundColor: '#f9fafb', padding: '2.5rem', border: '1px solid #e5e7eb', borderLeft: '4px solid #D4AF37', gridColumn: '1' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#D4AF37' }}>£39.99</div>
              <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '0.9375rem' }}>Starting from per assessment</p>
              <p style={{ color: '#6b7280', marginBottom: '1.5rem', fontSize: '0.875rem' }}>Professional Word document, instantly downloadable</p>
              <a href="/policies" style={{ display: 'inline-block', backgroundColor: '#0B1D3A', color: 'white', padding: '0.75rem 1.5rem', textDecoration: 'none', fontWeight: '700', fontSize: '0.875rem', letterSpacing: '0.03em', borderRadius: '2px' }}>Browse Assessments</a>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section id="sectors" style={{ padding: '5rem 2rem', backgroundColor: '#f9fafb' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: '700', textAlign: 'center', marginBottom: '1rem', color: '#0B1D3A' }}>Sector-Specific Templates</h2>
          <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '3.5rem', fontSize: '1rem', maxWidth: '600px', margin: '0 auto 3.5rem' }}>Each sector has unique compliance requirements. Our templates are tailored specifically for your healthcare setting.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {[
              { icon: '🏥', title: 'Care Homes', policies: '15 Policies', assessments: '15 RAs', color: '#D4AF37' },
              { icon: '🦷', title: 'Dental Practices', policies: '12 Policies', assessments: '12 RAs', color: '#D4AF37' },
              { icon: '✨', title: 'Aesthetic Clinics', policies: '10 Policies', assessments: '10 RAs', color: '#D4AF37' },
              { icon: '👨‍⚕️', title: 'GP Practices', policies: '8 Policies', assessments: '8 RAs', color: '#D4AF37' },
              { icon: '🏢', title: 'Private Clinics', policies: '10 Policies', assessments: '10 RAs', color: '#D4AF37' },
              { icon: '⚕️', title: 'Domiciliary Care', policies: '12 Policies', assessments: '12 RAs', color: '#D4AF37' },
            ].map((sector, i) => (
              <a key={i} href="/policies" style={{ backgroundColor: 'white', padding: '2rem', border: '1px solid #e5e7eb', borderTop: '4px solid sector.color', textDecoration: 'none', display: 'block', cursor: 'pointer', transition: 'all 0.3s', borderRadius: '2px' }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-4px)'; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{sector.icon}</div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.75rem', color: '#0B1D3A' }}>{sector.title}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>{sector.policies} + {sector.assessments}</p>
                <span style={{ color: '#D4AF37', fontWeight: '700', fontSize: '0.8125rem' }}>Browse →</span>
              </a>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a href="/policies" style={{ display: 'inline-block', backgroundColor: '#0B1D3A', color: 'white', padding: '1rem 2.5rem', textDecoration: 'none', fontWeight: '700', fontSize: '0.9375rem', letterSpacing: '0.03em', borderRadius: '2px' }}>VIEW ALL TEMPLATES</a>
          </div>
        </div>
      </section>

      {/* Money-Saving Bundles */}
      <section style={{ padding: '5rem 2rem', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: '700', textAlign: 'center', marginBottom: '1rem', color: '#0B1D3A' }}>Save Big with Bundles</h2>
          <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '3.5rem', fontSize: '1rem', maxWidth: '600px', margin: '0 auto 3.5rem' }}>Get everything you need at a fraction of individual prices. The more you buy, the more you save.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {[
              { name: 'Care Home Starter', price: '£199.99', save: 'Save £150+', items: '5 Policies + 3 RAs' },
              { name: 'Dental Pro', price: '£299.99', save: 'Save £200+', items: '8 Policies + 5 RAs' },
              { name: 'Aesthetic Complete', price: '£349.99', save: 'Save £280+', items: '10 Policies + 10 RAs' },
              { name: 'Ultimate Package', price: '£699.99', save: 'Save £1000+', items: 'ALL Templates (70+ Policies + 60+ RAs)' },
            ].map((bundle, i) => (
              <div key={i} style={{ backgroundColor: '#fafbfc', border: '2px solid #D4AF37', padding: '2rem', borderRadius: '4px', position: 'relative', textAlign: 'center' }}>
                <div style={{ position: 'absolute', top: '-12px', left: '1rem', backgroundColor: '#D4AF37', color: '#0B1D3A', padding: '0.25rem 0.75rem', fontWeight: '700', fontSize: '0.75rem', borderRadius: '2px' }}>{bundle.save}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', marginTop: '1rem', color: '#0B1D3A' }}>{bundle.name}</h3>
                <p style={{ color: '#6b7280', marginBottom: '1.5rem', fontSize: '0.875rem' }}>{bundle.items}</p>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#D4AF37', marginBottom: '1.5rem' }}>{bundle.price}</div>
                <a href="/policies" style={{ display: 'inline-block', backgroundColor: '#0B1D3A', color: 'white', padding: '0.75rem 1.5rem', textDecoration: 'none', fontWeight: '700', fontSize: '0.875rem', borderRadius: '2px' }}>View Bundle</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section style={{ padding: '5rem 2rem', backgroundColor: '#f9fafb' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: '700', marginBottom: '3rem', color: '#0B1D3A' }}>Trusted by 500+ UK Healthcare Providers</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            {[
              { stat: '500+', desc: 'Healthcare Providers' },
              { stat: '2000+', desc: 'Templates Downloaded' },
              { stat: '12+', desc: 'Years of Expertise' },
              { stat: '100%', desc: 'CQC Compliant' },
            ].map((item, i) => (
              <div key={i} style={{ backgroundColor: 'white', padding: '2rem', border: '1px solid #e5e7eb', borderRadius: '4px' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#D4AF37', marginBottom: '0.5rem' }}>{item.stat}</div>
                <p style={{ color: '#6b7280', fontSize: '0.9375rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <p style={{ color: '#6b7280', fontSize: '1rem', maxWidth: '700px', margin: '0 auto' }}>"We trusted Barker Scott templates to achieve our CQC registration. Professional, comprehensive, and exactly what we needed." - Healthcare Provider, UK</p>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" style={{ padding: '5rem 2rem', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: '700', textAlign: 'center', marginBottom: '3rem', color: '#0B1D3A' }}>How It Works</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {[
              { num: '1', title: 'Choose Your Templates', desc: 'Browse policies and risk assessments by sector or download bundles' },
              { num: '2', title: 'Instant Download', desc: 'Get professional Word documents ready to use immediately' },
              { num: '3', title: 'Customize for Your Org', desc: 'Edit templates with your organization details and processes' },
              { num: '4', title: 'Achieve Compliance', desc: 'Use templates to prepare for CQC inspection with confidence' },
            ].map((step, i) => (
              <div key={i} style={{ position: 'relative', padding: '2rem', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '4px' }}>
                <div style={{ position: 'absolute', top: '-15px', left: '20px', width: '40px', height: '40px', backgroundColor: '#D4AF37', color: '#0B1D3A', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontWeight: '700', fontSize: '1.25rem' }}>{step.num}</div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#0B1D3A' }}>{step.title}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.9375rem' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation CTA Section */}
      <section id="consultation" style={{ padding: '5rem 2rem', backgroundColor: '#0B1D3A', color: 'white' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: '700', marginBottom: '1rem', color: '#D4AF37' }}>Need Expert Guidance?</h2>
          <p style={{ fontSize: '1.125rem', lineHeight: '1.7', color: '#d1d5db', marginBottom: '2.5rem', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
            Our CQC compliance specialists offer personalized consultation to help you select the right templates and ensure a smooth, accelerated path to CQC compliance. Book your free 30-minute consultation today.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem', paddingBottom: '3rem', borderBottom: '1px solid rgba(212,175,55,0.25)' }}>
            {[
              '✓ Free 30-minute consultation',
              '✓ Expert sector-specific advice',
              '✓ Template selection guidance',
              '✓ CQC readiness assessment',
            ].map((item, i) => (
              <div key={i} style={{ color: '#d1d5db', fontSize: '0.9375rem', fontWeight: '500' }}>
                {item}
              </div>
            ))}
          </div>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '500px', margin: '0 auto' }}>
            <input type="text" style={{ padding: '0.875rem', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(255,255,255,0.05)', color: 'white', fontFamily: 'inherit', fontSize: '0.9375rem', borderRadius: '2px' }} placeholder="Your name" required />
            <input type="email" style={{ padding: '0.875rem', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(255,255,255,0.05)', color: 'white', fontFamily: 'inherit', fontSize: '0.9375rem', borderRadius: '2px' }} placeholder="your@email.com" required />
            <input type="tel" style={{ padding: '0.875rem', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(255,255,255,0.05)', color: 'white', fontFamily: 'inherit', fontSize: '0.9375rem', borderRadius: '2px' }} placeholder="Phone number" required />
            <select style={{ padding: '0.875rem', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(255,255,255,0.05)', color: 'white', fontFamily: 'inherit', fontSize: '0.9375rem', borderRadius: '2px' }}>
              <option style={{ color: '#0B1D3A' }}>Select your sector...</option>
              <option style={{ color: '#0B1D3A' }}>Care Homes</option>
              <option style={{ color: '#0B1D3A' }}>Dental Practices</option>
              <option style={{ color: '#0B1D3A' }}>Aesthetic Clinics</option>
              <option style={{ color: '#0B1D3A' }}>GP Practices</option>
              <option style={{ color: '#0B1D3A' }}>Private Clinics</option>
            </select>
            <button type="submit" style={{ backgroundColor: '#D4AF37', color: '#0B1D3A', padding: '1rem', fontWeight: '700', border: 'none', cursor: 'pointer', fontSize: '0.9375rem', letterSpacing: '0.03em', borderRadius: '2px' }}>BOOK FREE CONSULTATION</button>
          </form>

          <p style={{ color: '#999', fontSize: '0.8125rem', marginTop: '2rem' }}>📞 Or call us directly: 07407 184948 | ✉️ info@BarkerScott.co.uk</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{ padding: '5rem 2rem', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: '700', textAlign: 'center', marginBottom: '3rem', color: '#0B1D3A' }}>About Barker Scott</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#6b7280', lineHeight: '1.75', marginBottom: '1.5rem', fontSize: '1rem' }}>
                With over 12 years of experience in CQC compliance, Barker Scott Ltd has helped 500+ healthcare providers achieve and maintain CQC registration. We specialise exclusively in the private healthcare sector, ensuring our expertise is precisely aligned with your needs.
              </p>
              <p style={{ color: '#6b7280', lineHeight: '1.75', fontSize: '1rem' }}>
                Our professional templates are used by care homes, dental practices, aesthetic clinics, GP surgeries, and private clinics across the UK. We combine deep compliance expertise with affordable, accessible solutions to make CQC preparation accessible to every organization.
              </p>
            </div>
            <div style={{ backgroundColor: '#f9fafb', padding: '2.5rem', border: '1px solid #e5e7eb', borderLeft: '4px solid #D4AF37' }}>
              <h3 style={{ color: '#0B1D3A', fontSize: '1.125rem', fontWeight: '700', marginBottom: '1.5rem' }}>Why Choose Barker Scott</h3>
              {['Professional CQC-compliant templates', 'Premium quality at competitive prices', 'All 6 healthcare sectors covered', 'Instant digital downloads', '12+ years compliance expertise', 'Free expert consultation available'].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', color: '#6b7280' }}>
                  <span style={{ color: '#D4AF37', fontWeight: '700' }}>✓</span>
                  <span style={{ fontSize: '0.9375rem' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#000', color: '#999', padding: '2rem', textAlign: 'center', fontSize: '0.8125rem', borderTop: '1px solid #111' }}>
        <p>© 2025 Barker Scott Ltd. All rights reserved. Registered in England & Wales.</p>
      </footer>
    </div>
  );
}