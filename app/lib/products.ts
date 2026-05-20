// lib/products.ts

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sector: string;
  type: 'policy' | 'risk-assessment' | 'bundle';
  items?: string[];
  itemCount?: number;
}

// BUNDLES (calculated from item count - cheapest item)
export const BUNDLES: Product[] = [
  {
    id: 'bundle-aesthetic',
    name: 'Aesthetic Clinic Complete',
    description: '10 Policies + 6 Risk Assessments (16 templates total)',
    price: 549.99,
    sector: 'aesthetic',
    type: 'bundle',
    itemCount: 16,
    items: [
      'Consent & Risk Disclosure',
      'Infection Prevention & Control',
      'Adverse Event Management',
      'Medical Device Management',
      'Safeguarding Adults',
      'Data Protection & Confidentiality',
      'Complaints Handling',
      'Health & Safety at Work',
      'Staff Competency & Training',
      'Clinical Governance',
      'Botulinum Toxin Administration RA',
      'Dermal Filler Treatments RA',
      'Laser/IPL Treatments RA',
      'Chemical Skin Peels RA',
      'Microneedling/Collagen Induction RA',
      'Infection Control IPC RA',
    ]
  },
  {
    id: 'bundle-gp',
    name: 'GP Surgery Essentials',
    description: '10 Policies + 6 Risk Assessments (16 templates total)',
    price: 519.99,
    sector: 'gp',
    type: 'bundle',
    itemCount: 16,
    items: [
      'Safe Prescribing & Medicines Management',
      'Clinical Governance & Audit',
      'Safeguarding Children & Adults',
      'Data Protection & Information Governance',
      'Consent & Confidentiality',
      'Complaints Handling',
      'Health & Safety at Work',
      'Infection Prevention & Control',
      'Staff Recruitment & Fit Persons',
      'Equality, Diversity & Inclusion',
      'Prescribing Error Prevention RA',
      'Data Protection/Cyber Security RA',
      'Safeguarding Risk RA',
      'Manual Handling RA',
      'Fire Safety RA',
      'Display Screen Equipment (DSE) RA',
    ]
  },
  {
    id: 'bundle-private-health',
    name: 'Private Healthcare Package',
    description: '10 Policies + 7 Risk Assessments (17 templates total)',
    price: 579.99,
    sector: 'private-health',
    type: 'bundle',
    itemCount: 17,
    items: [
      'Clinical Governance & Quality Assurance',
      'Consent to Treatment & Capacity Assessment',
      'Safe Care & Treatment Pathways',
      'Infection Prevention & Control',
      'Medicines Management',
      'Safeguarding Adults & Children',
      'Data Protection & Confidentiality',
      'Complaints & Patient Feedback',
      'Staff Competency & Appraisal',
      'Business Continuity & Emergency Response',
      'Clinical Risk Assessment Framework RA',
      'Infection Control RA',
      'Medicines Handling RA',
      'Manual Handling RA',
      'Fire Safety & Emergency RA',
      'Information Governance/Cyber RA',
      'Business Continuity RA',
    ]
  },
  {
    id: 'bundle-adhd',
    name: 'ADHD Clinic Bundle',
    description: '8 Policies + 5 Risk Assessments (13 templates total)',
    price: 429.99,
    sector: 'adhd',
    type: 'bundle',
    itemCount: 13,
    items: [
      'ADHD Assessment Protocol & Documentation',
      'Medication Management & Shared Care Agreements',
      'Safeguarding Children & Young People',
      'Consent & Capacity Assessment',
      'Confidentiality & Data Protection',
      'Complaints Handling',
      'Clinical Governance',
      'Health & Safety',
      'Medication Safety & Prescribing RA',
      'Safeguarding Risk (children/vulnerable adults) RA',
      'Assessment Validity RA',
      'Data Protection/Confidentiality RA',
      'Patient Consent Capacity RA',
    ]
  },
  {
    id: 'bundle-weightloss',
    name: 'Weight Loss Clinic Complete',
    description: '10 Policies + 7 Risk Assessments (17 templates total)',
    price: 559.99,
    sector: 'weightloss',
    type: 'bundle',
    itemCount: 17,
    items: [
      'GLP-1 & Weight Loss Medication Prescribing Protocol',
      'Cardiovascular Assessment & Monitoring',
      'Psychological Screening & Assessment',
      'Informed Consent & Risk Disclosure',
      'Safeguarding (eating disorders, vulnerable groups)',
      'Data Protection & Confidentiality',
      'Complaints Handling',
      'Clinical Governance',
      'Health & Safety at Work',
      'Staff Training & Competency',
      'Cardiovascular Risk (obesity, diabetes) RA',
      'Medication Safety (GLP-1, interactions) RA',
      'Pancreatitis & GI Risk RA',
      'Psychological/Eating Disorder Risk RA',
      'Patient Monitoring Protocol RA',
      'Prescribing Error Prevention RA',
      'Dietary Assessment Safety RA',
    ]
  },
  {
    id: 'bundle-telehealth',
    name: 'Online/Virtual Clinic Pro',
    description: '10 Policies + 7 Risk Assessments (17 templates total)',
    price: 559.99,
    sector: 'telehealth',
    type: 'bundle',
    itemCount: 17,
    items: [
      'Telehealth Consent & Patient Verification',
      'Digital Security & Cybersecurity',
      'Remote Patient Assessment Protocol',
      'Confidentiality & Data Protection (GDPR + Telehealth)',
      'Emergency Response & Patient Escalation',
      'Prescribing via Telemedicine (inc. controlled substances)',
      'Clinical Governance (remote delivery)',
      'Service Continuity & Technology Failure',
      'Complaints Handling',
      'Health & Safety (Home-based assessment considerations)',
      'Digital Access/Exclusion RA',
      'Cybersecurity & Data Breach RA',
      'Consent Validity (remote) RA',
      'Emergency Response (no physical location) RA',
      'Controlled Substance Prescribing (telehealth) RA',
      'Business Continuity & System Failure RA',
      'Patient Safety (no in-person examination) RA',
    ]
  },
];

