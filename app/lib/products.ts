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
  { id: 'aes-pol-001', name: 'Adverse Event Management Policy', description: 'Handle complications from injectable treatments', price: 37.99, sector: 'aesthetic', type: 'policy' },
  { id: 'aes-pol-002', name: 'Client Safeguarding Policy', description: 'Protect vulnerable clients', price: 39.99, sector: 'aesthetic', type: 'policy' },
  { id: 'aes-pol-003', name: 'Complaints Policy', description: 'Handle patient complaints', price: 34.99, sector: 'aesthetic', type: 'policy' },
  { id: 'aes-pol-004', name: 'Consent Risk Disclosure Policy', description: 'Document informed consent for procedures', price: 36.99, sector: 'aesthetic', type: 'policy' },
  { id: 'aes-pol-005', name: 'Health Safety Policy', description: 'Health and safety at work standards', price: 38.99, sector: 'aesthetic', type: 'policy' },
  { id: 'aes-pol-006', name: 'Infection Control Policy', description: 'Prevent cross-contamination', price: 35.99, sector: 'aesthetic', type: 'policy' },
  { id: 'aes-pol-007', name: 'Marketing Advertising Policy', description: 'Compliant advertising practices', price: 33.99, sector: 'aesthetic', type: 'policy' },
  { id: 'aes-pol-008', name: 'Practitioner Competency Policy', description: 'Staff training and competency', price: 37.99, sector: 'aesthetic', type: 'policy' },
  { id: 'aes-pol-009', name: 'Privacy Data Protection Policy', description: 'GDPR and data protection', price: 36.99, sector: 'aesthetic', type: 'policy' },
  { id: 'aes-pol-010', name: 'Product Management Policy', description: 'Drug and device management', price: 34.99, sector: 'aesthetic', type: 'policy' },
];

// AESTHETIC SECTOR RISK ASSESSMENTS
export const AESTHETIC_RAS: Product[] = [
  { id: 'aes-ra-001', name: 'Botulinum Toxin Administration RA', description: 'Risk assessment for Botox procedures', price: 32.99, sector: 'aesthetic', type: 'risk-assessment' },
  { id: 'aes-ra-002', name: 'Chemical Skin Peels RA', description: 'Risk assessment for chemical peels', price: 29.99, sector: 'aesthetic', type: 'risk-assessment' },
  { id: 'aes-ra-003', name: 'Cryotherapy Cryolipolysis RA', description: 'Risk assessment for cryotherapy', price: 31.99, sector: 'aesthetic', type: 'risk-assessment' },
  { id: 'aes-ra-004', name: 'Dermal Filler Treatments RA', description: 'Risk assessment for dermal fillers', price: 33.99, sector: 'aesthetic', type: 'risk-assessment' },
  { id: 'aes-ra-005', name: 'Infection Prevention Control IPC RA', description: 'Infection control risk assessment', price: 28.99, sector: 'aesthetic', type: 'risk-assessment' },
  { id: 'aes-ra-006', name: 'Laser IPL Treatments RA', description: 'Risk assessment for laser and IPL', price: 32.99, sector: 'aesthetic', type: 'risk-assessment' },
  { id: 'aes-ra-007', name: 'Microneedling Collagen Induction RA', description: 'Risk assessment for microneedling', price: 30.99, sector: 'aesthetic', type: 'risk-assessment' },
  { id: 'aes-ra-008', name: 'Patient Consultation Consent RA', description: 'Patient consent and consultation risk', price: 27.99, sector: 'aesthetic', type: 'risk-assessment' },
  { id: 'aes-ra-009', name: 'Platelet Rich Plasma PRP RA', description: 'Risk assessment for PRP treatments', price: 31.99, sector: 'aesthetic', type: 'risk-assessment' },
  { id: 'aes-ra-010', name: 'Thread Lift Procedures PDO RA', description: 'Risk assessment for thread lifts', price: 33.99, sector: 'aesthetic', type: 'risk-assessment' },
];

// GP SURGERY SECTOR POLICIES
export const GP_POLICIES: Product[] = [
  { id: 'gp-pol-001', name: 'Complaints Handling', description: 'Handle patient complaints', price: 36.99, sector: 'gp', type: 'policy' },
  { id: 'gp-pol-002', name: 'Consent and Confidentiality', description: 'Patient consent and confidentiality', price: 38.99, sector: 'gp', type: 'policy' },
  { id: 'gp-pol-003', name: 'Data Protection and Information Governance', description: 'GDPR and data governance', price: 37.99, sector: 'gp', type: 'policy' },
  { id: 'gp-pol-004', name: 'Equality Diversity and Inclusion', description: 'Equality and diversity standards', price: 33.99, sector: 'gp', type: 'policy' },
  { id: 'gp-pol-005', name: 'Fire Safety', description: 'Fire safety procedures', price: 34.99, sector: 'gp', type: 'policy' },
  { id: 'gp-pol-006', name: 'Health and Safety', description: 'Health and safety at work', price: 38.99, sector: 'gp', type: 'policy' },
  { id: 'gp-pol-007', name: 'Infection Prevention and Control', description: 'Infection control procedures', price: 35.99, sector: 'gp', type: 'policy' },
  { id: 'gp-pol-008', name: 'Lone Working', description: 'Lone worker safety procedures', price: 32.99, sector: 'gp', type: 'policy' },
  { id: 'gp-pol-009', name: 'Medicines Management', description: 'Safe medicines management', price: 39.99, sector: 'gp', type: 'policy' },
  { id: 'gp-pol-010', name: 'Safeguarding Children and Adults', description: 'Safeguarding procedures', price: 37.99, sector: 'gp', type: 'policy' },
];

