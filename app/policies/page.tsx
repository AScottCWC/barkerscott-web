'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'policy' | 'risk-assessment';
  sector: string;
  bundleIds?: string[];
}

interface Bundle {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  save: string;
  productCount: number;
  productIds: string[];
  sector: string;
  badge?: string;
}

// All individual products
const PRODUCTS: Product[] = [
  // Care Home
  { id: 'policy-ch-complaints', name: 'Complaints & Compliments Policy', description: 'Handle complaints professionally and embed learning', price: 29.99, type: 'policy', sector: 'care-homes' },
  { id: 'policy-ch-eol', name: 'End of Life Care Policy', description: 'Dignity and support at end of life', price: 29.99, type: 'policy', sector: 'care-homes' },
  { id: 'policy-ch-falls', name: 'Falls Prevention & Management Policy', description: 'Reduce falls and manage safely', price: 29.99, type: 'policy', sector: 'care-homes' },
  { id: 'policy-ch-fire', name: 'Fire Safety Policy', description: 'Emergency preparedness and evacuation', price: 29.99, type: 'policy', sector: 'care-homes' },
  { id: 'policy-ch-ipc', name: 'Infection Prevention & Control Policy', description: 'Keep residents safe from infections', price: 29.99, type: 'policy', sector: 'care-homes' },
  { id: 'ra-ch-falls', name: 'Falls Prevention Risk Assessment', description: 'Identify and mitigate fall hazards', price: 24.99, type: 'risk-assessment', sector: 'care-homes' },
  { id: 'ra-ch-medication', name: 'Medication Management Risk Assessment', description: 'Safe medication storage and administration', price: 24.99, type: 'risk-assessment', sector: 'care-homes' },
  
  // Dental
  { id: 'policy-dent-complaints', name: 'Complaints Handling Policy', description: 'Manage patient feedback professionally', price: 29.99, type: 'policy', sector: 'dental' },
  { id: 'policy-dent-consent', name: 'Consent to Treatment Policy', description: 'Informed consent and patient rights', price: 29.99, type: 'policy', sector: 'dental' },
  { id: 'policy-dent-ipc', name: 'Infection Prevention & Control Policy', description: 'Decontamination and cross-infection control', price: 29.99, type: 'policy', sector: 'dental' },
  { id: 'policy-dent-radiation', name: 'Radiation Protection Policy', description: 'Safe use of dental radiography', price: 29.99, type: 'policy', sector: 'dental' },
  { id: 'ra-dent-conscious-sedation', name: 'Conscious Sedation Risk Assessment', description: 'Safe sedation procedures', price: 24.99, type: 'risk-assessment', sector: 'dental' },
  { id: 'ra-dent-cross-infection', name: 'Cross-Infection Control Assessment', description: 'Decontamination protocols', price: 24.99, type: 'risk-assessment', sector: 'dental' },

  // GP Surgery
  { id: 'policy-gp-complaints', name: 'Complaints Handling Policy', description: 'NHS and patient feedback management', price: 29.99, type: 'policy', sector: 'gp' },
  { id: 'policy-gp-consent', name: 'Consent & Confidentiality Policy', description: 'Patient confidentiality and consent', price: 29.99, type: 'policy', sector: 'gp' },
  { id: 'policy-gp-data-protection', name: 'Data Protection & Information Governance', description: 'GDPR and NHS compliance', price: 29.99, type: 'policy', sector: 'gp' },
  { id: 'policy-gp-ipc', name: 'Infection Prevention & Control Policy', description: 'IPC standards and procedures', price: 29.99, type: 'policy', sector: 'gp' },
  { id: 'ra-gp-coshh', name: 'COSHH Risk Assessment', description: 'Hazardous substance management', price: 24.99, type: 'risk-assessment', sector: 'gp' },
  { id: 'ra-gp-ipc', name: 'Infection Prevention & Control Assessment', description: 'IPC compliance audit', price: 24.99, type: 'risk-assessment', sector: 'gp' },

  // Aesthetic Clinic
  { id: 'policy-aes-consent', name: 'Consent, Risk & Disclosure Policy', description: 'Informed consent for aesthetic procedures', price: 29.99, type: 'policy', sector: 'aesthetic' },
  { id: 'policy-aes-ipc', name: 'Infection Prevention & Control Policy', description: 'Sterile technique and decontamination', price: 29.99, type: 'policy', sector: 'aesthetic' },
  { id: 'policy-aes-marketing', name: 'Marketing & Advertising Policy', description: 'HCPC-compliant advertising standards', price: 29.99, type: 'policy', sector: 'aesthetic' },
  { id: 'ra-aes-botox', name: 'Botulinum Toxin (Botox) Risk Assessment', description: 'Safe Botox administration', price: 24.99, type: 'risk-assessment', sector: 'aesthetic' },
  { id: 'ra-aes-dermal-fillers', name: 'Dermal Filler Risk Assessment', description: 'Safe filler administration', price: 24.99, type: 'risk-assessment', sector: 'aesthetic' },
  { id: 'ra-aes-laser-ipl', name: 'Laser & IPL Risk Assessment', description: 'Laser safety and skin reactions', price: 24.99, type: 'risk-assessment', sector: 'aesthetic' },

  // Private Healthcare
  { id: 'policy-phc-clinical-governance', name: 'Clinical Governance Policy', description: 'Quality assurance and safety', price: 29.99, type: 'policy', sector: 'private-health' },
  { id: 'policy-phc-consent', name: 'Consent to Treatment Policy', description: 'Informed consent procedures', price: 29.99, type: 'policy', sector: 'private-health' },
  { id: 'policy-phc-data-protection', name: 'Data Protection & Confidentiality Policy', description: 'Patient privacy and GDPR', price: 29.99, type: 'policy', sector: 'private-health' },
  { id: 'ra-phc-coshh', name: 'COSHH Risk Assessment', description: 'Chemical safety', price: 24.99, type: 'risk-assessment', sector: 'private-health' },
  { id: 'ra-phc-medical-equipment', name: 'Medical Equipment Risk Assessment', description: 'Device safety and maintenance', price: 24.99, type: 'risk-assessment', sector: 'private-health' },
];