// AESTHETIC SECTOR POLICIES
export const AESTHETIC_POLICIES: Product[] = [
  { id: 'aes-pol-001', name: 'Adverse Event Management Policy', price: 37.99, sector: 'aesthetic', type: 'policy' },
  { id: 'aes-pol-002', name: 'Client Safeguarding Policy', price: 39.99, sector: 'aesthetic', type: 'policy' },
  { id: 'aes-pol-003', name: 'Complaints Policy', price: 34.99, sector: 'aesthetic', type: 'policy' },
  { id: 'aes-pol-004', name: 'Consent Risk Disclosure Policy', price: 36.99, sector: 'aesthetic', type: 'policy' },
  { id: 'aes-pol-005', name: 'Health Safety Policy', price: 38.99, sector: 'aesthetic', type: 'policy' },
  { id: 'aes-pol-006', name: 'Infection Control Policy', price: 35.99, sector: 'aesthetic', type: 'policy' },
  { id: 'aes-pol-007', name: 'Marketing Advertising Policy', price: 33.99, sector: 'aesthetic', type: 'policy' },
  { id: 'aes-pol-008', name: 'Practitioner Competency Policy', price: 37.99, sector: 'aesthetic', type: 'policy' },
  { id: 'aes-pol-009', name: 'Privacy Data Protection Policy', price: 36.99, sector: 'aesthetic', type: 'policy' },
  { id: 'aes-pol-010', name: 'Product Management Policy', price: 34.99, sector: 'aesthetic', type: 'policy' },
];