// GP SURGERY SECTOR RISK ASSESSMENTS
export const GP_RAS: Product[] = [
  { id: 'gp-ra-001', name: 'COSHH RA', description: 'Hazardous substances risk assessment', price: 28.99, sector: 'gp', type: 'risk-assessment' },
  { id: 'gp-ra-002', name: 'Data Protection RA', description: 'Data security risk assessment', price: 27.99, sector: 'gp', type: 'risk-assessment' },
  { id: 'gp-ra-003', name: 'Display Screen Equipment DSE RA', description: 'Screen work risk assessment', price: 26.99, sector: 'gp', type: 'risk-assessment' },
  { id: 'gp-ra-004', name: 'Fire Safety RA', description: 'Fire safety risk assessment', price: 29.99, sector: 'gp', type: 'risk-assessment' },
  { id: 'gp-ra-005', name: 'Infection Prevention and Control RA', description: 'Infection control risk assessment', price: 28.99, sector: 'gp', type: 'risk-assessment' },
  { id: 'gp-ra-006', name: 'Lone Working RA', description: 'Lone working risk assessment', price: 25.99, sector: 'gp', type: 'risk-assessment' },
  { id: 'gp-ra-007', name: 'Manual Handling RA', description: 'Manual handling risk assessment', price: 27.99, sector: 'gp', type: 'risk-assessment' },
  { id: 'gp-ra-008', name: 'Medicines Management and Storage RA', description: 'Medicines storage risk assessment', price: 31.99, sector: 'gp', type: 'risk-assessment' },
  { id: 'gp-ra-009', name: 'Safeguarding Adults and Children RA', description: 'Safeguarding risk assessment', price: 29.99, sector: 'gp', type: 'risk-assessment' },
  { id: 'gp-ra-010', name: 'Workplace Violence and Aggression RA', description: 'Violence risk assessment', price: 28.99, sector: 'gp', type: 'risk-assessment' },
];

// PRIVATE HEALTHCARE SECTOR POLICIES
export const PRIVATE_HEALTH_POLICIES: Product[] = [
  { id: 'ph-pol-001', name: 'Business Continuity Policy', description: 'Business continuity planning', price: 37.99, sector: 'private-health', type: 'policy' },
  { id: 'ph-pol-002', name: 'Clinical Governance Policy', description: 'Clinical governance framework', price: 39.99, sector: 'private-health', type: 'policy' },
  { id: 'ph-pol-003', name: 'Complaints Handling Policy', description: 'Handle patient complaints', price: 36.99, sector: 'private-health', type: 'policy' },
  { id: 'ph-pol-004', name: 'Consent to Treatment Policy', description: 'Document informed consent', price: 35.99, sector: 'private-health', type: 'policy' },
  { id: 'ph-pol-005', name: 'Data Protection and Confidentiality Policy', description: 'GDPR and data confidentiality', price: 37.99, sector: 'private-health', type: 'policy' },
  { id: 'ph-pol-006', name: 'Health and Safety Policy', description: 'Health and safety standards', price: 38.99, sector: 'private-health', type: 'policy' },
  { id: 'ph-pol-007', name: 'Infection Prevention and Control Policy', description: 'Infection control procedures', price: 35.99, sector: 'private-health', type: 'policy' },
  { id: 'ph-pol-008', name: 'Medicines Management Policy', description: 'Safe medicines management', price: 39.99, sector: 'private-health', type: 'policy' },
  { id: 'ph-pol-009', name: 'Safeguarding Adults Policy', description: 'Adult safeguarding procedures', price: 36.99, sector: 'private-health', type: 'policy' },
  { id: 'ph-pol-010', name: 'Staffing and Recruitment Policy', description: 'Recruitment and staffing', price: 33.99, sector: 'private-health', type: 'policy' },
];

// PRIVATE HEALTHCARE SECTOR RISK ASSESSMENTS
export const PRIVATE_HEALTH_RAS: Product[] = [
  { id: 'ph-ra-001', name: 'COSHH RA', description: 'Hazardous substances assessment', price: 28.99, sector: 'private-health', type: 'risk-assessment' },
  { id: 'ph-ra-002', name: 'Fire Safety RA', description: 'Fire safety assessment', price: 29.99, sector: 'private-health', type: 'risk-assessment' },
  { id: 'ph-ra-003', name: 'Infection Control RA', description: 'Infection control assessment', price: 27.99, sector: 'private-health', type: 'risk-assessment' },
  { id: 'ph-ra-004', name: 'Information Governance Cyber RA', description: 'Cyber security assessment', price: 31.99, sector: 'private-health', type: 'risk-assessment' },
  { id: 'ph-ra-005', name: 'Lone Working RA', description: 'Lone working assessment', price: 25.99, sector: 'private-health', type: 'risk-assessment' },
  { id: 'ph-ra-006', name: 'Manual Handling RA', description: 'Manual handling assessment', price: 27.99, sector: 'private-health', type: 'risk-assessment' },
  { id: 'ph-ra-007', name: 'Medical Equipment Devices RA', description: 'Equipment safety assessment', price: 32.99, sector: 'private-health', type: 'risk-assessment' },
  { id: 'ph-ra-008', name: 'Medicines Storage Handling RA', description: 'Medicines storage assessment', price: 30.99, sector: 'private-health', type: 'risk-assessment' },
  { id: 'ph-ra-009', name: 'Slips Trips Falls RA', description: 'Slips, trips, falls assessment', price: 26.99, sector: 'private-health', type: 'risk-assessment' },
  { id: 'ph-ra-010', name: 'Violence Aggression RA', description: 'Violence risk assessment', price: 28.99, sector: 'private-health', type: 'risk-assessment' },
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
