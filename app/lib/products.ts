// Pricing Structure:
// Individual Policies: £49.99 - £79.99
// Individual Risk Assessments: £39.99 - £59.99
// Bundles: £199.99 - £699.99

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
  // Care Homes - 15 policies
  { id: 'p-ch-01', name: 'Safeguarding Adults Policy', price: 49.99, category: 'policy', sector: 'Care Homes', description: 'Comprehensive safeguarding policy for care home residents' },
  { id: 'p-ch-02', name: 'Infection Control Policy', price: 54.99, category: 'policy', sector: 'Care Homes', description: 'Healthcare-associated infection prevention and control' },
  { id: 'p-ch-03', name: 'Medication Management Policy', price: 59.99, category: 'policy', sector: 'Care Homes', description: 'Safe medication administration and storage procedures' },
  { id: 'p-ch-04', name: 'Health & Safety Policy', price: 49.99, category: 'policy', sector: 'Care Homes', description: 'Workplace health and safety compliance' },
  { id: 'p-ch-05', name: 'Complaints Policy', price: 44.99, category: 'policy', sector: 'Care Homes', description: 'Formal complaints handling and resolution' },
  { id: 'p-ch-06', name: 'Whistleblowing Policy', price: 44.99, category: 'policy', sector: 'Care Homes', description: 'Protected disclosure procedure for staff' },
  { id: 'p-ch-07', name: 'Equality & Diversity Policy', price: 44.99, category: 'policy', sector: 'Care Homes', description: 'Non-discrimination and diversity standards' },
  { id: 'p-ch-08', name: 'Data Protection Policy', price: 54.99, category: 'policy', sector: 'Care Homes', description: 'GDPR and personal data handling' },
  { id: 'p-ch-09', name: 'Staff Training Policy', price: 49.99, category: 'policy', sector: 'Care Homes', description: 'Mandatory training and competency assessment' },
  { id: 'p-ch-10', name: 'Restraint & Restrictive Practice Policy', price: 59.99, category: 'policy', sector: 'Care Homes', description: 'Minimising use of restraint and restriction' },
  { id: 'p-ch-11', name: 'Nutrition & Hydration Policy', price: 49.99, category: 'policy', sector: 'Care Homes', description: 'Nutritional assessment and meal provision' },
  { id: 'p-ch-12', name: 'Falls Prevention Policy', price: 49.99, category: 'policy', sector: 'Care Homes', description: 'Risk assessment and prevention strategies' },
  { id: 'p-ch-13', name: 'Pressure Ulcer Prevention Policy', price: 54.99, category: 'policy', sector: 'Care Homes', description: 'Skin integrity and pressure area care' },
  { id: 'p-ch-14', name: 'Incident & Accident Reporting Policy', price: 49.99, category: 'policy', sector: 'Care Homes', description: 'Adverse event documentation and investigation' },
  { id: 'p-ch-15', name: 'End of Life Care Policy', price: 59.99, category: 'policy', sector: 'Care Homes', description: 'Palliative and end-of-life care management' },

  // Dental Practices - 12 policies
  { id: 'p-dp-01', name: 'Infection Control for Dental Settings', price: 59.99, category: 'policy', sector: 'Dental Practices', description: 'Dental-specific infection control procedures' },
  { id: 'p-dp-02', name: 'Decontamination Policy', price: 59.99, category: 'policy', sector: 'Dental Practices', description: 'Sterilisation and instrument decontamination' },
  { id: 'p-dp-03', name: 'X-Ray & Radiation Safety Policy', price: 59.99, category: 'policy', sector: 'Dental Practices', description: 'Radiological protection and safety' },
  { id: 'p-dp-04', name: 'Patient Consent Policy', price: 49.99, category: 'policy', sector: 'Dental Practices', description: 'Informed consent for dental treatment' },
  { id: 'p-dp-05', name: 'Emergency Preparedness Policy', price: 54.99, category: 'policy', sector: 'Dental Practices', description: 'Medical emergency procedures and equipment' },
  { id: 'p-dp-06', name: 'Dental Anaesthesia Policy', price: 59.99, category: 'policy', sector: 'Dental Practices', description: 'Safe administration of local anaesthetics' },
  { id: 'p-dp-07', name: 'Patient Records Management Policy', price: 49.99, category: 'policy', sector: 'Dental Practices', description: 'Dental record keeping and confidentiality' },
  { id: 'p-dp-08', name: 'Safeguarding Policy', price: 49.99, category: 'policy', sector: 'Dental Practices', description: 'Child and vulnerable adult protection' },
  { id: 'p-dp-09', name: 'Equality & Diversity Policy', price: 44.99, category: 'policy', sector: 'Dental Practices', description: 'Non-discrimination in dental practice' },
  { id: 'p-dp-10', name: 'Health & Safety Policy', price: 49.99, category: 'policy', sector: 'Dental Practices', description: 'Workplace safety in dental setting' },
  { id: 'p-dp-11', name: 'Complaints Handling Policy', price: 44.99, category: 'policy', sector: 'Dental Practices', description: 'Patient complaint resolution procedures' },
  { id: 'p-dp-12', name: 'Staff Training Policy', price: 49.99, category: 'policy', sector: 'Dental Practices', description: 'Professional development and competency' },

  // Aesthetic Clinics - 10 policies
  { id: 'p-ac-01', name: 'Consent & Risk Disclosure Policy', price: 59.99, category: 'policy', sector: 'Aesthetic Clinics', description: 'Informed consent for aesthetic procedures' },
  { id: 'p-ac-02', name: 'Infection Control Policy', price: 54.99, category: 'policy', sector: 'Aesthetic Clinics', description: 'Sterile technique and infection prevention' },
  { id: 'p-ac-03', name: 'Product Management Policy', price: 49.99, category: 'policy', sector: 'Aesthetic Clinics', description: 'Injectable and product handling' },
  { id: 'p-ac-04', name: 'Practitioner Competency Policy', price: 59.99, category: 'policy', sector: 'Aesthetic Clinics', description: 'Training and competency assessment' },
  { id: 'p-ac-05', name: 'Adverse Event Management Policy', price: 54.99, category: 'policy', sector: 'Aesthetic Clinics', description: 'Complications and side effect management' },
  { id: 'p-ac-06', name: 'Client Safeguarding Policy', price: 49.99, category: 'policy', sector: 'Aesthetic Clinics', description: 'Protection of vulnerable clients' },
  { id: 'p-ac-07', name: 'Health & Safety Policy', price: 49.99, category: 'policy', sector: 'Aesthetic Clinics', description: 'Workplace safety procedures' },
  { id: 'p-ac-08', name: 'Privacy & Data Protection Policy', price: 54.99, category: 'policy', sector: 'Aesthetic Clinics', description: 'Patient confidentiality and GDPR' },
  { id: 'p-ac-09', name: 'Complaints Policy', price: 44.99, category: 'policy', sector: 'Aesthetic Clinics', description: 'Complaint handling procedures' },
  { id: 'p-ac-10', name: 'Marketing & Advertising Policy', price: 44.99, category: 'policy', sector: 'Aesthetic Clinics', description: 'Responsible advertising standards' },

  // GP Practices - 8 policies
  { id: 'p-gp-01', name: 'Clinical Governance Policy', price: 59.99, category: 'policy', sector: 'GP Practices', description: 'Quality and performance management' },
  { id: 'p-gp-02', name: 'Prescribing Policy', price: 59.99, category: 'policy', sector: 'GP Practices', description: 'Safe prescribing practices' },
  { id: 'p-gp-03', name: 'Patient Access Policy', price: 49.99, category: 'policy', sector: 'GP Practices', description: 'Access and appointment management' },
  { id: 'p-gp-04', name: 'Infection Control Policy', price: 54.99, category: 'policy', sector: 'GP Practices', description: 'Infection prevention in primary care' },
  { id: 'p-gp-05', name: 'Safeguarding Policy', price: 49.99, category: 'policy', sector: 'GP Practices', description: 'Child and adult protection procedures' },
  { id: 'p-gp-06', name: 'Confidentiality Policy', price: 54.99, category: 'policy', sector: 'GP Practices', description: 'Patient privacy and information security' },
  { id: 'p-gp-07', name: 'Complaints Handling Policy', price: 44.99, category: 'policy', sector: 'GP Practices', description: 'Managing patient complaints' },
  { id: 'p-gp-08', name: 'Health & Safety Policy', price: 49.99, category: 'policy', sector: 'GP Practices', description: 'Workplace health and safety' },

  // Private Clinics - 10 policies
  { id: 'p-pc-01', name: 'Clinical Audit Policy', price: 54.99, category: 'policy', sector: 'Private Clinics', description: 'Quality assurance and clinical audit' },
  { id: 'p-pc-02', name: 'Equipment Maintenance Policy', price: 49.99, category: 'policy', sector: 'Private Clinics', description: 'Medical equipment service and maintenance' },
  { id: 'p-pc-03', name: 'Infection Control Policy', price: 54.99, category: 'policy', sector: 'Private Clinics', description: 'Sterilisation and infection prevention' },
  { id: 'p-pc-04', name: 'Staff Supervision Policy', price: 49.99, category: 'policy', sector: 'Private Clinics', description: 'Clinical supervision procedures' },
  { id: 'p-pc-05', name: 'Patient Feedback Policy', price: 44.99, category: 'policy', sector: 'Private Clinics', description: 'Patient satisfaction and feedback' },
  { id: 'p-pc-06', name: 'Confidentiality Policy', price: 54.99, category: 'policy', sector: 'Private Clinics', description: 'Information governance and privacy' },
  { id: 'p-pc-07', name: 'Emergency Procedures Policy', price: 54.99, category: 'policy', sector: 'Private Clinics', description: 'Medical emergency management' },
  { id: 'p-pc-08', name: 'Safeguarding Policy', price: 49.99, category: 'policy', sector: 'Private Clinics', description: 'Child and vulnerable adult protection' },
  { id: 'p-pc-09', name: 'Health & Safety Policy', price: 49.99, category: 'policy', sector: 'Private Clinics', description: 'Workplace safety standards' },
  { id: 'p-pc-10', name: 'Complaint Resolution Policy', price: 44.99, category: 'policy', sector: 'Private Clinics', description: 'Formal complaints procedure' },
];

