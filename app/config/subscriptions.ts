// Complete Bundle & Subscription Configuration
// All sectors: Aesthetics, Dental, Care Home, Weight Loss, Virtual Clinics, Private Healthcare, ADHD

export const SUBSCRIPTION_DETAILS = {
  monthly: 24.99,
  updateFrequency: 'Every 3 months',
  features: [
    'Automatic template updates when regulations change',
    'Detailed explanations of what changed in each update',
    'Monthly compliance news & alerts email',
    'Priority support',
    'Access to all future templates as they\'re added'
  ],
  starterBundleDiscount: 10, // 10% off when buying a bundle
};

export const ALL_BUNDLES = [
  {
    id: 'bundle-care-home',
    sector: 'care-homes',
    name: 'Care Home Starter',
    description: 'Essential policies and risk assessments for care homes',
    originalPrice: 269.99,
    price: 199.99,
    save: 'Save £70 (1 Free Policy + 1 Free RA)',
    productCount: 7,
    productIds: [
      'policy-ch-complaints', 'policy-ch-eol', 'policy-ch-falls', 
      'policy-ch-fire', 'policy-ch-ipc', 'ra-ch-falls', 'ra-ch-medication'
    ]
  },
  {
    id: 'bundle-dental',
    sector: 'dental',
    name: 'Dental Practice Pro',
    description: 'Complete compliance package for dental practices',
    originalPrice: 299.99,
    price: 219.99,
    save: 'Save £80 (1 Free Policy + 1 Free RA)',
    productCount: 6,
    productIds: [
      'policy-dent-complaints', 'policy-dent-consent', 'policy-dent-ipc',
      'policy-dent-radiation', 'ra-dent-conscious-sedation', 'ra-dent-cross-infection'
    ],
    badge: '★ POPULAR'
  },
  {
    id: 'bundle-aesthetic',
    sector: 'aesthetic',
    name: 'Aesthetic Clinic Complete',
    description: 'Comprehensive policies for aesthetic practitioners',
    originalPrice: 329.99,
    price: 249.99,
    save: 'Save £80 (1 Free Policy + 1 Free RA)',
    productCount: 6,
    productIds: [
      'policy-aes-consent', 'policy-aes-ipc', 'policy-aes-marketing',
      'ra-aes-botox', 'ra-aes-dermal-fillers', 'ra-aes-laser-ipl'
    ]
  },
  {
    id: 'bundle-gp',
    sector: 'gp',
    name: 'GP Surgery Essentials',
    description: 'NHS-aligned policies and assessments',
    originalPrice: 299.99,
    price: 219.99,
    save: 'Save £80 (1 Free Policy + 1 Free RA)',
    productCount: 6,
    productIds: [
      'policy-gp-complaints', 'policy-gp-consent', 'policy-gp-data-protection',
      'policy-gp-ipc', 'ra-gp-coshh', 'ra-gp-ipc'
    ]
  },
  {
    id: 'bundle-weight-loss',
    sector: 'weight-loss',
    name: 'Weight Loss Clinic Complete',
    description: 'Compliance bundle for weight management services',
    originalPrice: 289.99,
    price: 209.99,
    save: 'Save £80 (1 Free Policy + 1 Free RA)',
    productCount: 6,
    productIds: [
      'policy-wl-consent', 'policy-wl-data-protection', 'policy-wl-medical-supervision',
      'policy-wl-complaints', 'ra-wl-medication-interaction', 'ra-wl-patient-screening'
    ]
  },
  {
    id: 'bundle-virtual-clinic',
    sector: 'virtual-clinic',
    name: 'Virtual Clinic Package',
    description: 'Policies for online healthcare delivery',
    originalPrice: 289.99,
    price: 209.99,
    save: 'Save £80 (1 Free Policy + 1 Free RA)',
    productCount: 6,
    productIds: [
      'policy-vc-data-security', 'policy-vc-consent', 'policy-vc-confidentiality',
      'policy-vc-technical-support', 'ra-vc-cyber-security', 'ra-vc-patient-verification'
    ]
  },
  {
    id: 'bundle-adhd',
    sector: 'adhd',
    name: 'ADHD Clinic Essentials',
    description: 'Specialized compliance for ADHD diagnostic & management services',
    originalPrice: 309.99,
    price: 229.99,
    save: 'Save £80 (1 Free Policy + 1 Free RA)',
    productCount: 6,
    productIds: [
      'policy-adhd-diagnosis', 'policy-adhd-medication', 'policy-adhd-safeguarding',
      'policy-adhd-complaints', 'ra-adhd-child-safeguarding', 'ra-adhd-medication-management'
    ]
  },
  {
    id: 'bundle-private-health',
    sector: 'private-health',
    name: 'Private Healthcare Package',
    description: 'Clinical governance and compliance bundle',
    originalPrice: 319.99,
    price: 239.99,
    save: 'Save £80 (1 Free Policy + 1 Free RA)',
    productCount: 5,
    productIds: [
      'policy-phc-clinical-governance', 'policy-phc-consent', 'policy-phc-data-protection',
      'ra-phc-coshh', 'ra-phc-medical-equipment'
    ]
  },
];

export const SECTORS = [
  { id: 'all', name: 'All Sectors', icon: '🏥', color: '#0B1D3A' },
  { id: 'care-homes', name: 'Care Homes', icon: '👴', color: '#0B7BA7' },
  { id: 'dental', name: 'Dental', icon: '🦷', color: '#8B4513' },
  { id: 'aesthetic', name: 'Aesthetic', icon: '✨', color: '#D4A574' },
  { id: 'gp', name: 'GP Surgery', icon: '⚕️', color: '#228B22' },
  { id: 'weight-loss', name: 'Weight Loss', icon: '💪', color: '#DC143C' },
  { id: 'virtual-clinic', name: 'Virtual Clinic', icon: '💻', color: '#4169E1' },
  { id: 'adhd', name: 'ADHD', icon: '🧠', color: '#9370DB' },
  { id: 'private-health', name: 'Private Healthcare', icon: '🏥', color: '#2F4F4F' },
];