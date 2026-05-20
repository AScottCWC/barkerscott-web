'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PoliciesPage() {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  const SECTORS = [
    { id: 'aesthetic', name: 'Aesthetic', icon: '✨', templates: 20, color: '#D4AF37' },
    { id: 'gp', name: 'GP Surgery', icon: '⚕️', templates: 20, color: '#3B82F6' },
    { id: 'private-health', name: 'Private Healthcare', icon: '🏥', templates: 20, color: '#8B5CF6' },
    { id: 'adhd', name: 'ADHD Clinic', icon: '🧠', templates: 15, color: '#EC4899' },
    { id: 'weightloss', name: 'Weight Loss Clinic', icon: '⚖️', templates: 17, color: '#F59E0B' },
    { id: 'telehealth', name: 'Online/Virtual Clinic', icon: '💻', templates: 17, color: '#10B981' },
  ];

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
          <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <button style={{ backgroundColor: 'transparent', color: '#D4AF37', border: '2px solid #D4AF37', padding: '0.5rem 1rem', borderRadius: '6px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>
                ← Back Home
              </button>
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section style={{ padding: '4rem 1.5rem', backgroundColor: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '0.1em', color: '#D4AF37', marginBottom: '1rem', textTransform: 'uppercase' }}>
            BROWSE TEMPLATES
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#0B1D3A', marginBottom: '1rem' }}>
            Compliance Templates
          </h1>
          <p style={{ fontSize: '18px', color: '#666', marginBottom: '0' }}>
            Professional policies and risk assessments for UK healthcare
          </p>
        </div>
      </section>

      {/* SECTOR SELECTION */}
      <section style={{ padding: '4rem 1.5rem', backgroundColor: '#f9f9f9' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0B1D3A', marginBottom: '3rem', textAlign: 'center' }}>
            Select Your Sector
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {SECTORS.map((sector) => (
              <button
                key={sector.id}
                onClick={() => setSelectedSector(selectedSector === sector.id ? null : sector.id)}
                style={{
                  backgroundColor: selectedSector === sector.id ? sector.color : '#fff',
                  color: selectedSector === sector.id ? '#fff' : '#0B1D3A',
                  border: selectedSector === sector.id ? `2px solid ${sector.color}` : `2px solid #e5e5e5`,
                  padding: '2rem',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  textAlign: 'center',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  if (selectedSector !== sector.id) {
                    e.currentTarget.style.borderColor = sector.color;
                    e.currentTarget.style.backgroundColor = `${sector.color}10`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedSector !== sector.id) {
                    e.currentTarget.style.borderColor = '#e5e5e5';
                    e.currentTarget.style.backgroundColor = '#fff';
                  }
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{sector.icon}</div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '0.5rem' }}>{sector.name}</h3>
                <p style={{ fontSize: '14px', opacity: 0.8 }}>{sector.templates} templates</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* TEMPLATES GRID */}
      {selectedSector && (
        <section style={{ padding: '4rem 1.5rem', backgroundColor: '#fff' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0B1D3A', marginBottom: '0.5rem' }}>
              {SECTORS.find(s => s.id === selectedSector)?.name} Templates
            </h2>
            <p style={{ fontSize: '16px', color: '#666', marginBottom: '2rem' }}>
              Choose individual policies or risk assessments, or get the full bundle at a discount
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
              <div style={{
                backgroundColor: '#f9f9f9',
                padding: '2rem',
                borderRadius: '8px',
                border: '2px dashed #D4AF37',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                  {selectedSector === 'aesthetic' && '✨'}
                  {selectedSector === 'gp' && '⚕️'}
                  {selectedSector === 'private-health' && '🏥'}
                  {selectedSector === 'adhd' && '🧠'}
                  {selectedSector === 'weightloss' && '⚖️'}
                  {selectedSector === 'telehealth' && '💻'}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '0.5rem', color: '#0B1D3A' }}>
                  {selectedSector === 'aesthetic' && 'Aesthetic Clinic Complete'}
                  {selectedSector === 'gp' && 'GP Surgery Essentials'}
                  {selectedSector === 'private-health' && 'Private Healthcare Package'}
                  {selectedSector === 'adhd' && 'ADHD Clinic Bundle'}
                  {selectedSector === 'weightloss' && 'Weight Loss Clinic Complete'}
                  {selectedSector === 'telehealth' && 'Online/Virtual Clinic Pro'}
                </h3>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '1.5rem' }}>
                  {selectedSector === 'aesthetic' && '16 templates (10 policies + 6 RAs)'}
                  {selectedSector === 'gp' && '16 templates (10 policies + 6 RAs)'}
                  {selectedSector === 'private-health' && '17 templates (10 policies + 7 RAs)'}
                  {selectedSector === 'adhd' && '13 templates (8 policies + 5 RAs)'}
                  {selectedSector === 'weightloss' && '17 templates (10 policies + 7 RAs)'}
                  {selectedSector === 'telehealth' && '17 templates (10 policies + 7 RAs)'}
                </p>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: '#D4AF37', marginBottom: '1rem' }}>
                  {selectedSector === 'aesthetic' && '£549.99'}
                  {selectedSector === 'gp' && '£519.99'}
                  {selectedSector === 'private-health' && '£579.99'}
                  {selectedSector === 'adhd' && '£429.99'}
                  {selectedSector === 'weightloss' && '£559.99'}
                  {selectedSector === 'telehealth' && '£559.99'}
                </div>
                <button style={{
                  width: '100%',
                  backgroundColor: '#D4AF37',
                  color: '#0B1D3A',
                  padding: '0.875rem',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '700',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}>
                  Get Full Bundle
                </button>
              </div>

              {/* PLACEHOLDER FOR INDIVIDUAL ITEMS */}
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} style={{
                  backgroundColor: '#fff',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid #e5e5e5'
                }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0B1D3A', marginBottom: '0.5rem' }}>
                    Template {i}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#666', marginBottom: '1rem' }}>
                    Individual policy or risk assessment
                  </p>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#D4AF37', marginBottom: '1rem' }}>
                    £29.99
                  </div>
                  <button style={{
                    width: '100%',
                    backgroundColor: 'transparent',
                    color: '#D4AF37',
                    padding: '0.625rem',
                    border: '1px solid #D4AF37',
                    borderRadius: '6px',
                    fontWeight: '600',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}>
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA IF NO SECTOR SELECTED */}
      {!selectedSector && (
        <section style={{ padding: '4rem 1.5rem', backgroundColor: 'linear-gradient(135deg, #0B1D3A 0%, #1a2f4a 100%)', backgroundImage: 'linear-gradient(135deg, #0B1D3A 0%, #1a2f4a 100%)', color: '#fff', textAlign: 'center' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem', color: '#D4AF37' }}>
              Choose Your Sector to Get Started
            </h2>
            <p style={{ fontSize: '16px', color: '#d1d5db', lineHeight: '1.6' }}>
              Select a sector above to browse individual templates or get the complete bundle with 10% off our subscription.
            </p>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer style={{ padding: '2rem 1.5rem', backgroundColor: '#000', color: '#999', textAlign: 'center', fontSize: '13px', borderTop: '1px solid #222' }}>
        <p>© 2026 BarkerScott Ltd. All rights reserved.</p>
        <p style={{ marginTop: '0.5rem' }}>📞 07407 184948 | 📧 info@barker-scott.co.uk</p>
      </footer>
    </div>
  );
}
