'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const BUNDLES = [
    { name: 'Care Home Starter', price: '£199.99', save: 'Save £70', items: '7 Templates', sector: 'care-homes', icon: '👴' },
    { name: 'Dental Practice Pro', price: '£219.99', save: 'Save £80', items: '6 Templates', sector: 'dental', icon: '🦷', featured: true },
    { name: 'Aesthetic Clinic Complete', price: '£249.99', save: 'Save £80', items: '6 Templates', sector: 'aesthetic', icon: '✨' },
    { name: 'GP Surgery Essentials', price: '£219.99', save: 'Save £80', items: '6 Templates', sector: 'gp', icon: '⚕️' },
    { name: 'Weight Loss Clinic Complete', price: '£209.99', save: 'Save £80', items: '6 Templates', sector: 'weight-loss', icon: '💪' },
    { name: 'Virtual Clinic Package', price: '£209.99', save: 'Save £80', items: '6 Templates', sector: 'virtual-clinic', icon: '💻' },
    { name: 'ADHD Clinic Essentials', price: '£229.99', save: 'Save £80', items: '6 Templates', sector: 'adhd', icon: '🧠' },
    { name: 'Private Healthcare Package', price: '£239.99', save: 'Save £80', items: '5 Templates', sector: 'private-health', icon: '🏥' },
  ];

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", color: '#1a1a1a' }}>
      {/* STICKY HEADER */}
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
                <div style={{ fontSize: '11px', color: '#999', fontWeight: '600', letterSpacing: '0.05em' }}>CQC COMPLIANCE</div>
              </div>
            </div>
          </Link>

          <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <a href="#features" style={{ color: '#666', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>Why Us</a>
            <a href="#pricing" style={{ color: '#666', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>Bundles</a>
            <a href="#subscription" style={{ color: '#666', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>Subscription</a>
            <a href="#faq" style={{ color: '#666', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>FAQ</a>
            <Link href="/policies" style={{ textDecoration: 'none' }}>
              <button style={{ backgroundColor: '#D4AF37', color: '#0B1D3A', padding: '0.625rem 1.25rem', border: 'none', borderRadius: '6px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', transition: 'all 0.3s' }}>
                Shop Now
              </button>
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section style={{ backgroundColor: 'linear-gradient(135deg, #0B1D3A 0%, #1a2f4a 100%)', backgroundImage: 'linear-gradient(135deg, #0B1D3A 0%, #1a2f4a 100%)', color: '#fff', padding: '5rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '0.1em', color: '#D4AF37', marginBottom: '1rem', textTransform: 'uppercase' }}>
            TRUSTED BY 500+ UK HEALTHCARE PROVIDERS
          </div>
          
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '700', lineHeight: '1.2', marginBottom: '1.5rem', maxWidth: '800px', margin: '0 auto 1.5rem' }}>
            Get CQC Ready in Days,<br />
            <span style={{ color: '#D4AF37' }}>Not Months</span>
          </h1>

          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#d1d5db', lineHeight: '1.8', maxWidth: '700px', margin: '0 auto 2rem' }}>
            Professional, compliance-ready policies and risk assessments. Plus automatic updates when laws change. Used by care homes, dental, aesthetic, GP surgeries—and now you can too.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <Link href="/policies" style={{ textDecoration: 'none' }}>
              <button style={{ backgroundColor: '#D4AF37', color: '#0B1D3A', padding: '1rem 2rem', border: 'none', borderRadius: '6px', fontWeight: '700', fontSize: '16px', cursor: 'pointer', transition: 'all 0.3s' }}>
                ✓ Browse Templates
              </button>
            </Link>
            <Link href="/subscription" style={{ textDecoration: 'none' }}>
              <button style={{ border: '2px solid #D4AF37', backgroundColor: 'transparent', color: '#D4AF37', padding: '0.875rem 2rem', borderRadius: '6px', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }}>
                📧 Learn About Updates
              </button>
            </Link>
          </div>

          {/* Hero Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(212,175,55,0.2)' }}>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#D4AF37' }}>70+</div>
              <div style={{ fontSize: '13px', color: '#d1d5db' }}>CQC Policies</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#D4AF37' }}>60+</div>
              <div style={{ fontSize: '13px', color: '#d1d5db' }}>Risk Assessments</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#D4AF37' }}>12+</div>
              <div style={{ fontSize: '13px', color: '#d1d5db' }}>Years Expertise</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#D4AF37' }}>500+</div>
              <div style={{ fontSize: '13px', color: '#d1d5db' }}>Active Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN POINT → SOLUTION */}
      <section style={{ padding: '4rem 1.5rem', backgroundColor: '#f9f9f9' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', textAlign: 'center', marginBottom: '3rem', color: '#0B1D3A' }}>
            Why CQC Compliance is Harder Than It Should Be
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
            {[
              { icon: '⏱️', pain: 'No Time', solution: 'We handle the research and writing so you don\'t have to' },
              { icon: '🤔', pain: 'Confused About Requirements', solution: 'Every template includes CQC guidance and best practices' },
              { icon: '💰', pain: 'Can\'t Afford a Consultant', solution: 'Professional templates from just £39.99—not thousands' },
              { icon: '❌', pain: 'Regulations Keep Changing', solution: 'Subscription updates you automatically—never chase changes again' },
            ].map((item, i) => (
              <div key={i} style={{
                backgroundColor: '#fff',
                padding: '2rem',
                borderRadius: '8px',
                border: '1px solid #e5e5e5',
                display: 'flex',
                gap: '1rem'
              }}>
                <div style={{ fontSize: '2rem' }}>{item.icon}</div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '0.5rem', color: '#0B1D3A' }}>The Problem: {item.pain}</h3>
                  <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>{item.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: '4rem 1.5rem', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', textAlign: 'center', marginBottom: '0.5rem', color: '#0B1D3A' }}>
            Why 500+ Healthcare Providers Choose BarkerScott
          </h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '3rem', fontSize: '16px' }}>
            Not just templates. A complete compliance solution built by experts.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              { icon: '✓', title: 'CQC-Compliant by Default', desc: 'Every template is written with CQC inspection criteria in mind' },
              { icon: '✓', title: 'Sector-Specific', desc: 'Different templates for each healthcare setting—no generic nonsense' },
              { icon: '✓', title: 'Instantly Customizable', desc: 'Word documents you can edit in seconds, not rewrite for days' },
              { icon: '✓', title: 'Professional Quality', desc: '12+ years of compliance expertise baked into every policy' },
              { icon: '✓', title: 'Money-Back Guarantee', desc: 'Use them risk-free for 30 days. No questions asked.' },
              { icon: '✓', title: 'Stay Updated', desc: 'Optional subscription keeps your templates compliant with new regulations' },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '2rem',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                border: '1px solid #e5e5e5'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '0.5rem', color: '#0B1D3A' }}>{item.title}</h3>
                <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section style={{ padding: '4rem 1.5rem', backgroundColor: '#1a1a1a', color: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#D4AF37', marginBottom: '0.5rem' }}>500+</div>
              <p style={{ color: '#d1d5db', fontSize: '14px' }}>Healthcare Providers</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#D4AF37', marginBottom: '0.5rem' }}>99%</div>
              <p style={{ color: '#d1d5db', fontSize: '14px' }}>Customer Satisfaction</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#D4AF37', marginBottom: '0.5rem' }}>£0</div>
              <p style={{ color: '#d1d5db', fontSize: '14px' }}>Hidden Fees</p>
            </div>
          </div>
          <p style={{ textAlign: 'center', fontSize: '16px', color: '#d1d5db', fontStyle: 'italic', maxWidth: '700px', margin: '0 auto' }}>
            "We saved weeks of compliance work. The templates are professional, easy to customize, and actually understand CQC requirements. Highly recommend." — Sarah M., Care Home Manager
          </p>
        </div>
      </section>

      {/* BUNDLES */}
      <section id="pricing" style={{ padding: '4rem 1.5rem', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', textAlign: 'center', marginBottom: '0.5rem', color: '#0B1D3A' }}>
            Complete Bundles for Every Sector
          </h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '3rem', fontSize: '16px' }}>
            Each bundle includes 1 free policy + 1 free risk assessment worth £70-£80
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {BUNDLES.map((bundle, i) => (
              <div key={i} style={{
                backgroundColor: bundle.featured ? '#0B1D3A' : '#f9f9f9',
                color: bundle.featured ? '#fff' : '#333',
                padding: '2rem',
                borderRadius: '8px',
                border: bundle.featured ? '2px solid #D4AF37' : '1px solid #e5e5e5',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
              }}>
                {bundle.featured && (
                  <div style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '1rem',
                    backgroundColor: '#D4AF37',
                    color: '#0B1D3A',
                    padding: '0.25rem 0.75rem',
                    fontWeight: '700',
                    fontSize: '12px',
                    borderRadius: '2px'
                  }}>
                    ★ POPULAR
                  </div>
                )}
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{bundle.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '0.5rem', marginTop: bundle.featured ? '0.75rem' : 0 }}>{bundle.name}</h3>
                <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '1rem' }}>{bundle.items}</p>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#D4AF37', marginBottom: '1rem' }}>{bundle.price}</div>
                <p style={{ fontSize: '12px', fontWeight: '600', color: '#D4AF37', marginBottom: '1rem' }}>{bundle.save}</p>
                <Link href="/policies" style={{ textDecoration: 'none', marginTop: 'auto' }}>
                  <button style={{
                    width: '100%',
                    backgroundColor: '#D4AF37',
                    color: '#0B1D3A',
                    padding: '0.875rem',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}>
                    View Bundle
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUBSCRIPTION BANNER */}
      <section id="subscription" style={{ padding: '4rem 1.5rem', backgroundColor: 'linear-gradient(135deg, #0B1D3A 0%, #1a2f4a 100%)', backgroundImage: 'linear-gradient(135deg, #0B1D3A 0%, #1a2f4a 100%)', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem', color: '#D4AF37' }}>
            Stay Compliant Forever
          </h2>
          <p style={{ fontSize: '18px', color: '#d1d5db', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            For £24.99/month, get automatic template updates every time regulations change, plus monthly compliance news and priority support.
          </p>
          <p style={{ fontSize: '14px', color: '#D4AF37', fontWeight: '600', marginBottom: '2rem' }}>
            Buy any bundle and get 10% off your first 3 months of subscription
          </p>
          <Link href="/subscription" style={{ textDecoration: 'none' }}>
            <button style={{
              backgroundColor: '#D4AF37',
              color: '#0B1D3A',
              padding: '1rem 2rem',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '700',
              fontSize: '16px',
              cursor: 'pointer'
            }}>
              Learn About Subscription →
            </button>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: '4rem 1.5rem', backgroundColor: '#f9f9f9' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', textAlign: 'center', marginBottom: '3rem', color: '#0B1D3A' }}>
            Frequently Asked Questions
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { q: 'Do I need CQC registration to use these templates?', a: 'These templates are designed for organizations that need CQC compliance. If you\'re registered with or inspected by CQC, these are for you.' },
              { q: 'Who else needs these compliance templates?', a: 'Anyone operating regulated healthcare services—care homes, dental practices, GPs, aesthetic clinics, ADHD services, weight loss clinics, virtual consultations, and private healthcare providers.' },
              { q: 'What if my organization isn\'t CQC-regulated?', a: 'Many of these templates are useful for any healthcare provider wanting professional compliance documentation, even without CQC regulation.' },
              { q: 'Are these templates CQC-approved?', a: 'Our templates follow CQC guidelines and best practices, but we\'re not officially endorsed by CQC. Every template includes customization guidance.' },
              { q: 'Can I use the templates for multiple sites?', a: 'For the single site license—no. But our pricing is so affordable, many organizations buy multiple licenses for different locations.' },
              { q: 'What if I don\'t like them?', a: '30-day money-back guarantee. No questions asked. We\'re confident you will love them, but we stand behind our products.' },
              { q: 'Do I need to be tech-savvy?', a: 'Nope. Everything is a standard Word document. If you can open Word and type, you can customize these.' },
              { q: 'How does the subscription discount work?', a: 'Buy any starter bundle and get 10% off your monthly subscription for the first 3 months (£22.49/month instead of £24.99).' },
            ].map((faq, i) => (
              <div key={i} style={{
                backgroundColor: '#fff',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  style={{
                    width: '100%',
                    padding: '1.5rem',
                    backgroundColor: '#fff',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#0B1D3A'
                  }}
                >
                  {faq.q}
                  <span style={{ fontSize: '20px' }}>{expandedFaq === i ? '−' : '+'}</span>
                </button>
                {expandedFaq === i && (
                  <div style={{
                    padding: '0 1.5rem 1.5rem',
                    borderTop: '1px solid #e5e5e5',
                    color: '#666',
                    fontSize: '15px',
                    lineHeight: '1.6'
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '4rem 1.5rem', backgroundColor: '#0B1D3A', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem', color: '#D4AF37' }}>
            Ready to Get CQC-Ready?
          </h2>
          <p style={{ fontSize: '18px', color: '#d1d5db', marginBottom: '2rem', lineHeight: '1.6' }}>
            Start with our templates today. Add the subscription for peace of mind. Both designed to save you time and keep you compliant.
          </p>
          <Link href="/policies" style={{ textDecoration: 'none' }}>
            <button style={{
              backgroundColor: '#D4AF37',
              color: '#0B1D3A',
              padding: '1rem 2rem',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '700',
              fontSize: '18px',
              cursor: 'pointer'
            }}>
              ✓ Browse All Templates
            </button>
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '2rem 1.5rem', backgroundColor: '#000', color: '#999', textAlign: 'center', fontSize: '13px', borderTop: '1px solid #222' }}>
        <p>© 2026 BarkerScott Ltd. All rights reserved. | CQC Compliance Templates & Subscription Service</p>
        <p style={{ marginTop: '0.5rem' }}>📞 07407 184948 | 📧 info@barker-scott.co.uk</p>
      </footer>
    </div>
  );
}