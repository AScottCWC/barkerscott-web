'use client';

import Link from 'next/link';

export default function SubscriptionPage() {
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

          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/policies" style={{ textDecoration: 'none' }}>
              <button style={{ backgroundColor: '#D4AF37', color: '#0B1D3A', padding: '0.625rem 1.25rem', border: 'none', borderRadius: '6px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>
                Shop Now
              </button>
            </Link>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <button style={{ backgroundColor: '#f0f0f0', color: '#0B1D3A', padding: '0.625rem 1.25rem', border: 'none', borderRadius: '6px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>
                ← Back
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section style={{ backgroundColor: 'linear-gradient(135deg, #0B1D3A 0%, #1a2f4a 100%)', backgroundImage: 'linear-gradient(135deg, #0B1D3A 0%, #1a2f4a 100%)', color: '#fff', padding: '5rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '0.1em', color: '#D4AF37', marginBottom: '1rem', textTransform: 'uppercase' }}>
            STAY COMPLIANT 24/7
          </div>
          
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '700', lineHeight: '1.2', marginBottom: '1.5rem' }}>
            Never Miss a Regulatory<br />
            <span style={{ color: '#D4AF37' }}>Change Again</span>
          </h1>

          <p style={{ fontSize: '1.125rem', color: '#d1d5db', lineHeight: '1.8', maxWidth: '700px', margin: '0 auto 2rem' }}>
            Get automatic template updates every time regulations or laws change. Plus monthly compliance news, detailed change explanations, and priority support—all for £24.99/month.
          </p>

          <div style={{ backgroundColor: 'rgba(212,175,55,0.1)', border: '2px solid #D4AF37', borderRadius: '8px', padding: '2rem', marginBottom: '2rem' }}>
            <div style={{ fontSize: '3rem', fontWeight: '700', color: '#D4AF37', marginBottom: '0.5rem' }}>£24.99</div>
            <p style={{ fontSize: '16px', color: '#d1d5db', margin: 0 }}>per month • Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section style={{ padding: '4rem 1.5rem', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', textAlign: 'center', marginBottom: '3rem', color: '#0B1D3A' }}>
            What's Included in Your Subscription
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              { icon: '🔄', title: 'Automatic Updates', desc: 'Every 3 months, all your templates update automatically when regulations or laws change' },
              { icon: '📋', title: 'Change Explanations', desc: 'Detailed explanations of what changed, why it matters, and how to implement it' },
              { icon: '📧', title: 'Compliance News', desc: 'Monthly emails with healthcare compliance news, industry alerts, and CQC updates' },
              { icon: '⭐', title: 'Priority Support', desc: 'Direct access to our CQC specialists for compliance questions via email' },
              { icon: '🆕', title: 'New Templates', desc: 'First access to any new templates we add as healthcare regulations evolve' },
              { icon: '📁', title: 'All Sectors', desc: 'Covers all your templates across care homes, dental, GP, aesthetic, and more' },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '2rem',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                border: '1px solid #e5e5e5'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '0.5rem', color: '#0B1D3A' }}>{item.title}</h3>
                <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING TIERS */}
      <section style={{ padding: '4rem 1.5rem', backgroundColor: '#f9f9f9' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', textAlign: 'center', marginBottom: '1rem', color: '#0B1D3A' }}>
            Choose Your Plan
          </h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '3rem', fontSize: '16px' }}>
            Buy a template bundle and get 10% off your first 3 months of subscription
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              {
                name: 'Subscription Only',
                price: '£24.99',
                period: '/month',
                features: ['Automatic updates', 'Monthly news', 'Priority support', 'All templates'],
                cta: 'Subscribe Now',
                highlight: false
              },
              {
                name: 'Bundle + Subscription',
                price: '£22.49',
                period: '/month (first 3 mo)',
                features: ['Everything in Subscription', 'Complete template bundle', 'Save 10% first 3 months', 'Then £24.99/month'],
                cta: 'Shop Bundles',
                highlight: true
              },
            ].map((plan, i) => (
              <div key={i} style={{
                backgroundColor: plan.highlight ? '#0B1D3A' : '#fff',
                color: plan.highlight ? '#fff' : '#333',
                padding: '2.5rem',
                borderRadius: '12px',
                border: plan.highlight ? '2px solid #D4AF37' : '1px solid #e5e5e5',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
              }}>
                {plan.highlight && (
                  <div style={{
                    position: 'absolute',
                    top: '-15px',
                    left: '1rem',
                    backgroundColor: '#D4AF37',
                    color: '#0B1D3A',
                    padding: '0.35rem 1rem',
                    fontWeight: '700',
                    fontSize: '13px',
                    borderRadius: '4px'
                  }}>
                    ★ BEST VALUE
                  </div>
                )}
                <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '0.5rem', marginTop: plan.highlight ? '1rem' : 0 }}>{plan.name}</h3>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#D4AF37', marginBottom: '0.25rem' }}>{plan.price}</div>
                <p style={{ fontSize: '13px', color: plan.highlight ? '#d1d5db' : '#999', marginBottom: '2rem' }}>{plan.period}</p>
                <ul style={{ marginBottom: '2rem', flexGrow: 1 }}>
                  {plan.features.map((feature, j) => (
                    <li key={j} style={{ marginBottom: '0.75rem', fontSize: '14px', listStyle: 'none', paddingLeft: '1.5rem', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, color: '#D4AF37', fontWeight: 'bold' }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={plan.cta.includes('Bundles') ? '/policies' : '#'} style={{ textDecoration: 'none' }}>
                  <button style={{
                    width: '100%',
                    backgroundColor: '#D4AF37',
                    color: '#0B1D3A',
                    padding: '1rem',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}>
                    {plan.cta}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY SUBSCRIBE */}
      <section style={{ padding: '4rem 1.5rem', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', textAlign: 'center', marginBottom: '3rem', color: '#0B1D3A' }}>
            Why Healthcare Providers Subscribe
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { icon: '😤', pain: 'Regulation Fatigue', solution: 'Stop chasing updates manually. We track changes so you don\'t have to.' },
              { icon: '⚖️', pain: 'Confused by Changes', solution: 'Every update includes a clear explanation of what changed and why it matters.' },
              { icon: '📅', pain: 'Compliance Burnout', solution: 'Monthly news keeps you informed without overwhelming your inbox.' },
              { icon: '🚨', pain: 'Missed CQC Updates', solution: 'Get alerts immediately when new guidance affects your templates.' },
            ].map((item, i) => (
              <div key={i} style={{
                padding: '1.5rem',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                border: '1px solid #e5e5e5'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#0B1D3A', marginBottom: '0.5rem' }}>{item.pain}</p>
                <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>{item.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '4rem 1.5rem', backgroundColor: '#f9f9f9' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', textAlign: 'center', marginBottom: '3rem', color: '#0B1D3A' }}>
            Subscription FAQs
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { q: 'Can I cancel anytime?', a: 'Yes, cancel anytime. No lock-in contracts, no penalties. Your templates remain yours to use.' },
              { q: 'How often do templates update?', a: 'Major regulatory changes trigger immediate updates. We also do a comprehensive review every 3 months.' },
              { q: 'Do I get the bundle discount automatically?', a: 'Yes, when you purchase any starter bundle, we automatically apply 10% off your first 3 months of subscription.' },
              { q: 'What if I don\'t buy a bundle?', a: 'You can still subscribe to just the compliance updates. The subscription works independently.' },
              { q: 'Are updates sent automatically?', a: 'Yes. Templates update automatically in your account. You\'ll receive an email explaining what changed.' },
              { q: 'Does the subscription cover all sectors?', a: 'Yes. Whether you use templates for care homes, dental, GP, aesthetic, or any other sector, all are covered.' },
            ].map((faq, i) => (
              <div key={i} style={{
                backgroundColor: '#fff',
                border: '1px solid #e5e5e5',
                borderRadius: '8px',
                padding: '1.5rem'
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0B1D3A', marginBottom: '0.75rem', margin: 0 }}>{faq.q}</h3>
                <p style={{ color: '#666', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '3rem 1.5rem', backgroundColor: '#0B1D3A', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem', color: '#D4AF37' }}>
            Ready to Stay Compliant?
          </h2>
          <p style={{ fontSize: '16px', color: '#d1d5db', marginBottom: '2rem', lineHeight: '1.6' }}>
            Start with our templates and add the compliance peace of mind subscription gives you.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/policies" style={{ textDecoration: 'none' }}>
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
                Browse Bundles
              </button>
            </Link>
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
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '2rem 1.5rem', backgroundColor: '#000', color: '#999', textAlign: 'center', fontSize: '13px', borderTop: '1px solid #222' }}>
        <p>© 2026 BarkerScott Ltd. | CQC Compliance Templates & Subscription Service</p>
        <p style={{ marginTop: '0.5rem' }}>📞 07407 184948 | 📧 info@barker-scott.co.uk</p>
      </footer>
    </div>
  );
}