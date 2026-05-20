'use client';

import Link from 'next/link';

export default function SubscriptionPage() {
  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", color: '#1a1a1a', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      {/* HEADER */}
      <header style={{
        backgroundColor: '#0B1D3A',
        color: '#fff',
        padding: '2rem 1.5rem',
        borderBottom: '1px solid #1a2f4a'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
              <div style={{ backgroundColor: '#D4AF37', color: '#0B1D3A', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' }}>BS</div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '16px' }}>BarkerScott</div>
                <div style={{ fontSize: '11px', color: '#d1d5db', fontWeight: '600' }}>CQC COMPLIANCE</div>
              </div>
            </div>
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section style={{ padding: '4rem 1.5rem', backgroundColor: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '0.1em', color: '#D4AF37', marginBottom: '1rem', textTransform: 'uppercase' }}>
            SUBSCRIPTION PLANS
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#0B1D3A', marginBottom: '1rem' }}>
            Stay Compliant Automatically
          </h1>
          <p style={{ fontSize: '18px', color: '#666' }}>
            Get monthly updates, regulatory newsletters, and automatic template updates when laws change
          </p>
        </div>
      </section>

      {/* SUBSCRIPTION CARD */}
      <section style={{ padding: '4rem 1.5rem', backgroundColor: '#f9f9f9' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '3rem',
            borderRadius: '12px',
            border: '2px solid #D4AF37',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0B1D3A', marginBottom: '0.5rem' }}>
              Monthly Subscription
            </h2>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '2rem' }}>
              All sectors included, cancel anytime
            </p>

            <div style={{ fontSize: '3.5rem', fontWeight: '700', color: '#D4AF37', marginBottom: '0.5rem' }}>
              £34.99
            </div>
            <p style={{ fontSize: '16px', color: '#666', marginBottom: '2rem' }}>
              per month
            </p>

            <button style={{
              width: '100%',
              backgroundColor: '#D4AF37',
              color: '#0B1D3A',
              padding: '1rem',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '16px',
              cursor: 'pointer',
              marginBottom: '2rem'
            }}>
              Start Subscription
            </button>

            <div style={{ textAlign: 'left', borderTop: '1px solid #e5e5e5', paddingTop: '2rem' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0B1D3A', marginBottom: '1rem' }}>
                What's Included:
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  'All 70+ CQC policies across every sector',
                  'All 60+ risk assessments',
                  'Automatic updates every 3 months when regulations change',
                  'Full explanations of what changed and why',
                  'Monthly compliance newsletters',
                  'CQC guidance updates and alerts',
                  'Priority email support',
                  'Cancel anytime, no contracts'
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', fontSize: '14px', color: '#666' }}>
                    <span style={{ color: '#D4AF37', fontWeight: '700' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* DISCOUNT OFFER */}
          <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: '#fff8e6', borderRadius: '12px', border: '1px solid #D4AF37', textAlign: 'center' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0B1D3A', marginBottom: '0.5rem' }}>
              💡 Bundle Discount
            </h3>
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '1rem' }}>
              Buy any sector bundle first, then get <strong>10% off your first 3 months of subscription</strong>
            </p>
            <p style={{ fontSize: '13px', color: '#666' }}>
              £31.49/month for 3 months, then £34.99/month
            </p>
          </div>
        </div>
      </section>

      {/* WHY SUBSCRIBE */}
      <section style={{ padding: '4rem 1.5rem', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#0B1D3A', marginBottom: '3rem', textAlign: 'center' }}>
            Why Subscription Over One-Time Bundles?
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              {
                icon: '🔄',
                title: 'Automatic Updates',
                desc: 'CQC guidance changes, healthcare law shifts, new best practices emerge. Your templates update automatically every 3 months without you doing anything.'
              },
              {
                icon: '📧',
                title: 'Monthly News',
                desc: 'Get a monthly newsletter of regulatory changes, CQC updates, and compliance alerts so you stay ahead of changes.'
              },
              {
                icon: '📋',
                title: 'Change Explanations',
                desc: 'Every update includes clear explanations of what changed, why it matters, and how it affects your templates.'
              },
              {
                icon: '🎯',
                title: 'All Sectors',
                desc: 'One subscription covers all 70+ policies and 60+ RAs across every sector—Aesthetic, GP, Private Healthcare, ADHD, Weight Loss, Telehealth.'
              },
              {
                icon: '⭐',
                title: 'Peace of Mind',
                desc: 'Stop worrying about whether your templates are compliant. You\'ll always know they reflect current CQC and healthcare law.'
              },
              {
                icon: '📞',
                title: 'Priority Support',
                desc: 'Email support during business hours, faster responses, and direct help with implementation questions.'
              }
            ].map((item, i) => (
              <div key={i} style={{
                padding: '2rem',
                backgroundColor: '#f9f9f9',
                borderRadius: '8px',
                border: '1px solid #e5e5e5'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0B1D3A', marginBottom: '0.5rem' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '4rem 1.5rem', backgroundColor: '#f9f9f9' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#0B1D3A', marginBottom: '3rem', textAlign: 'center' }}>
            Subscription FAQs
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              {
                q: 'Can I use templates without a subscription?',
                a: 'Yes! You can buy sector bundles one-time (£429.99–£579.99) and use them forever. The subscription is optional and adds ongoing updates and support.'
              },
              {
                q: 'How often do templates actually update?',
                a: 'We review regulations every 3 months. If CQC guidance, healthcare law, or best practices change in ways that affect your templates, we update them and send you the new version with a full explanation of changes.'
              },
              {
                q: 'What if I buy a bundle first?',
                a: 'You can! Many customers buy a bundle to use immediately, then add a subscription later for ongoing updates. If you buy a bundle and subscribe within 30 days, you get 10% off your first 3 months (£31.49/month).'
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Yes, absolutely. No contracts, no penalties. Cancel your subscription anytime and keep your current templates. They\'re yours to use forever.'
              },
              {
                q: 'Do I need all sectors?',
                a: 'No. With the subscription, you get access to all 70+ policies and 60+ RAs across every sector—but you\'ll only use what\'s relevant to your business.'
              },
              {
                q: 'Is the subscription worth it?',
                a: 'If regulations change and you don\'t update your templates, you could face CQC inspection findings or compliance issues. At £34.99/month, the subscription costs less than 1 hour of consultant time per month—and handles compliance automatically.'
              }
            ].map((faq, i) => (
              <div key={i} style={{
                backgroundColor: '#fff',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid #e5e5e5'
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0B1D3A', marginBottom: '0.75rem' }}>
                  {faq.q}
                </h3>
                <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 1.5rem', backgroundColor: 'linear-gradient(135deg, #0B1D3A 0%, #1a2f4a 100%)', backgroundImage: 'linear-gradient(135deg, #0B1D3A 0%, #1a2f4a 100%)', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem', color: '#D4AF37' }}>
            Ready to Stay Compliant?
          </h2>
          <p style={{ fontSize: '16px', color: '#d1d5db', marginBottom: '2rem' }}>
            Start with a bundle for immediate templates, then add a subscription for peace of mind and automatic updates.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{
              backgroundColor: '#D4AF37',
              color: '#0B1D3A',
              padding: '1rem 2rem',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '16px',
              cursor: 'pointer'
            }}>
              Start Subscription (£34.99/mo)
            </button>
            <Link href="/policies" style={{ textDecoration: 'none' }}>
              <button style={{
                backgroundColor: 'transparent',
                color: '#D4AF37',
                padding: '1rem 2rem',
                border: '2px solid #D4AF37',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '16px',
                cursor: 'pointer'
              }}>
                Browse Bundles
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '2rem 1.5rem', backgroundColor: '#000', color: '#999', textAlign: 'center', fontSize: '13px', borderTop: '1px solid #222' }}>
        <p>© 2026 BarkerScott Ltd. All rights reserved.</p>
        <p style={{ marginTop: '0.5rem' }}>📞 07407 184948 | 📧 info@barker-scott.co.uk</p>
      </footer>
    </div>
  );
}