export const RISK_ASSESSMENTS: Product[] = [
  // Care Homes - 15 assessments
  { id: 'ra-ch-01', name: 'Fire Safety Risk Assessment', price: 39.99, category: 'risk-assessment', sector: 'Care Homes', description: 'Fire hazards and evacuation procedures' },
  { id: 'ra-ch-02', name: 'Manual Handling Risk Assessment', price: 39.99, category: 'risk-assessment', sector: 'Care Homes', description: 'Moving and handling hazards' },
  { id: 'ra-ch-03', name: 'Infection Control Risk Assessment', price: 44.99, category: 'risk-assessment', sector: 'Care Homes', description: 'Disease transmission risks' },
  { id: 'ra-ch-04', name: 'Falls Risk Assessment', price: 39.99, category: 'risk-assessment', sector: 'Care Homes', description: 'Fall hazards and prevention' },
  { id: 'ra-ch-05', name: 'Pressure Ulcer Risk Assessment', price: 39.99, category: 'risk-assessment', sector: 'Care Homes', description: 'Skin integrity risks' },
  { id: 'ra-ch-06', name: 'Chemical Safety Risk Assessment', price: 39.99, category: 'risk-assessment', sector: 'Care Homes', description: 'Chemical storage and handling' },
  { id: 'ra-ch-07', name: 'Safeguarding Risk Assessment', price: 44.99, category: 'risk-assessment', sector: 'Care Homes', description: 'Abuse and exploitation risks' },
  { id: 'ra-ch-08', name: 'Nutrition Risk Assessment', price: 39.99, category: 'risk-assessment', sector: 'Care Homes', description: 'Malnutrition and dehydration risks' },
  { id: 'ra-ch-09', name: 'Medication Error Risk Assessment', price: 44.99, category: 'risk-assessment', sector: 'Care Homes', description: 'Drug administration errors' },
  { id: 'ra-ch-10', name: 'Environmental Hazards Risk Assessment', price: 39.99, category: 'risk-assessment', sector: 'Care Homes', description: 'Workplace environment risks' },
  { id: 'ra-ch-11', name: 'Legionella Risk Assessment', price: 44.99, category: 'risk-assessment', sector: 'Care Homes', description: 'Water system contamination risks' },
  { id: 'ra-ch-12', name: 'Allergen Risk Assessment', price: 39.99, category: 'risk-assessment', sector: 'Care Homes', description: 'Food and environmental allergens' },
  { id: 'ra-ch-13', name: 'Lone Worker Risk Assessment', price: 39.99, category: 'risk-assessment', sector: 'Care Homes', description: 'Solo worker safety' },
  { id: 'ra-ch-14', name: 'Noise Exposure Risk Assessment', price: 39.99, category: 'risk-assessment', sector: 'Care Homes', description: 'Workplace noise hazards' },
  { id: 'ra-ch-15', name: 'Violence and Aggression Risk Assessment', price: 44.99, category: 'risk-assessment', sector: 'Care Homes', description: 'Staff assault and violence risks' },

  // Dental Practices - 12 assessments
  { id: 'ra-dp-01', name: 'Infection Control Risk Assessment', price: 44.99, category: 'risk-assessment', sector: 'Dental Practices', description: 'Cross-infection risks in dentistry' },
  { id: 'ra-dp-02', name: 'Sharps Injury Risk Assessment', price: 44.99, category: 'risk-assessment', sector: 'Dental Practices', description: 'Needlestick and sharps injuries' },
  { id: 'ra-dp-03', name: 'Radiation Safety Risk Assessment', price: 49.99, category: 'risk-assessment', sector: 'Dental Practices', description: 'X-ray and radiation exposure' },
  { id: 'ra-dp-04', name: 'Chemical Exposure Risk Assessment', price: 44.99, category: 'risk-assessment', sector: 'Dental Practices', description: 'Hazardous dental chemicals' },
  { id: 'ra-dp-05', name: 'Mercury Exposure Risk Assessment', price: 44.99, category: 'risk-assessment', sector: 'Dental Practices', description: 'Amalgam and mercury risks' },
  { id: 'ra-dp-06', name: 'Ergonomic Risk Assessment', price: 44.99, category: 'risk-assessment', sector: 'Dental Practices', description: 'Repetitive strain and posture injuries' },
  { id: 'ra-dp-07', name: 'Noise Exposure Risk Assessment', price: 39.99, category: 'risk-assessment', sector: 'Dental Practices', description: 'Dental equipment noise' },
  { id: 'ra-dp-08', name: 'Latex Allergy Risk Assessment', price: 39.99, category: 'risk-assessment', sector: 'Dental Practices', description: 'Latex exposure and sensitisation' },
  { id: 'ra-dp-09', name: 'Emergency Response Risk Assessment', price: 44.99, category: 'risk-assessment', sector: 'Dental Practices', description: 'Medical emergency preparedness' },
  { id: 'ra-dp-10', name: 'Fire Safety Risk Assessment', price: 39.99, category: 'risk-assessment', sector: 'Dental Practices', description: 'Clinic fire risks' },
  { id: 'ra-dp-11', name: 'Waste Management Risk Assessment', price: 39.99, category: 'risk-assessment', sector: 'Dental Practices', description: 'Hazardous waste disposal' },
  { id: 'ra-dp-12', name: 'Violence Risk Assessment', price: 44.99, category: 'risk-assessment', sector: 'Dental Practices', description: 'Patient and staff violence' },

  // Aesthetic Clinics - 10 assessments
  { id: 'ra-ac-01', name: 'Infection Control Risk Assessment', price: 44.99, category: 'risk-assessment', sector: 'Aesthetic Clinics', description: 'Sterile technique and infection risks' },
  { id: 'ra-ac-02', name: 'Product Safety Risk Assessment', price: 44.99, category: 'risk-assessment', sector: 'Aesthetic Clinics', description: 'Injectable and product safety' },
  { id: 'ra-ac-03', name: 'Practitioner Competency Risk Assessment', price: 44.99, category: 'risk-assessment', sector: 'Aesthetic Clinics', description: 'Skill and training assessment' },
  { id: 'ra-ac-04', name: 'Adverse Reaction Risk Assessment', price: 44.99, category: 'risk-assessment', sector: 'Aesthetic Clinics', description: 'Allergic and adverse reactions' },
  { id: 'ra-ac-05', name: 'Equipment Safety Risk Assessment', price: 39.99, category: 'risk-assessment', sector: 'Aesthetic Clinics', description: 'Laser and device safety' },
  { id: 'ra-ac-06', name: 'Fire Safety Risk Assessment', price: 39.99, category: 'risk-assessment', sector: 'Aesthetic Clinics', description: 'Clinic fire risks' },
  { id: 'ra-ac-07', name: 'Chemical Safety Risk Assessment', price: 44.99, category: 'risk-assessment', sector: 'Aesthetic Clinics', description: 'Hazardous chemical storage' },
  { id: 'ra-ac-08', name: 'Client Safeguarding Risk Assessment', price: 44.99, category: 'risk-assessment', sector: 'Aesthetic Clinics', description: 'Vulnerability and exploitation risks' },
  { id: 'ra-ac-09', name: 'Consent and Capacity Risk Assessment', price: 44.99, category: 'risk-assessment', sector: 'Aesthetic Clinics', description: 'Mental capacity and consent' },
  { id: 'ra-ac-10', name: 'Environmental Hazards Risk Assessment', price: 39.99, category: 'risk-assessment', sector: 'Aesthetic Clinics', description: 'Workplace environment risks' },

  // GP Practices - 8 assessments
  { id: 'ra-gp-01', name: 'Sharps Injury Risk Assessment', price: 44.99, category: 'risk-assessment', sector: 'GP Practices', description: 'Needlestick injury prevention' },
  { id: 'ra-gp-02', name: 'Infection Control Risk Assessment', price: 44.99, category: 'risk-assessment', sector: 'GP Practices', description: 'Disease transmission risks' },
  { id: 'ra-gp-03', name: 'Medication Error Risk Assessment', price: 44.99, category: 'risk-assessment', sector: 'GP Practices', description: 'Prescribing error prevention' },
  { id: 'ra-gp-04', name: 'Safeguarding Risk Assessment', price: 44.99, category: 'risk-assessment', sector: 'GP Practices', description: 'Child and adult abuse risks' },
  { id: 'ra-gp-05', name: 'Violence Risk Assessment', price: 44.99, category: 'risk-assessment', sector: 'GP Practices', description: 'Staff and patient safety' },
  { id: 'ra-gp-06', name: 'Emergency Response Risk Assessment', price: 44.99, category: 'risk-assessment', sector: 'GP Practices', description: 'Medical emergency preparedness' },
  { id: 'ra-gp-07', name: 'Fire Safety Risk Assessment', price: 39.99, category: 'risk-assessment', sector: 'GP Practices', description: 'Premises fire safety' },
  { id: 'ra-gp-08', name: 'Environmental Hazards Risk Assessment', price: 39.99, category: 'risk-assessment', sector: 'GP Practices', description: 'Workplace hazards' },

  // Private Clinics - 10 assessments
  { id: 'ra-pc-01', name: 'Infection Control Risk Assessment', price: 44.99, category: 'risk-assessment', sector: 'Private Clinics', description: 'Infection prevention and control' },
  { id: 'ra-pc-02', name: 'Equipment Safety Risk Assessment', price: 44.99, category: 'risk-assessment', sector: 'Private Clinics', description: 'Medical device and equipment safety' },
  { id: 'ra-pc-03', name: 'Sharps Injury Risk Assessment', price: 44.99, category: 'risk-assessment', sector: 'Private Clinics', description: 'Sharps safety procedures' },
  { id: 'ra-pc-04', name: 'Chemical Safety Risk Assessment', price: 44.99, category: 'risk-assessment', sector: 'Private Clinics', description: 'Chemical handling and storage' },
  { id: 'ra-pc-05', name: 'Medication Error Risk Assessment', price: 44.99, category: 'risk-assessment', sector: 'Private Clinics', description: 'Safe medication administration' },
  { id: 'ra-pc-06', name: 'Fire Safety Risk Assessment', price: 39.99, category: 'risk-assessment', sector: 'Private Clinics', description: 'Emergency evacuation procedures' },
  { id: 'ra-pc-07', name: 'Emergency Response Risk Assessment', price: 44.99, category: 'risk-assessment', sector: 'Private Clinics', description: 'Medical emergency preparedness' },
  { id: 'ra-pc-08', name: 'Safeguarding Risk Assessment', price: 44.99, category: 'risk-assessment', sector: 'Private Clinics', description: 'Child and vulnerable adult protection' },
  { id: 'ra-pc-09', name: 'Violence and Aggression Risk Assessment', price: 44.99, category: 'risk-assessment', sector: 'Private Clinics', description: 'Patient and staff safety' },
  { id: 'ra-pc-10', name: 'Environmental Hazards Risk Assessment', price: 39.99, category: 'risk-assessment', sector: 'Private Clinics', description: 'Workplace environment safety' },
];

