'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const BUNDLES = [
    { name: 'Aesthetic Clinic Complete', price: '£549.99', save: 'Save £11.85', items: '16 Templates', sector: 'aesthetic', icon: '✨' },
    { name: 'GP Surgery Essentials', price: '£519.99', save: 'Save £23.85', items: '16 Templates', sector: 'gp', icon: '⚕️' },
    { name: 'Private Healthcare Package', price: '£579.99', save: 'Save £9.84', items: '17 Templates', sector: 'private-health', icon: '🏥' },
    { name: 'ADHD Clinic Bundle', price: '£429.99', save: 'Save £15.88', items: '13 Templates', sector: 'adhd', icon: '🧠' },
    { name: 'Weight Loss Clinic Complete', price: '£559.99', save: 'Save £19.84', items: '17 Templates', sector: 'weightloss', icon: '⚖️' },
    { name: 'Online/Virtual Clinic Pro', price: '£559.99', save: 'Save £19.84', items: '17 Templates', sector: 'telehealth', icon: '💻' },
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
            <Link href="/subscription" style={{ textDecoration: 'none' }}>
              <button style={{ backgroundColor: 'transparent', color: '#D4AF37', border: '2px solid #D4AF37', padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>
                🔄 Updates
              </button>
            </Link>
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
            Get CQC Ready in Days.<br />
            <span style={{ color: '#D4AF37' }}>Stay Compliant Forever.</span>
          </h1>

          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#d1d5db', lineHeight: '1.8', maxWidth: '700px', margin: '0 auto 2rem' }}>
            Professional templates get you started. Automatic updates keep you compliant as regulations change—every 3 months, delivered to you.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <Link href="/policies" style={{ textDecoration: 'none' }}>
              <button style={{ backgroundColor: '#D4AF37', color: '#0B1D3A', padding: '1rem 2rem', border: 'none', borderRadius: '6px', fontWeight: '700', fontSize: '16px', cursor: 'pointer', transition: 'all 0.3s' }}>
                ✓ Browse Templates
              </button>
            </Link>
            <Link href="/subscription" style={{ textDecoration: 'none' }}>
              <button style={{ border: '2px solid #D4AF37', backgroundColor: 'transparent', color: '#D4AF37', padding: '0.875rem 2rem', borderRadius: '6px', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }}>
                🔄 See Subscription Benefits →
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
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#D4AF37' }}>Every 3mo</div>
              <div style={{ fontSize: '13px', color: '#d1d5db' }}>Auto-Updates</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#D4AF37' }}>500+</div>
              <div style={{ fontSize: '13px', color: '#d1d5db' }}>Active Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* REGULATORY URGENCY SECTION */}
      <section style={{ padding: '3rem 1.5rem', backgroundColor: '#fff8e6', borderTop: '4px solid #D4AF37' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0B1D3A', marginBottom: '1rem' }}>
            Regulations Change. We Don't Make You Chase Them.
          </h3>
          <p style={{ fontSize: '16px', color: '#666', lineHeight: '1.6', marginBottom: '0' }}>
            CQC guidance updates, healthcare law changes, best practice shifts—they happen more often than you think. With our subscription, your templates automatically update every 3 months with full explanations of what changed and why. No compliance surprises. No manual hunting through government guidance. Just templates that stay compliant while you focus on running your practice.
          </p>
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
              { icon: '💰', pain: 'Can\'t Afford a Consultant', solution: 'Professional templates from just £429.99—not thousands' },
              { icon: '🔄', pain: 'Regulations Change Constantly', solution: 'Subscription auto-updates every 3 months—no manual work' },
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
            Templates + Subscription = Total Compliance Peace of Mind
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              { icon: '✓', title: 'CQC-Compliant Templates', desc: 'Every template written with CQC inspection criteria in mind' },
              { icon: '🔄', title: 'Automatic Updates', desc: 'Regulations change? Your templates update automatically every 3 months' },
              { icon: '📋', title: 'Clear Change Notes', desc: 'Every update comes with explanations of what changed and why' },
              { icon: '✓', title: 'Sector-Specific', desc: 'Different templates for each healthcare setting—no generic nonsense' },
              { icon: '⭐', title: '30-Day Guarantee', desc: 'Use risk-free for 30 days. No questions asked if you change your mind' },
              { icon: '📧', title: 'Monthly Compliance News', desc: 'Stay informed with regulatory updates, CQC guidance, and industry alerts' },
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
              <p style={{ color: '#d1d5db', fontSize: '14px' }}>Healthcare Providers Trust Us</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#D4AF37', marginBottom: '0.5rem' }}>3,500+</div>
              <p style={{ color: '#d1d5db', fontSize: '14px' }}>Templates Updated This Year</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#D4AF37', marginBottom: '0.5rem' }}>2.4hrs</div>
              <p style={{ color: '#d1d5db', fontSize: '14px' }}>Compliance Work Saved Per Month</p>
            </div>
          </div>
          <p style={{ textAlign: 'center', fontSize: '16px', color: '#d1d5db', fontStyle: 'italic', maxWidth: '700px', margin: '0 auto' }}>
            "We switched to BarkerScott for the templates and stayed for the subscription. No more panic attacks about CQC changes—they just arrive in our inbox explained and ready to go." — Michael H., Care Home Manager
          </p>
        </div>
      </section>

      {/* BUNDLES - 6 SECTORS */}
      <section id="pricing" style={{ padding: '4rem 1.5rem', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', textAlign: 'center', marginBottom: '0.5rem', color: '#0B1D3A' }}>
            Complete Bundles for Every Sector
          </h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '1rem', fontSize: '16px' }}>
            Each bundle includes everything your sector needs—built on actual CQC requirements
          </p>
          <p style={{ textAlign: 'center', color: '#D4AF37', fontWeight: '600', marginBottom: '3rem', fontSize: '15px' }}>
            💡 Pro tip: Buy a bundle and get 10% off subscription (£31.49/month for 3 months, then £34.99/month)
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {BUNDLES.map((bundle, i) => (
              <div key={i} style={{
                backgroundColor: '#f9f9f9',
                color: '#333',
                padding: '2rem',
                borderRadius: '8px',
                border: '1px solid #e5e5e5',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{bundle.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '0.5rem', marginTop: 0 }}>{bundle.name}</h3>
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
                    + Bundle + Subscribe
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUBSCRIPTION SPOTLIGHT */}
      <section style={{ padding: '4rem 1.5rem', backgroundColor: 'linear-gradient(135deg, #0B1D3A 0%, #1a2f4a 100%)', backgroundImage: 'linear-gradient(135deg, #0B1D3A 0%, #1a2f4a 100%)', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '0.1em', color: '#D4AF37', marginBottom: '1rem', textTransform: 'uppercase' }}>
            THE PEACE-OF-MIND LAYER
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem', color: '#fff' }}>
            Templates are great.<br />
            <span style={{ color: '#D4AF37' }}>Subscription is essential.</span>
          </h2>
          <p style={{ fontSize: '18px', color: '#d1d5db', marginBottom: '2rem', lineHeight: '1.6' }}>
            For just <span style={{ fontSize: '24px', fontWeight: '700', color: '#D4AF37' }}>£34.99/month</span>, get regulatory updates automatically delivered, monthly compliance news, and priority support. When new guidance emerges, your templates update before you even know the law changed.
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
              cursor: 'pointer',
              marginRight: '1rem',
              marginBottom: '1rem'
            }}>
              Explore Subscription →
            </button>
          </Link>
          <Link href="/policies" style={{ textDecoration: 'none' }}>
            <button style={{
              backgroundColor: 'transparent',
              color: '#D4AF37',
              padding: '1rem 2rem',
              border: '2px solid #D4AF37',
              borderRadius: '6px',
              fontWeight: '700',
              fontSize: '16px',
              cursor: 'pointer'
            }}>
              Start with Templates
            </button>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: '4rem 1.5rem', backgroundColor: '#f9f9f9' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', textAlign: 'center', marginBottom: '3rem', color: '#0B1D3A' }}>
            Questions? We've Got Answers
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { q: 'How often do templates update with the subscription?', a: 'Every 3 months, we review regulations and update templates if needed. Plus you get monthly newsletters about CQC changes, healthcare law updates, and compliance trends.' },
              { q: 'What if I buy a bundle but later want the subscription?', a: 'Easy. Just sign up at the Subscription page. And if you bought a bundle, you automatically get 10% off your first 3 months (£31.49/month instead of £34.99).' },
              { q: 'Do I need CQC registration to use these?', a: 'These templates are designed for CQC-regulated organizations. If you\'re registered with or inspected by CQC, they\'re for you. They\'re also useful for any healthcare provider wanting professional compliance documentation.' },
              { q: 'What counts as a regulatory "update"?', a: 'New CQC guidance, changes to healthcare law, updated best practices, revised industry standards. Anything that could affect your compliance. You\'ll get an explanation of what changed and how it impacts your templates.' },
              { q: 'Can I cancel the subscription anytime?', a: 'Yes. No contracts, no penalties. Cancel whenever you want. Your templates remain yours to use forever.' },
              { q: 'Are these templates CQC-approved?', a: 'They follow CQC guidelines and best practices, but we\'re not officially endorsed by CQC. Every template includes customization guidance so you can adapt it to your specific organization.' },
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
            Two Paths to Compliance Peace of Mind
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
            <div style={{ backgroundColor: 'rgba(212,175,55,0.1)', padding: '1.5rem', borderRadius: '8px', border: '1px solid #D4AF37' }}>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#D4AF37', marginBottom: '1rem' }}>PATH 1</p>
              <p style={{ fontSize: '18px', fontWeight: '700', marginBottom: '0.5rem' }}>Start Now</p>
              <p style={{ fontSize: '14px', color: '#d1d5db', marginBottom: '1.5rem' }}>Browse templates, pick your sector, add to cart</p>
              <Link href="/policies" style={{ textDecoration: 'none' }}>
                <button style={{
                  width: '100%',
                  backgroundColor: '#D4AF37',
                  color: '#0B1D3A',
                  padding: '0.75rem',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}>
                  Browse Templates
                </button>
              </Link>
            </div>
            <div style={{ backgroundColor: 'rgba(212,175,55,0.1)', padding: '1.5rem', borderRadius: '8px', border: '2px solid #D4AF37' }}>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#D4AF37', marginBottom: '1rem' }}>PATH 2 - RECOMMENDED</p>
              <p style={{ fontSize: '18px', fontWeight: '700', marginBottom: '0.5rem' }}>Bundle + Subscribe</p>
              <p style={{ fontSize: '14px', color: '#d1d5db', marginBottom: '0.5rem' }}>Get everything + 10% off subscription</p>
              <p style={{ fontSize: '12px', color: '#D4AF37', fontWeight: '600', marginBottom: '1.5rem' }}>Save 3 months of subscription fees</p>
              <Link href="/policies" style={{ textDecoration: 'none' }}>
                <button style={{
                  width: '100%',
                  backgroundColor: '#D4AF37',
                  color: '#0B1D3A',
                  padding: '0.75rem',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}>
                  Bundle + Subscribe
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '2rem 1.5rem', backgroundColor: '#000', color: '#999', textAlign: 'center', fontSize: '13px', borderTop: '1px solid #222' }}>
        <p>© 2026 BarkerScott Ltd. All rights reserved. | CQC Compliance Templates & Automatic Updates</p>
        <p style={{ marginTop: '0.5rem' }}>📞 07407 184948 | 📧 info@barker-scott.co.uk</p>
      </footer>
    </div>
  );
}
