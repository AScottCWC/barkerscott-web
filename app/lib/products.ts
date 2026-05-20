export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'policy' | 'risk-assessment' | 'bundle';
  sector: string;
  description: string;
  savings?: string;
}

export const POLICIES: Product[] = [
  // Aesthetic Sector - 10 policies
  { id: 'p-aes-01', name: 'Adverse Event Management Policy', price: 37.99, category: 'policy', sector: 'Aesthetic', description: 'Complications management' },
  { id: 'p-aes-02', name: 'Client Safeguarding Policy', price: 39.99, category: 'policy', sector: 'Aesthetic', description: 'Vulnerable client protection' },
  { id: 'p-aes-03', name: 'Complaints Policy', price: 34.99, category: 'policy', sector: 'Aesthetic', description: 'Complaint resolution' },
  { id: 'p-aes-04', name: 'Consent Risk Disclosure Policy', price: 36.99, category: 'policy', sector: 'Aesthetic', description: 'Informed consent procedures' },
  { id: 'p-aes-05', name: 'Health Safety Policy', price: 38.99, category: 'policy', sector: 'Aesthetic', description: 'Workplace safety' },
  { id: 'p-aes-06', name: 'Infection Control Policy', price: 35.99, category: 'policy', sector: 'Aesthetic', description: 'Sterile technique' },
  { id: 'p-aes-07', name: 'Marketing Advertising Policy', price: 33.99, category: 'policy', sector: 'Aesthetic', description: 'Responsible marketing' },
  { id: 'p-aes-08', name: 'Practitioner Competency Policy', price: 37.99, category: 'policy', sector: 'Aesthetic', description: 'Training and assessment' },
  { id: 'p-aes-09', name: 'Privacy Data Protection Policy', price: 36.99, category: 'policy', sector: 'Aesthetic', description: 'GDPR compliance' },
  { id: 'p-aes-10', name: 'Product Management Policy', price: 34.99, category: 'policy', sector: 'Aesthetic', description: 'Product handling' },

  // GP Surgery Sector - 10 policies
  { id: 'p-gp-01', name: 'Complaints Handling', price: 36.99, category: 'policy', sector: 'GP Surgery', description: 'Patient complaint procedures' },
  { id: 'p-gp-02', name: 'Consent and Confidentiality', price: 38.99, category: 'policy', sector: 'GP Surgery', description: 'Patient consent and privacy' },
  { id: 'p-gp-03', name: 'Data Protection and Information Governance', price: 37.99, category: 'policy', sector: 'GP Surgery', description: 'GDPR and records management' },
  { id: 'p-gp-04', name: 'Equality Diversity and Inclusion', price: 33.99, category: 'policy', sector: 'GP Surgery', description: 'Non-discrimination policy' },
  { id: 'p-gp-05', name: 'Fire Safety', price: 34.99, category: 'policy', sector: 'GP Surgery', description: 'Fire prevention and evacuation' },
  { id: 'p-gp-06', name: 'Health and Safety', price: 38.99, category: 'policy', sector: 'GP Surgery', description: 'Workplace safety' },
  { id: 'p-gp-07', name: 'Infection Prevention and Control', price: 35.99, category: 'policy', sector: 'GP Surgery', description: 'Infection control procedures' },
  { id: 'p-gp-08', name: 'Lone Working', price: 32.99, category: 'policy', sector: 'GP Surgery', description: 'Solo worker safety' },
  { id: 'p-gp-09', name: 'Medicines Management', price: 39.99, category: 'policy', sector: 'GP Surgery', description: 'Medication safe handling' },
  { id: 'p-gp-10', name: 'Safeguarding Children and Adults', price: 37.99, category: 'policy', sector: 'GP Surgery', description: 'Protection procedures' },

  // Private Healthcare Sector - 10 policies
  { id: 'p-ph-01', name: 'Business Continuity Policy', price: 37.99, category: 'policy', sector: 'Private Healthcare', description: 'Service continuity planning' },
  { id: 'p-ph-02', name: 'Clinical Governance Policy', price: 39.99, category: 'policy', sector: 'Private Healthcare', description: 'Quality assurance' },
  { id: 'p-ph-03', name: 'Complaints Handling Policy', price: 36.99, category: 'policy', sector: 'Private Healthcare', description: 'Patient complaint resolution' },
  { id: 'p-ph-04', name: 'Consent to Treatment Policy', price: 35.99, category: 'policy', sector: 'Private Healthcare', description: 'Informed consent procedures' },
  { id: 'p-ph-05', name: 'Data Protection and Confidentiality Policy', price: 37.99, category: 'policy', sector: 'Private Healthcare', description: 'GDPR compliance' },
  { id: 'p-ph-06', name: 'Health and Safety Policy', price: 38.99, category: 'policy', sector: 'Private Healthcare', description: 'Workplace safety standards' },
  { id: 'p-ph-07', name: 'Infection Prevention and Control Policy', price: 35.99, category: 'policy', sector: 'Private Healthcare', description: 'Infection control procedures' },
  { id: 'p-ph-08', name: 'Medicines Management Policy', price: 39.99, category: 'policy', sector: 'Private Healthcare', description: 'Safe medication handling' },
  { id: 'p-ph-09', name: 'Safeguarding Adults Policy', price: 36.99, category: 'policy', sector: 'Private Healthcare', description: 'Adult protection procedures' },
  { id: 'p-ph-10', name: 'Staffing and Recruitment Policy', price: 33.99, category: 'policy', sector: 'Private Healthcare', description: 'Staff management' },
];