export const BUNDLES: Product[] = [
  {
    id: 'b-ch-01',
    name: 'Care Home Starter',
    price: 199.99,
    category: 'bundle',
    sector: 'Care Homes',
    description: '5 essential policies + 3 key risk assessments for care homes. Total value: £370+. Save £170+.',
    savings: 'Save £170+'
  },
  {
    id: 'b-dp-01',
    name: 'Dental Pro',
    price: 299.99,
    category: 'bundle',
    sector: 'Dental Practices',
    description: '8 policies + 5 risk assessments for dental practices. Total value: £500+. Save £200+.',
    savings: 'Save £200+'
  },
  {
    id: 'b-ac-01',
    name: 'Aesthetic Complete',
    price: 349.99,
    category: 'bundle',
    sector: 'Aesthetic Clinics',
    description: '10 policies + 10 risk assessments for aesthetic clinics. Total value: £630+. Save £280+.',
    savings: 'Save £280+'
  },
  {
    id: 'b-all-01',
    name: 'Ultimate Package',
    price: 699.99,
    category: 'bundle',
    sector: 'All Sectors',
    description: 'ALL 70+ policies + ALL 60+ risk assessments across all 6 healthcare sectors. Total value: £1700+. Save £1000+.',
    savings: 'Save £1000+'
  },
];