// AESTHETIC SECTOR RISK ASSESSMENTS
export const AESTHETIC_RAS: Product[] = [
  { id: 'aes-ra-001', name: 'Botulinum Toxin Administration RA', price: 32.99, sector: 'aesthetic', type: 'risk-assessment' },
  { id: 'aes-ra-002', name: 'Chemical Skin Peels RA', price: 29.99, sector: 'aesthetic', type: 'risk-assessment' },
  { id: 'aes-ra-003', name: 'Cryotherapy Cryolipolysis RA', price: 31.99, sector: 'aesthetic', type: 'risk-assessment' },
  { id: 'aes-ra-004', name: 'Dermal Filler Treatments RA', price: 33.99, sector: 'aesthetic', type: 'risk-assessment' },
  { id: 'aes-ra-005', name: 'Infection Prevention Control IPC RA', price: 28.99, sector: 'aesthetic', type: 'risk-assessment' },
  { id: 'aes-ra-006', name: 'Laser IPL Treatments RA', price: 32.99, sector: 'aesthetic', type: 'risk-assessment' },
  { id: 'aes-ra-007', name: 'Microneedling Collagen Induction RA', price: 30.99, sector: 'aesthetic', type: 'risk-assessment' },
  { id: 'aes-ra-008', name: 'Patient Consultation Consent RA', price: 27.99, sector: 'aesthetic', type: 'risk-assessment' },
  { id: 'aes-ra-009', name: 'Platelet Rich Plasma PRP RA', price: 31.99, sector: 'aesthetic', type: 'risk-assessment' },
  { id: 'aes-ra-010', name: 'Thread Lift Procedures PDO RA', price: 33.99, sector: 'aesthetic', type: 'risk-assessment' },
];

// GP SURGERY SECTOR POLICIES
export const GP_POLICIES: Product[] = [
  { id: 'gp-pol-001', name: 'Complaints Handling', price: 36.99, sector: 'gp', type: 'policy' },
  { id: 'gp-pol-002', name: 'Consent and Confidentiality', price: 38.99, sector: 'gp', type: 'policy' },
  { id: 'gp-pol-003', name: 'Data Protection and Information Governance', price: 37.99, sector: 'gp', type: 'policy' },
  { id: 'gp-pol-004', name: 'Equality Diversity and Inclusion', price: 33.99, sector: 'gp', type: 'policy' },
  { id: 'gp-pol-005', name: 'Fire Safety', price: 34.99, sector: 'gp', type: 'policy' },
  { id: 'gp-pol-006', name: 'Health and Safety', price: 38.99, sector: 'gp', type: 'policy' },
  { id: 'gp-pol-007', name: 'Infection Prevention and Control', price: 35.99, sector: 'gp', type: 'policy' },
  { id: 'gp-pol-008', name: 'Lone Working', price: 32.99, sector: 'gp', type: 'policy' },
  { id: 'gp-pol-009', name: 'Medicines Management', price: 39.99, sector: 'gp', type: 'policy' },
  { id: 'gp-pol-010', name: 'Safeguarding Children and Adults', price: 37.99, sector: 'gp', type: 'policy' },
];

// GP SURGERY SECTOR RISK ASSESSMENTS
export const GP_RAS: Product[] = [
  { id: 'gp-ra-001', name: 'COSHH RA', price: 28.99, sector: 'gp', type: 'risk-assessment' },
  { id: 'gp-ra-002', name: 'Data Protection RA', price: 27.99, sector: 'gp', type: 'risk-assessment' },
  { id: 'gp-ra-003', name: 'Display Screen Equipment DSE RA', price: 26.99, sector: 'gp', type: 'risk-assessment' },
  { id: 'gp-ra-004', name: 'Fire Safety RA', price: 29.99, sector: 'gp', type: 'risk-assessment' },
  { id: 'gp-ra-005', name: 'Infection Prevention and Control RA', price: 28.99, sector: 'gp', type: 'risk-assessment' },
  { id: 'gp-ra-006', name: 'Lone Working RA', price: 25.99, sector: 'gp', type: 'risk-assessment' },
  { id: 'gp-ra-007', name: 'Manual Handling RA', price: 27.99, sector: 'gp', type: 'risk-assessment' },
  { id: 'gp-ra-008', name: 'Medicines Management and Storage RA', price: 31.99, sector: 'gp', type: 'risk-assessment' },
  { id: 'gp-ra-009', name: 'Safeguarding Adults and Children RA', price: 29.99, sector: 'gp', type: 'risk-assessment' },
  { id: 'gp-ra-010', name: 'Workplace Violence and Aggression RA', price: 28.99, sector: 'gp', type: 'risk-assessment' },
];