// Bundles
const BUNDLES: Bundle[] = [
  {
    id: 'bundle-care-home',
    name: 'Care Home Starter',
    description: 'Essential policies and risk assessments for care homes',
    price: 199.99,
    originalPrice: 349.99,
    save: 'Save £150',
    productCount: 7,
    productIds: ['policy-ch-complaints', 'policy-ch-eol', 'policy-ch-falls', 'policy-ch-fire', 'policy-ch-ipc', 'ra-ch-falls', 'ra-ch-medication'],
    sector: 'care-homes'
  },
  {
    id: 'bundle-dental',
    name: 'Dental Practice Pro',
    description: 'Complete compliance package for dental practices',
    price: 279.99,
    originalPrice: 479.99,
    save: 'Save £200',
    productCount: 6,
    productIds: ['policy-dent-complaints', 'policy-dent-consent', 'policy-dent-ipc', 'policy-dent-radiation', 'ra-dent-conscious-sedation', 'ra-dent-cross-infection'],
    sector: 'dental',
    badge: '★ POPULAR'
  },
  {
    id: 'bundle-gp',
    name: 'GP Surgery Essentials',
    description: 'NHS-aligned policies and assessments',
    price: 249.99,
    originalPrice: 449.99,
    save: 'Save £200',
    productCount: 6,
    productIds: ['policy-gp-complaints', 'policy-gp-consent', 'policy-gp-data-protection', 'policy-gp-ipc', 'ra-gp-coshh', 'ra-gp-ipc'],
    sector: 'gp'
  },
  {
    id: 'bundle-aesthetic',
    name: 'Aesthetic Clinic Complete',
    description: 'Comprehensive policies for aesthetic practitioners',
    price: 329.99,
    originalPrice: 599.99,
    save: 'Save £270',
    productCount: 6,
    productIds: ['policy-aes-consent', 'policy-aes-ipc', 'policy-aes-marketing', 'ra-aes-botox', 'ra-aes-dermal-fillers', 'ra-aes-laser-ipl'],
    sector: 'aesthetic'
  },
  {
    id: 'bundle-private',
    name: 'Private Healthcare Package',
    description: 'Clinical governance and compliance bundle',
    price: 299.99,
    originalPrice: 499.99,
    save: 'Save £200',
    productCount: 5,
    productIds: ['policy-phc-clinical-governance', 'policy-phc-consent', 'policy-phc-data-protection', 'ra-phc-coshh', 'ra-phc-medical-equipment'],
    sector: 'private-health'
  },
];

const SECTORS = [
  { id: 'all', name: 'All Sectors', icon: '🏥' },
  { id: 'care-homes', name: 'Care Homes', icon: '👴' },
  { id: 'dental', name: 'Dental Clinics', icon: '🦷' },
  { id: 'gp', name: 'GP Surgeries', icon: '⚕️' },
  { id: 'aesthetic', name: 'Aesthetic Clinics', icon: '✨' },
  { id: 'private-health', name: 'Private Healthcare', icon: '🏨' },
];