export const RISK_ASSESSMENTS: Product[] = [
  // Aesthetic Sector - 10 RAs
  { id: 'ra-aes-01', name: 'Botulinum Toxin Administration RA', price: 32.99, category: 'risk-assessment', sector: 'Aesthetic', description: 'Botox injection risks' },
  { id: 'ra-aes-02', name: 'Chemical Skin Peels RA', price: 29.99, category: 'risk-assessment', sector: 'Aesthetic', description: 'Chemical peel hazards' },
  { id: 'ra-aes-03', name: 'Cryotherapy Cryolipolysis RA', price: 31.99, category: 'risk-assessment', sector: 'Aesthetic', description: 'Cold therapy risks' },
  { id: 'ra-aes-04', name: 'Dermal Filler Treatments RA', price: 33.99, category: 'risk-assessment', sector: 'Aesthetic', description: 'Filler injection risks' },
  { id: 'ra-aes-05', name: 'Infection Prevention Control IPC RA', price: 28.99, category: 'risk-assessment', sector: 'Aesthetic', description: 'Cross-infection risks' },
  { id: 'ra-aes-06', name: 'Laser IPL Treatments RA', price: 32.99, category: 'risk-assessment', sector: 'Aesthetic', description: 'Laser safety hazards' },
  { id: 'ra-aes-07', name: 'Microneedling Collagen Induction RA', price: 30.99, category: 'risk-assessment', sector: 'Aesthetic', description: 'Microneedling risks' },
  { id: 'ra-aes-08', name: 'Patient Consultation Consent RA', price: 27.99, category: 'risk-assessment', sector: 'Aesthetic', description: 'Consent procedure risks' },
  { id: 'ra-aes-09', name: 'Platelet Rich Plasma PRP RA', price: 31.99, category: 'risk-assessment', sector: 'Aesthetic', description: 'PRP treatment risks' },
  { id: 'ra-aes-10', name: 'Thread Lift Procedures PDO RA', price: 33.99, category: 'risk-assessment', sector: 'Aesthetic', description: 'Thread lift risks' },

  // GP Surgery Sector - 10 RAs
  { id: 'ra-gp-01', name: 'COSHH RA', price: 28.99, category: 'risk-assessment', sector: 'GP Surgery', description: 'Chemical hazards' },
  { id: 'ra-gp-02', name: 'Data Protection RA', price: 27.99, category: 'risk-assessment', sector: 'GP Surgery', description: 'Data security risks' },
  { id: 'ra-gp-03', name: 'Display Screen Equipment DSE RA', price: 26.99, category: 'risk-assessment', sector: 'GP Surgery', description: 'Screen work hazards' },
  { id: 'ra-gp-04', name: 'Fire Safety RA', price: 29.99, category: 'risk-assessment', sector: 'GP Surgery', description: 'Fire hazards' },
  { id: 'ra-gp-05', name: 'Infection Prevention and Control RA', price: 28.99, category: 'risk-assessment', sector: 'GP Surgery', description: 'Infection risks' },
  { id: 'ra-gp-06', name: 'Lone Working RA', price: 25.99, category: 'risk-assessment', sector: 'GP Surgery', description: 'Solo worker risks' },
  { id: 'ra-gp-07', name: 'Manual Handling RA', price: 27.99, category: 'risk-assessment', sector: 'GP Surgery', description: 'Moving and handling risks' },
  { id: 'ra-gp-08', name: 'Medicines Management and Storage RA', price: 31.99, category: 'risk-assessment', sector: 'GP Surgery', description: 'Medication safety' },
  { id: 'ra-gp-09', name: 'Safeguarding Adults and Children RA', price: 29.99, category: 'risk-assessment', sector: 'GP Surgery', description: 'Safeguarding risks' },
  { id: 'ra-gp-10', name: 'Workplace Violence and Aggression RA', price: 28.99, category: 'risk-assessment', sector: 'GP Surgery', description: 'Violence risks' },

  // Private Healthcare Sector - 10 RAs
  { id: 'ra-ph-01', name: 'COSHH RA', price: 28.99, category: 'risk-assessment', sector: 'Private Healthcare', description: 'Chemical hazards' },
  { id: 'ra-ph-02', name: 'Fire Safety RA', price: 29.99, category: 'risk-assessment', sector: 'Private Healthcare', description: 'Fire hazards' },
  { id: 'ra-ph-03', name: 'Infection Control RA', price: 27.99, category: 'risk-assessment', sector: 'Private Healthcare', description: 'Infection risks' },
  { id: 'ra-ph-04', name: 'Information Governance Cyber RA', price: 31.99, category: 'risk-assessment', sector: 'Private Healthcare', description: 'Cyber security risks' },
  { id: 'ra-ph-05', name: 'Lone Working RA', price: 25.99, category: 'risk-assessment', sector: 'Private Healthcare', description: 'Solo worker risks' },
  { id: 'ra-ph-06', name: 'Manual Handling RA', price: 27.99, category: 'risk-assessment', sector: 'Private Healthcare', description: 'Moving hazards' },
  { id: 'ra-ph-07', name: 'Medical Equipment Devices RA', price: 32.99, category: 'risk-assessment', sector: 'Private Healthcare', description: 'Equipment safety' },
  { id: 'ra-ph-08', name: 'Medicines Storage Handling RA', price: 30.99, category: 'risk-assessment', sector: 'Private Healthcare', description: 'Medication safety' },
  { id: 'ra-ph-09', name: 'Slips Trips Falls RA', price: 26.99, category: 'risk-assessment', sector: 'Private Healthcare', description: 'Slip hazards' },
  { id: 'ra-ph-10', name: 'Violence Aggression RA', price: 28.99, category: 'risk-assessment', sector: 'Private Healthcare', description: 'Violence risks' },
];

export const BUNDLES: Product[] = [
  {
    id: 'b-aes-01',
    name: 'Aesthetic Clinic Complete',
    price: 249.99,
    category: 'bundle',
    sector: 'Aesthetic',
    description: '10 policies + 10 risk assessments for aesthetic clinics',
    savings: 'Save £80'
  },
  {
    id: 'b-gp-01',
    name: 'GP Surgery Essentials',
    price: 219.99,
    category: 'bundle',
    sector: 'GP Surgery',
    description: '10 policies + 10 risk assessments for GP practices',
    savings: 'Save £80'
  },
  {
    id: 'b-ph-01',
    name: 'Private Healthcare Package',
    price: 239.99,
    category: 'bundle',
    sector: 'Private Healthcare',
    description: '10 policies + 10 risk assessments for private clinics',
    savings: 'Save £80'
  },
];