// PRIVATE HEALTHCARE SECTOR POLICIES
export const PRIVATE_HEALTH_POLICIES: Product[] = [
  { id: 'ph-pol-001', name: 'Business Continuity Policy', price: 37.99, sector: 'private-health', type: 'policy' },
  { id: 'ph-pol-002', name: 'Clinical Governance Policy', price: 39.99, sector: 'private-health', type: 'policy' },
  { id: 'ph-pol-003', name: 'Complaints Handling Policy', price: 36.99, sector: 'private-health', type: 'policy' },
  { id: 'ph-pol-004', name: 'Consent to Treatment Policy', price: 35.99, sector: 'private-health', type: 'policy' },
  { id: 'ph-pol-005', name: 'Data Protection and Confidentiality Policy', price: 37.99, sector: 'private-health', type: 'policy' },
  { id: 'ph-pol-006', name: 'Health and Safety Policy', price: 38.99, sector: 'private-health', type: 'policy' },
  { id: 'ph-pol-007', name: 'Infection Prevention and Control Policy', price: 35.99, sector: 'private-health', type: 'policy' },
  { id: 'ph-pol-008', name: 'Medicines Management Policy', price: 39.99, sector: 'private-health', type: 'policy' },
  { id: 'ph-pol-009', name: 'Safeguarding Adults Policy', price: 36.99, sector: 'private-health', type: 'policy' },
  { id: 'ph-pol-010', name: 'Staffing and Recruitment Policy', price: 33.99, sector: 'private-health', type: 'policy' },
];

// PRIVATE HEALTHCARE SECTOR RISK ASSESSMENTS
export const PRIVATE_HEALTH_RAS: Product[] = [
  { id: 'ph-ra-001', name: 'COSHH RA', price: 28.99, sector: 'private-health', type: 'risk-assessment' },
  { id: 'ph-ra-002', name: 'Fire Safety RA', price: 29.99, sector: 'private-health', type: 'risk-assessment' },
  { id: 'ph-ra-003', name: 'Infection Control RA', price: 27.99, sector: 'private-health', type: 'risk-assessment' },
  { id: 'ph-ra-004', name: 'Information Governance Cyber RA', price: 31.99, sector: 'private-health', type: 'risk-assessment' },
  { id: 'ph-ra-005', name: 'Lone Working RA', price: 25.99, sector: 'private-health', type: 'risk-assessment' },
  { id: 'ph-ra-006', name: 'Manual Handling RA', price: 27.99, sector: 'private-health', type: 'risk-assessment' },
  { id: 'ph-ra-007', name: 'Medical Equipment Devices RA', price: 32.99, sector: 'private-health', type: 'risk-assessment' },
  { id: 'ph-ra-008', name: 'Medicines Storage Handling RA', price: 30.99, sector: 'private-health', type: 'risk-assessment' },
  { id: 'ph-ra-009', name: 'Slips Trips Falls RA', price: 26.99, sector: 'private-health', type: 'risk-assessment' },
  { id: 'ph-ra-010', name: 'Violence Aggression RA', price: 28.99, sector: 'private-health', type: 'risk-assessment' },
];

// COMBINED PRODUCT LISTS
export const ALL_PRODUCTS = [
  ...BUNDLES,
  ...AESTHETIC_POLICIES,
  ...AESTHETIC_RAS,
  ...GP_POLICIES,
  ...GP_RAS,
  ...PRIVATE_HEALTH_POLICIES,
  ...PRIVATE_HEALTH_RAS,
];

export function getProductById(id: string): Product | undefined {
  return ALL_PRODUCTS.find(p => p.id === id);
}

export function getProductsByType(type: 'policy' | 'risk-assessment' | 'bundle'): Product[] {
  return ALL_PRODUCTS.filter(p => p.type === type);
}

export function getProductsBySector(sector: string): Product[] {
  return ALL_PRODUCTS.filter(p => p.sector === sector);
}