function ShopContent() {
  const [selectedSector, setSelectedSector] = useState('all');
  const [viewType, setViewType] = useState<'bundles' | 'individual'>('bundles');
  const searchParams = useSearchParams();

  const filteredBundles = selectedSector === 'all' ? BUNDLES : BUNDLES.filter(b => b.sector === selectedSector);
  const filteredProducts = selectedSector === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.sector === selectedSector);

  const handleAddToCart = (item: any) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`✓ Added to cart! Items: ${cart.length}`);
  };

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
                <div style={{ fontSize: '11px', color: '#999', fontWeight: '600', letterSpacing: '0.05em' }}>TEMPLATES</div>
              </div>
            </div>
          </Link>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link href="/checkout" style={{ textDecoration: 'none' }}>
              <button style={{
                backgroundColor: '#D4AF37',
                color: '#0B1D3A',
                padding: '0.75rem 1.5rem',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '700',
                fontSize: '14px',
                cursor: 'pointer'
              }}>
                🛒 Cart
              </button>
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
        </div>
      </header>

      {/* DO I NEED CQC? SECTION - NEAR TOP */}
      <section style={{
        backgroundColor: '#0B1D3A',
        color: '#fff',
        padding: '2rem 1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            marginBottom: '1rem'
          }}>
            ❓ Do I Need CQC Compliance Templates?
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {[
              { title: 'If you operate healthcare services...', check: '✓ YES - You need CQC compliance' },
              { title: 'If you employ clinical staff...', check: '✓ YES - Required for governance' },
              { title: 'If you have patients/clients...', check: '✓ YES - Safety and duty of care' },
              { title: 'If you handle medication...', check: '✓ YES - Essential documentation' },
            ].map((item, i) => (
              <div key={i} style={{
                backgroundColor: 'rgba(212,175,55,0.1)',
                padding: '1rem',
                borderRadius: '6px',
                borderLeft: '4px solid #D4AF37'
              }}>
                <p style={{ fontSize: '14px', margin: '0 0 0.5rem 0' }}>{item.title}</p>
                <p style={{ fontSize: '16px', fontWeight: '700', color: '#D4AF37', margin: 0 }}>{item.check}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTOR FILTER */}
      <section style={{ padding: '2rem 1.5rem', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: '#0B1D3A' }}>Select Your Sector</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1rem'
          }}>
            {SECTORS.map(sector => (
              <button
                key={sector.id}
                onClick={() => setSelectedSector(sector.id)}
                style={{
                  padding: '1rem',
                  border: '2px solid ' + (selectedSector === sector.id ? '#D4AF37' : '#e5e5e5'),
                  backgroundColor: selectedSector === sector.id ? '#fef9f2' : '#fff',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: selectedSector === sector.id ? '700' : '600',
                  fontSize: '14px',
                  color: selectedSector === sector.id ? '#0B1D3A' : '#666',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ fontSize: '24px', marginBottom: '0.5rem' }}>{sector.icon}</div>
                {sector.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* VIEW TYPE TOGGLE */}
      <section style={{ padding: '2rem 1.5rem', borderBottom: '1px solid #f0f0f0', backgroundColor: '#f9f9f9' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => setViewType('bundles')}
            style={{
              padding: '0.75rem 1.5rem',
              border: '2px solid ' + (viewType === 'bundles' ? '#D4AF37' : '#e5e5e5'),
              backgroundColor: viewType === 'bundles' ? '#0B1D3A' : '#fff',
              color: viewType === 'bundles' ? '#D4AF37' : '#666',
              borderRadius: '6px',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            📦 Starter Bundles
          </button>
          <button
            onClick={() => setViewType('individual')}
            style={{
              padding: '0.75rem 1.5rem',
              border: '2px solid ' + (viewType === 'individual' ? '#D4AF37' : '#e5e5e5'),
              backgroundColor: viewType === 'individual' ? '#0B1D3A' : '#fff',
              color: viewType === 'individual' ? '#D4AF37' : '#666',
              borderRadius: '6px',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            📄 Individual Templates
          </button>
        </div>
      </section>

      {/* BUNDLES VIEW */}
      {viewType === 'bundles' && (
        <section style={{ padding: '3rem 1.5rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '2rem', color: '#0B1D3A' }}>
              {selectedSector === 'all' ? 'All Starter Bundles' : `${SECTORS.find(s => s.id === selectedSector)?.name} Bundles`}
            </h2>
            {filteredBundles.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem' }}>
                <p style={{ color: '#999', fontSize: '16px' }}>No bundles available for this sector yet. Check back soon!</p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '2rem'
              }}>
                {filteredBundles.map(bundle => (
                  <div
                    key={bundle.id}
                    style={{
                      backgroundColor: bundle.badge ? '#0B1D3A' : '#fff',
                      color: bundle.badge ? '#fff' : '#333',
                      border: bundle.badge ? '2px solid #D4AF37' : '1px solid #e5e5e5',
                      borderRadius: '12px',
                      padding: '2rem',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative'
                    }}
                  >
                    {bundle.badge && (
                      <div style={{
                        position: 'absolute',
                        top: '-12px',
                        left: '1rem',
                        backgroundColor: '#D4AF37',
                        color: '#0B1D3A',
                        padding: '0.25rem 0.75rem',
                        fontWeight: '700',
                        fontSize: '12px',
                        borderRadius: '3px'
                      }}>
                        {bundle.badge}
                      </div>
                    )}
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', marginTop: bundle.badge ? '0.75rem' : 0 }}>
                      {bundle.name}
                    </h3>
                    <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '1rem' }}>{bundle.description}</p>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: bundle.badge ? '#D4AF37' : '#666', marginBottom: '1rem' }}>
                      📦 {bundle.productCount} templates
                    </p>
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#D4AF37', marginBottom: '0.5rem' }}>
                        £{bundle.price.toFixed(2)}
                      </div>
                      <div style={{ fontSize: '13px', opacity: 0.8 }}>
                        Was £{bundle.originalPrice.toFixed(2)} · {bundle.save}
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddToCart(bundle)}
                      style={{
                        marginTop: 'auto',
                        padding: '1rem',
                        backgroundColor: '#D4AF37',
                        color: '#0B1D3A',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        fontSize: '16px'
                      }}
                    >
                      + Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* INDIVIDUAL PRODUCTS VIEW */}
      {viewType === 'individual' && (
        <section style={{ padding: '3rem 1.5rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '2rem', color: '#0B1D3A' }}>
              Individual Templates
            </h2>
            {filteredProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem' }}>
                <p style={{ color: '#999', fontSize: '16px' }}>No templates available for this sector yet.</p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1.5rem'
              }}>
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    style={{
                      backgroundColor: '#fff',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                      padding: '1.5rem',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div style={{
                      display: 'inline-block',
                      width: 'fit-content',
                      backgroundColor: product.type === 'policy' ? '#e8f4f8' : '#f0e8f8',
                      color: product.type === 'policy' ? '#0B7BA7' : '#6B3BA0',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '3px',
                      fontSize: '12px',
                      fontWeight: '700',
                      marginBottom: '0.75rem'
                    }}>
                      {product.type === 'policy' ? '📋 Policy' : '⚠️ Risk Assessment'}
                    </div>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '0.5rem', color: '#0B1D3A' }}>
                      {product.name}
                    </h3>
                    <p style={{ fontSize: '14px', color: '#666', marginBottom: '1rem', flex: 1 }}>
                      {product.description}
                    </p>
                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ fontSize: '1.75rem', fontWeight: '700', color: '#D4AF37' }}>
                        £{product.price.toFixed(2)}
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      style={{
                        padding: '0.875rem',
                        backgroundColor: '#0B1D3A',
                        color: '#D4AF37',
                        border: '2px solid #D4AF37',
                        borderRadius: '6px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      + Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* CTA SECTION */}
      <section style={{ padding: '3rem 1.5rem', backgroundColor: '#0B1D3A', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: '#D4AF37' }}>
            Need Consulting Help?
          </h2>
          <p style={{ fontSize: '16px', color: '#d1d5db', marginBottom: '2rem', lineHeight: '1.6' }}>
            Our CQC consultants can guide you through compliance. Schedule a free consultation.
          </p>
          <Link href="/contact" style={{ textDecoration: 'none' }}>
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
              📞 Get in Touch
            </button>
          </Link>
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
        <p>© 2026 BarkerScott Ltd. | CQC Compliance Templates</p>
        <p style={{ marginTop: '0.5rem' }}>📞 07407 184948 | 📧 info@barker-scott.co.uk</p>
      </footer>
    </div>
  );
}

export default function PoliciesPage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}