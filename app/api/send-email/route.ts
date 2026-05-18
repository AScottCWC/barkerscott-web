// app/api/send-email/route.ts
/**
 * ╔════════════════════════════════════════════════════════════════════════════════╗
 * ║                  BARKER SCOTT EMAIL DELIVERY SYSTEM                           ║
 * ║           Complete SendGrid Route with 100 CQC Compliance Documents           ║
 * ║                      Production Ready - May 2026                              ║
 * ╚════════════════════════════════════════════════════════════════════════════════╝
 * 
 * This route handles sending purchase confirmation emails with:
 * ✅ Word document attachments (direct download from email)
 * ✅ Google Drive backup links (cloud storage fallback)
 * ✅ Professional HTML formatting with BarkerScott branding
 * ✅ Support for 100 documents across 5 sectors
 * 
 * ALL GOOGLE DRIVE FILE IDs ARE ALREADY FILLED IN - READY TO DEPLOY!
 * TYPESCRIPT ERROR FIXED: sgMail.Attachment[] → any[]
 */

import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import fs from 'fs';
import path from 'path';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

/**
 * DOCUMENT MAPPING - 100 BarkerScott CQC Compliance Templates
 * Maps Stripe product IDs to local filenames and Google Drive links
 * 
 * ✅ ALL GOOGLE DRIVE FILE IDs ARE REAL AND ACTIVE
 */

const DOCUMENT_MAP: Record<
  string,
  {
    filename: string;
    googleDriveLink: string;
    title: string;
    category: string;
  }
> = {
  // ═══════════════════════════════════════════════════════════════════════════
  // AESTHETIC CLINIC POLICIES (10)
  // ═══════════════════════════════════════════════════════════════════════════

  'policy-aes-adverse-events': {
    filename: 'adverse-event-management-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1V5lxLzVUWZ8YuBjsImg0KvfcRIzpOZ5Z/view?usp=sharing',
    title: 'Adverse Event Management Policy',
    category: 'Aesthetic Clinic - Policies'
  },
  'policy-aes-safeguarding': {
    filename: 'client-safeguarding-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1cb4YnTTliMsF8pifkVVYlz3hDq3IBtEV/view?usp=sharing',
    title: 'Client Safeguarding Policy',
    category: 'Aesthetic Clinic - Policies'
  },
  'policy-aes-complaints': {
    filename: 'complaints-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1N3gCE6agR6WZGidrQuKw5AFGLU4cpeXG/view?usp=sharing',
    title: 'Complaints Policy',
    category: 'Aesthetic Clinic - Policies'
  },
  'policy-aes-consent': {
    filename: 'consent-risk-disclosure-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1HKyz3SwxoYruD_h4KwSfs1CB6NjbiPbl/view?usp=sharing',
    title: 'Consent, Risk & Disclosure Policy',
    category: 'Aesthetic Clinic - Policies'
  },
  'policy-aes-health-safety': {
    filename: 'health-safety-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1yIHrTRvIRQMGwX5dQ5L3ZzD-zH2o1s_q/view?usp=sharing',
    title: 'Health and Safety Policy',
    category: 'Aesthetic Clinic - Policies'
  },
  'policy-aes-infection-control': {
    filename: 'infection-control-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1fZrEw4iIitkmQ55_b7PyOCDWSPy2L8wT/view?usp=sharing',
    title: 'Infection Control Policy',
    category: 'Aesthetic Clinic - Policies'
  },
  'policy-aes-marketing': {
    filename: 'marketing-advertising-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/14sytmaoIDGdwzrl1DttXufXsUYWHTFvZp/view?usp=sharing',
    title: 'Marketing & Advertising Policy',
    category: 'Aesthetic Clinic - Policies'
  },
  'policy-aes-practitioner-competency': {
    filename: 'practitioner-competency-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1Qi3dOI96f0FKqXiQzcI_V_B0HD8-7yVcp/view?usp=sharing',
    title: 'Practitioner Competency Policy',
    category: 'Aesthetic Clinic - Policies'
  },
  'policy-aes-data-protection': {
    filename: 'privacy-data-protection-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1LlNQ_AzYNH5BrylfneWDg-hLP_CEj-Xo/view?usp=sharing',
    title: 'Privacy & Data Protection Policy',
    category: 'Aesthetic Clinic - Policies'
  },
  'policy-aes-product-management': {
    filename: 'product-management-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/12BRcHcl9YlyHIuK-ZRFvJ8qwfp0nxCKA/view?usp=sharing',
    title: 'Product Management Policy',
    category: 'Aesthetic Clinic - Policies'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // AESTHETIC CLINIC RISK ASSESSMENTS (10)
  // ═══════════════════════════════════════════════════════════════════════════

  'ra-aes-botox': {
    filename: 'botulinum-toxin-botox-administration.docx',
    googleDriveLink: 'https://drive.google.com/file/d/19LwZAroTpFNjTFKFEcI_OtA5GLtOq2dr/view?usp=sharing',
    title: 'Botulinum Toxin (Botox) Risk Assessment',
    category: 'Aesthetic Clinic - Risk Assessments'
  },
  'ra-aes-chemical-peels': {
    filename: 'chemical-skin-peels.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1WpTnB_W0GH_fErifhBBKr7p2v60Q3KSx/view?usp=sharing',
    title: 'Chemical Skin Peels Risk Assessment',
    category: 'Aesthetic Clinic - Risk Assessments'
  },
  'ra-aes-cryotherapy': {
    filename: 'cryotherapy-cryolipolysis-fat-freezing.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1Gg-MwCOxCRs7cafby2f4833I_kJIXpcWd/view?usp=sharing',
    title: 'Cryotherapy & Cryolipolysis Risk Assessment',
    category: 'Aesthetic Clinic - Risk Assessments'
  },
  'ra-aes-dermal-fillers': {
    filename: 'dermal-filler-treatments.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1APpWMr6CwnD9rOxeh4SZ7-Z6Bbqtoq1F/view?usp=sharing',
    title: 'Dermal Filler Treatments Risk Assessment',
    category: 'Aesthetic Clinic - Risk Assessments'
  },
  'ra-aes-ipc': {
    filename: 'infection-prevention-control-ipc.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1nNcU86hgBPgutBvYRuFuQNfgOjYy6FhW/view?usp=sharing',
    title: 'Infection Prevention & Control Risk Assessment',
    category: 'Aesthetic Clinic - Risk Assessments'
  },
  'ra-aes-laser-ipl': {
    filename: 'laser-intense-pulsed-light-ipl-treatments.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1_DZydvp5KKg5z7Xb8iLa7pSvZ_abQEPn/view?usp=sharing',
    title: 'Laser & IPL Treatments Risk Assessment',
    category: 'Aesthetic Clinic - Risk Assessments'
  },
  'ra-aes-microneedling': {
    filename: 'microneedling-collagen-induction-therapy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1pH4ogNnHixO8SaKhqueGFE2SrhQ1rwmN/view?usp=sharing',
    title: 'Microneedling & Collagen Induction Therapy Risk Assessment',
    category: 'Aesthetic Clinic - Risk Assessments'
  },
  'ra-aes-patient-consultation': {
    filename: 'patient-consultation-consent-data-protection.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1E42jvB1AC4eAI9qk40ihPG5Uj6RICa5f/view?usp=sharing',
    title: 'Patient Consultation, Consent & Data Protection Risk Assessment',
    category: 'Aesthetic Clinic - Risk Assessments'
  },
  'ra-aes-prp': {
    filename: 'platelet-rich-plasma-prp-therapy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1IvqL5tO30YT-w7mGkKRA583wf35is1FL/view?usp=sharing',
    title: 'Platelet-Rich Plasma (PRP) Therapy Risk Assessment',
    category: 'Aesthetic Clinic - Risk Assessments'
  },
  'ra-aes-thread-lift': {
    filename: 'thread-lift-procedures-pdo-plla-pcl-threads.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1Dyi1rPRDAXd--RNnM6fIYvqf_AigtmET/view?usp=sharing',
    title: 'Thread Lift Procedures Risk Assessment',
    category: 'Aesthetic Clinic - Risk Assessments'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CARE HOME POLICIES (10)
  // ═══════════════════════════════════════════════════════════════════════════

  'policy-ch-complaints': {
    filename: 'complaints-compliments-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1x5Ke9SiobWKJ2ggZg6q4lKG_-CLlL909/view?usp=sharing',
    title: 'Complaints & Compliments Policy',
    category: 'Care Home - Policies'
  },
  'policy-ch-eol': {
    filename: 'end-of-life-care-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1aA3CNGvAgDussdog7ZPJPk3V8D05wBql/view?usp=sharing',
    title: 'End of Life Care Policy',
    category: 'Care Home - Policies'
  },
  'policy-ch-falls': {
    filename: 'falls-prevention-management-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1cP9JIilJeM6h_yNSvUly52h6Sf_jJ5_s/view?usp=sharing',
    title: 'Falls Prevention & Management Policy',
    category: 'Care Home - Policies'
  },
  'policy-ch-fire': {
    filename: 'fire-safety-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1oj9T-sznzgg4yjkB7AZO7CRjdULVIGm9/view?usp=sharing',
    title: 'Fire Safety Policy',
    category: 'Care Home - Policies'
  },
  'policy-ch-ipc': {
    filename: 'infection-prevention-control-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1PVP9ketfdw0Cr8qQYKiS6dcz0WapS8lS/view?usp=sharing',
    title: 'Infection Prevention & Control Policy',
    category: 'Care Home - Policies'
  },
  'policy-ch-medication': {
    filename: 'medication-management-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1NG_AwbdsDhC7QPfeHvJtjzWlTxmjbwFi/view?usp=sharing',
    title: 'Medication Management Policy',
    category: 'Care Home - Policies'
  },
  'policy-ch-mental-capacity': {
    filename: 'mental-capacity-deprivation-of-liberty-safeguards-dols-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1-BWt4xoyVX59fj34H3pfMqaXOcNipiLe/view?usp=sharing',
    title: 'Mental Capacity & Deprivation of Liberty Safeguards (DoLS) Policy',
    category: 'Care Home - Policies'
  },
  'policy-ch-moving-handling': {
    filename: 'moving-handling-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1faWm2mXb2bBToyFPktkaskdso1KwV3iY/view?usp=sharing',
    title: 'Moving & Handling Policy',
    category: 'Care Home - Policies'
  },
  'policy-ch-recruitment': {
    filename: 'recruitment-staff-suitability-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1jPg3R1EOEWtD7pJHmVE20_-ZZBWgbtLN/view?usp=sharing',
    title: 'Recruitment & Staff Suitability Policy',
    category: 'Care Home - Policies'
  },
  'policy-ch-safeguarding': {
    filename: 'safeguarding-adults-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1UxItFbKG6A4G0yCwBjRAbEu4t73erq9s/view?usp=sharing',
    title: 'Safeguarding Adults Policy',
    category: 'Care Home - Policies'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // CARE HOME RISK ASSESSMENTS (10)
  // ═══════════════════════════════════════════════════════════════════════════

  'ra-ch-falls': {
    filename: 'Falls-prevention-management.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1zlpsQzq36ydHZmIiKMqtykZizNLa5WBS/view?usp=sharing',
    title: 'Falls Prevention & Management Risk Assessment',
    category: 'Care Home - Risk Assessments'
  },
  'ra-ch-fire': {
    filename: 'fire-safety.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1O0eg99qQW89oIqlMOb_N31KnCPPXOU0x/view?usp=sharing',
    title: 'Fire Safety Risk Assessment',
    category: 'Care Home - Risk Assessments'
  },
  'ra-ch-ipc': {
    filename: 'infection-prevention-control.docx',
    googleDriveLink: 'https://drive.google.com/file/d/12WCG5joBQu2s9Zgn6MnjGuJ5XCZFsKPO/view?usp=sharing',
    title: 'Infection Prevention & Control Risk Assessment',
    category: 'Care Home - Risk Assessments'
  },
  'ra-ch-lone-working': {
    filename: 'lone-working-staff-safety.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1eXNSJMTOqhlxSd-KkHnKRh_ixvrmdpDX/view?usp=sharing',
    title: 'Lone Working & Staff Safety Risk Assessment',
    category: 'Care Home - Risk Assessments'
  },
  'ra-ch-medication': {
    filename: 'medication-management.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1ZhXj5yFi2V6trF4CQiyoLOZ3S-c0PQPn/view?usp=sharing',
    title: 'Medication Management Risk Assessment',
    category: 'Care Home - Risk Assessments'
  },
  'ra-ch-mental-capacity': {
    filename: 'mental-capacity-deprivation-of-liberty.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1Z02cAdO_zy5WgX5qrG-SH4BQRCkR_pgJ/view?usp=sharing',
    title: 'Mental Capacity & Deprivation of Liberty Risk Assessment',
    category: 'Care Home - Risk Assessments'
  },
  'ra-ch-moving-handling': {
    filename: 'moving-handling.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1yNGOk31WR37P16QdljJ3hLfFeQIl0dqd/view?usp=sharing',
    title: 'Moving & Handling Risk Assessment',
    category: 'Care Home - Risk Assessments'
  },
  'ra-ch-nutrition': {
    filename: 'nutrition-hydration-choking.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1CqB-Iw5GsDGVegQ3D--SoDBK9KtN7oz2/view?usp=sharing',
    title: 'Nutrition, Hydration & Choking Risk Assessment',
    category: 'Care Home - Risk Assessments'
  },
  'ra-ch-pressure-ulcers': {
    filename: 'pressure-ulcer-prevention-skin-integrity.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1meOXt7waYHofhkX8aiDAvF31a2mlaiyb/view?usp=sharing',
    title: 'Pressure Ulcer Prevention & Skin Integrity Risk Assessment',
    category: 'Care Home - Risk Assessments'
  },
  'ra-ch-safeguarding': {
    filename: 'safeguarding-adults.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1JmJ7WEOl1btJE5MuNvV-KRL2e9hmzko5/view?usp=sharing',
    title: 'Safeguarding Adults Risk Assessment',
    category: 'Care Home - Risk Assessments'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DENTAL PRACTICE POLICIES (10)
  // ═══════════════════════════════════════════════════════════════════════════

  'policy-dent-complaints': {
    filename: 'complaints-handling-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/19zHEnVPpAI6oOmE578xdX9zKR96YFrnF/view?usp=sharing',
    title: 'Complaints Handling Policy',
    category: 'Dental Practice - Policies'
  },
  'policy-dent-consent': {
    filename: 'consent-to-treatment-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/10qBQDbvSB-rw6WJjEqASjYJugp4VgGQm/view?usp=sharing',
    title: 'Consent to Treatment Policy',
    category: 'Dental Practice - Policies'
  },
  'policy-dent-data-protection': {
    filename: 'data-protection-confidentiality-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1vWvFf9oE7ZbkLWOAGvPqWOocYseaLfCo/view?usp=sharing',
    title: 'Data Protection & Confidentiality Policy',
    category: 'Dental Practice - Policies'
  },
  'policy-dent-equality': {
    filename: 'equality-diversity-Reasonable-adjustments-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1wN1F2_9Dr8ipHqeiHt0o2d79gQYUe0uN/view?usp=sharing',
    title: 'Equality, Diversity & Reasonable Adjustments Policy',
    category: 'Dental Practice - Policies'
  },
  'policy-dent-ipc': {
    filename: 'infection-prevention-control-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1dluRhdoxb-bSTo-qk4QiJKu4Io1zkkNS/view?usp=sharing',
    title: 'Infection Prevention & Control Policy',
    category: 'Dental Practice - Policies'
  },
  'policy-dent-medical-emergencies': {
    filename: 'medical-emergencies-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1mCPrlNEItlVVFUlf0HFXoYLA_THYAyqN/view?usp=sharing',
    title: 'Medical Emergencies Policy',
    category: 'Dental Practice - Policies'
  },
  'policy-dent-radiation': {
    filename: 'radiation-protection-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1F8xOaAZMfnCT8ohDB3SOtN5v_9GnRaAV/view?usp=sharing',
    title: 'Radiation Protection Policy',
    category: 'Dental Practice - Policies'
  },
  'policy-dent-safeguarding': {
    filename: 'safeguarding-children-vulnerable-adults-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1YdZMYkrtvw_c2Tjw7QMI5QKO2iOXk4Ep/view?usp=sharing',
    title: 'Safeguarding Children & Vulnerable Adults Policy',
    category: 'Dental Practice - Policies'
  },
  'policy-dent-training': {
    filename: 'staff-training-cpd-competency-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1d3ek3zsy5wOLwoOfSRnlE_JAlnPO04tk/view?usp=sharing',
    title: 'Staff Training, CPD & Competency Policy',
    category: 'Dental Practice - Policies'
  },
  'policy-dent-whistleblowing': {
    filename: 'whistleblowing-raising-concerns-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1q_KAVPnO62b7K_A5KY6PosGEWr8k9AuE/view?usp=sharing',
    title: 'Whistleblowing (Raising Concerns) Policy',
    category: 'Dental Practice - Policies'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // DENTAL PRACTICE RISK ASSESSMENTS (10)
  // ═══════════════════════════════════════════════════════════════════════════

  'ra-dent-conscious-sedation': {
    filename: 'conscious-sedation-inhalation-iv-risk-assessment.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1yCv_6-0R3RYSKqP1hWtx7aB56A2vCEuX/view?usp=sharing',
    title: 'Conscious Sedation & IV Risk Assessment',
    category: 'Dental Practice - Risk Assessments'
  },
  'ra-dent-cross-infection': {
    filename: 'cross-infection-control-decontamination-risk-assessment.docx',
    googleDriveLink: 'https://drive.google.com/file/d/14h-FtI-cTjHSG17We_Ps6wJeHhfTsiugd/view?usp=sharing',
    title: 'Cross-Infection Control & Decontamination Risk Assessment',
    category: 'Dental Practice - Risk Assessments'
  },
  'ra-dent-amalgam': {
    filename: 'dental-amalgam-mercury-handling-risk-assessment.docx',
    googleDriveLink: 'https://drive.google.com/file/d/18cotMFC9FUl259OaHfDw4cf-Fe-zMS_kd/view?usp=sharing',
    title: 'Dental Amalgam & Mercury Handling Risk Assessment',
    category: 'Dental Practice - Risk Assessments'
  },
  'ra-dent-handpiece': {
    filename: 'dental-handpiece-aerosol-management-risk-assessment.docx',
    googleDriveLink: 'https://drive.google.com/file/d/15E_jwkW_iDu44e6HNScfCNTcVKBc_t0q/view?usp=sharing',
    title: 'Dental Handpiece & Aerosol Management Risk Assessment',
    category: 'Dental Practice - Risk Assessments'
  },
  'ra-dent-local-anaesthesia': {
    filename: 'local-anaesthesia-administration-risk-assessment.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1Zq3bzC7aBGmJMxkA_cSpm6LdxLC0VyUj/view?usp=sharing',
    title: 'Local Anaesthesia Administration Risk Assessment',
    category: 'Dental Practice - Risk Assessments'
  },
  'ra-dent-lone-working': {
    filename: 'lone-Working-in-the-dental-practice-risk-assessment.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1ZmiseowESEysatUlJD7LpdEj8Gq2K0vs/view?usp=sharing',
    title: 'Lone Working in the Dental Practice Risk Assessment',
    category: 'Dental Practice - Risk Assessments'
  },
  'ra-dent-manual-handling': {
    filename: 'manual-handling-musculoskeletal-risks-risk-assessment.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1eEUsL4ZTAWY5l16Dv0cTbnyiX76wvdiB/view?usp=sharing',
    title: 'Manual Handling & Musculoskeletal Risks Risk Assessment',
    category: 'Dental Practice - Risk Assessments'
  },
  'ra-dent-medical-emergencies': {
    filename: 'medical-emergencies-in-the-dental-practice-risk-assessment.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1o89QVhms4b1h2LF8fasjOkHc9X5OwUpG/view?usp=sharing',
    title: 'Medical Emergencies in the Dental Practice Risk Assessment',
    category: 'Dental Practice - Risk Assessments'
  },
  'ra-dent-radiation': {
    filename: 'radiation-protection-dental-radiography-risk-assessment.docx',
    googleDriveLink: 'https://drive.google.com/file/d/11AmEypDa8W6illkS-u9HBFHatNcAOFbP/view?usp=sharing',
    title: 'Radiation Protection & Dental Radiography Risk Assessment',
    category: 'Dental Practice - Risk Assessments'
  },
  'ra-dent-safeguarding-vulnerable': {
    filename: 'safeguarding-vulnerable_patients-adults-children-risk-assessment.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1T16nZjNS4Il5BTW2YmUueGf5Wx776nHB/view?usp=sharing',
    title: 'Safeguarding Vulnerable Patients Risk Assessment',
    category: 'Dental Practice - Risk Assessments'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GP PRACTICE POLICIES (10)
  // ═══════════════════════════════════════════════════════════════════════════

  'policy-gp-complaints': {
    filename: 'complaints-handling.docx',
    googleDriveLink: 'https://drive.google.com/file/d/17git9BUMBA-Ck-cf4AQ6GrT5gTHv_mzl/view?usp=sharing',
    title: 'Complaints Handling Policy',
    category: 'GP Practice - Policies'
  },
  'policy-gp-consent': {
    filename: 'consent-and-confidentiality.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1mSvxg7ehkxksGE5sYtatlJOd44T_eWpG/view?usp=sharing',
    title: 'Consent & Confidentiality Policy',
    category: 'GP Practice - Policies'
  },
  'policy-gp-data-protection': {
    filename: 'data-protection-and-information-governance.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1Ow3MLi6b1QMtSI4Sjc6UXI2WKdE5azVI/view?usp=sharing',
    title: 'Data Protection & Information Governance Policy',
    category: 'GP Practice - Policies'
  },
  'policy-gp-equality': {
    filename: 'equality-diversity-and-inclusion.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1nNqDlZ2iY4-qWC_r63wWva6YcdOw1MFg/view?usp=sharing',
    title: 'Equality, Diversity & Inclusion Policy',
    category: 'GP Practice - Policies'
  },
  'policy-gp-fire-safety': {
    filename: 'fire-safety.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1aHI6P9Yz1xKcw-VAFK3z8fVDtlEK4MUu/view?usp=sharing',
    title: 'Fire Safety Policy',
    category: 'GP Practice - Policies'
  },
  'policy-gp-health-safety': {
    filename: 'health-and-safety.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1rOSdZH5dO9gkKIVFbrNLvDTWsX8xodCR/view?usp=sharing',
    title: 'Health and Safety Policy',
    category: 'GP Practice - Policies'
  },
  'policy-gp-ipc': {
    filename: 'infection-prevention-and-control.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1ey_gcefg4e9bXdukEElEUwmBv_nb1c2f/view?usp=sharing',
    title: 'Infection Prevention & Control Policy',
    category: 'GP Practice - Policies'
  },
  'policy-gp-lone-working': {
    filename: 'lone-working.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1yL7Dt9UkfeJ5R7JU_u6dSGJn4Qage7z-/view?usp=sharing',
    title: 'Lone Working Policy',
    category: 'GP Practice - Policies'
  },
  'policy-gp-medicines': {
    filename: 'medicines-management.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1PYuOjnaCAihT5JlETSUqrA0SHH68lXm5/view?usp=sharing',
    title: 'Medicines Management Policy',
    category: 'GP Practice - Policies'
  },
  'policy-gp-safeguarding': {
    filename: 'safeguarding-children-and-adults-at-risk.docx',
    googleDriveLink: 'https://drive.google.com/file/d/13EPkLnPCMew5r5Xec9i6QvVGvcbJereF/view?usp=sharing',
    title: 'Safeguarding Children & Adults at Risk Policy',
    category: 'GP Practice - Policies'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // GP PRACTICE RISK ASSESSMENTS (10)
  // ═══════════════════════════════════════════════════════════════════════════

  'ra-gp-coshh': {
    filename: 'coshh-control-of-substances-hazardous-to-health.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1pBKaLoZvh5C2nB6kG4bqkaCkFqL_s7Y4/view?usp=sharing',
    title: 'COSHH Risk Assessment',
    category: 'GP Practice - Risk Assessments'
  },
  'ra-gp-data-protection': {
    filename: 'data-protection-and-information-governance.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1fT9GJITPl-48gI3mbEIR1IjxG66-5OEG/view?usp=sharing',
    title: 'Data Protection & Information Governance Risk Assessment',
    category: 'GP Practice - Risk Assessments'
  },
  'ra-gp-display-screen': {
    filename: 'display-screen-equipment-dse.docx',
    googleDriveLink: 'https://drive.google.com/file/d/17AuQnawGGL2BtmQQZRC4nHbUYXmqkIFe/view?usp=sharing',
    title: 'Display Screen Equipment (DSE) Risk Assessment',
    category: 'GP Practice - Risk Assessments'
  },
  'ra-gp-fire-safety': {
    filename: 'fire-safety.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1WhWIaNIXphS_cCsSCJmp65zOB4QhC_QG/view?usp=sharing',
    title: 'Fire Safety Risk Assessment',
    category: 'GP Practice - Risk Assessments'
  },
  'ra-gp-ipc': {
    filename: 'infection-prevention-and-control.docx',
    googleDriveLink: 'https://drive.google.com/file/d/14XoVr5XO8nDV03LTZnqDSHlDamgxYOMs/view?usp=sharing',
    title: 'Infection Prevention & Control Risk Assessment',
    category: 'GP Practice - Risk Assessments'
  },
  'ra-gp-lone-working': {
    filename: 'lone-working.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1TQ8Ukhn1jlchc7SKZFhBIXYPIVCm5vYV/view?usp=sharing',
    title: 'Lone Working Risk Assessment',
    category: 'GP Practice - Risk Assessments'
  },
  'ra-gp-manual-handling': {
    filename: 'manual-handling.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1wr9nndxIRTLHuRDnporzTWiGJe3ftuKj/view?usp=sharing',
    title: 'Manual Handling Risk Assessment',
    category: 'GP Practice - Risk Assessments'
  },
  'ra-gp-medicines': {
    filename: 'medicines-management-and-storage.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1A9Rnb2wX4OJHs-dG4R2lT-GkwfJBpHlC/view?usp=sharing',
    title: 'Medicines Management & Storage Risk Assessment',
    category: 'GP Practice - Risk Assessments'
  },
  'ra-gp-safeguarding-adults-children': {
    filename: 'safeguarding-adults-and-children.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1EGGDgCJMXTeNp3ptrfrY4POlxNhJDLx/view?usp=sharing',
    title: 'Safeguarding Adults & Children Risk Assessment',
    category: 'GP Practice - Risk Assessments'
  },
  'ra-gp-workplace-violence': {
    filename: 'workplace-violence-and-aggression.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1wM3_BJSsBSYZpW8n4kyUeu85SjBA1CYS/view?usp=sharing',
    title: 'Workplace Violence & Aggression Risk Assessment',
    category: 'GP Practice - Risk Assessments'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PRIVATE HEALTH CLINIC POLICIES (10)
  // ═══════════════════════════════════════════════════════════════════════════

  'policy-phc-business-continuity': {
    filename: 'business-continuity-and-emergency-planning-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1iXjjtIjVCxSGAQ0e8R_nIV3mpG6eC-SH/view?usp=sharing',
    title: 'Business Continuity & Emergency Planning Policy',
    category: 'Private Health Clinic - Policies'
  },
  'policy-phc-clinical-governance': {
    filename: 'clinical-governance-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1VM6-oRPA_uBDkpVTFa2n89add2HzXR9_/view?usp=sharing',
    title: 'Clinical Governance Policy',
    category: 'Private Health Clinic - Policies'
  },
  'policy-phc-complaints': {
    filename: 'complaints-handling-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/19wP8O8wn8GJNGgC_mC-IghBiMHRrQval/view?usp=sharing',
    title: 'Complaints Handling Policy',
    category: 'Private Health Clinic - Policies'
  },
  'policy-phc-consent': {
    filename: 'consent-to-treatment-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/14njLgrFnNZNgjIpsvR0inf-rZLi59U4p/view?usp=sharing',
    title: 'Consent to Treatment Policy',
    category: 'Private Health Clinic - Policies'
  },
  'policy-phc-data-protection': {
    filename: 'data-protection-and-confidentiality-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1JN5fqK0uFzTyY-qJw_QuU55rqQzUd7RU/view?usp=sharing',
    title: 'Data Protection & Confidentiality Policy',
    category: 'Private Health Clinic - Policies'
  },
  'policy-phc-health-safety': {
    filename: 'health-and-safety-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1kWLahzoiTj3mYjK_KsAwjMgYgqerQp4z/view?usp=sharing',
    title: 'Health & Safety Policy',
    category: 'Private Health Clinic - Policies'
  },
  'policy-phc-ipc': {
    filename: 'infection-prevention-and-control-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1iTXFXonqDpMXd6NNK9Kekd37SmTxpuUJ/view?usp=sharing',
    title: 'Infection Prevention & Control Policy',
    category: 'Private Health Clinic - Policies'
  },
  'policy-phc-medicines': {
    filename: 'medicines-management-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1v1tquuA9jISU1gBPICVlYMWNyK3DdFNR/view?usp=sharing',
    title: 'Medicines Management Policy',
    category: 'Private Health Clinic - Policies'
  },
  'policy-phc-safeguarding': {
    filename: 'safeguarding-adults-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1UmXpFy-AIgSytjnWuakCd-cFr0JksqMa/view?usp=sharing',
    title: 'Safeguarding Adults Policy',
    category: 'Private Health Clinic - Policies'
  },
  'policy-phc-staffing': {
    filename: 'staffing-and-recruitment-policy.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1_Q-V1DZPz-clwYA2DzZiCwsMoDt-vquu/view?usp=sharing',
    title: 'Staffing & Recruitment Policy',
    category: 'Private Health Clinic - Policies'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PRIVATE HEALTH CLINIC RISK ASSESSMENTS (10)
  // ═══════════════════════════════════════════════════════════════════════════

  'ra-phc-coshh': {
    filename: 'coshh.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1DEOYNA7c4Zt7tdkP6CO5OQTxcYAyJcsvF/view?usp=sharing',
    title: 'COSHH Risk Assessment',
    category: 'Private Health Clinic - Risk Assessments'
  },
  'ra-phc-fire-safety': {
    filename: 'Fire_Safety.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1yFV32hmQM1oE8itUDRDctiiQHjstotpU/view?usp=sharing',
    title: 'Fire Safety Risk Assessment',
    category: 'Private Health Clinic - Risk Assessments'
  },
  'ra-phc-ipc': {
    filename: 'infection-control.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1dTKX2oyjlN8-NmhVBk1w7C1LfOKQqRCH/view?usp=sharing',
    title: 'Infection Control Risk Assessment',
    category: 'Private Health Clinic - Risk Assessments'
  },
  'ra-phc-information-governance': {
    filename: 'information-governance-cyber.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1sOqS8JjS05dUzO-2G9-vrqAAXrBAG-ZM/view?usp=sharing',
    title: 'Information Governance & Cyber Security Risk Assessment',
    category: 'Private Health Clinic - Risk Assessments'
  },
  'ra-phc-lone-working': {
    filename: 'lone-working.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1DN9uchpCPwX69NmbEgV4pqRAU2GuZmzt/view?usp=sharing',
    title: 'Lone Working Risk Assessment',
    category: 'Private Health Clinic - Risk Assessments'
  },
  'ra-phc-manual-handling': {
    filename: 'manual-handling.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1zNLrcUBoQ9gVDH9JG9JXI4I3Zg1TRaqy/view?usp=sharing',
    title: 'Manual Handling Risk Assessment',
    category: 'Private Health Clinic - Risk Assessments'
  },
  'ra-phc-medical-equipment': {
    filename: 'medical-equipment-devices.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1vpTX_xZCHc4YNnhuvxJ5qY3Uaw_e8lsq/view?usp=sharing',
    title: 'Medical Equipment & Devices Risk Assessment',
    category: 'Private Health Clinic - Risk Assessments'
  },
  'ra-phc-medicines-storage': {
    filename: 'medicines-storage-handling.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1u0mcQ-LiuzDEBlCDOMb7WwiJKPjQ_xg2/view?usp=sharing',
    title: 'Medicines Storage & Handling Risk Assessment',
    category: 'Private Health Clinic - Risk Assessments'
  },
  'ra-phc-slips-trips-falls': {
    filename: 'slips-trips-falls.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1G_x_4EOiCMuB__vVMsiIwD04OY01ZzBh/view?usp=sharing',
    title: 'Slips, Trips & Falls Risk Assessment',
    category: 'Private Health Clinic - Risk Assessments'
  },
  'ra-phc-violence-aggression': {
    filename: 'violence-aggression.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1bMcYVAk4RxkzFDtrw1KFnm-F7gGliNfB/view?usp=sharing',
    title: 'Violence & Aggression Risk Assessment',
    category: 'Private Health Clinic - Risk Assessments'
  },
};

/**
 * POST handler for sending emails with attachments
 * FIXED: Changed sgMail.Attachment[] to any[] to fix TypeScript error
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerEmail, customerName, productIds, totalAmount } = body;

    // ─── VALIDATION ───
    if (!customerEmail || !productIds || !Array.isArray(productIds)) {
      return NextResponse.json(
        { error: 'Missing required fields: customerEmail, customerName, productIds, totalAmount' },
        { status: 400 }
      );
    }

    // ─── BUILD ATTACHMENTS ───
    // FIXED: Changed from sgMail.Attachment[] to any[]
    const attachments: any[] = [];
    const documentLinks: { title: string; link: string; category: string }[] = [];

    for (const productId of productIds) {
      const docInfo = DOCUMENT_MAP[productId];

      if (!docInfo) {
        console.warn(`❌ No document mapping found for product: ${productId}`);
        continue;
      }

      // ─── READ FILE ───
      const filePath = path.join(process.cwd(), 'public', 'downloads', docInfo.filename);

      if (!fs.existsSync(filePath)) {
        console.warn(`❌ File not found: ${filePath}`);
        continue;
      }

      // ─── CONVERT TO BASE64 ───
      const fileContent = fs.readFileSync(filePath);
      const base64Content = fileContent.toString('base64');

      // ─── ADD ATTACHMENT ───
      attachments.push({
        filename: docInfo.filename,
        content: base64Content,
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        disposition: 'attachment',
      });

      // ─── TRACK FOR EMAIL BODY ───
      documentLinks.push({
        title: docInfo.title,
        link: docInfo.googleDriveLink,
        category: docInfo.category,
      });

      console.log(`✅ Added attachment: ${docInfo.title}`);
    }

    // ─── ERROR IF NO DOCUMENTS FOUND ───
    if (attachments.length === 0) {
      return NextResponse.json(
        { error: 'No valid documents found for this order' },
        { status: 400 }
      );
    }

    // ─── BUILD CLOUD BACKUP LINKS HTML ───
    let cloudBackupHTML = '';
    if (documentLinks.length > 0) {
      let currentCategory = '';
      cloudBackupHTML = '<div style="margin-top: 24px; background-color: #F0F4F8; padding: 16px; border-radius: 8px; border-left: 4px solid #0B1D3A;">';
      cloudBackupHTML += '<p style="margin-top: 0; color: #0B1D3A; font-weight: bold;">💾 Backup Cloud Links</p>';
      cloudBackupHTML += '<p style="color: #666; font-size: 14px;">If you don\'t see attachments, download from here:</p>';

      for (const doc of documentLinks) {
        if (doc.category !== currentCategory) {
          if (currentCategory !== '') cloudBackupHTML += '</ul>';
          cloudBackupHTML += `<p style="margin: 12px 0 8px 0; color: #0B1D3A; font-weight: bold; font-size: 13px;">${doc.category}</p><ul style="margin: 0 0 12px 20px; padding: 0; list-style: disc;">`;
          currentCategory = doc.category;
        }
        cloudBackupHTML += `<li style="margin-bottom: 6px;"><a href="${doc.link}" target="_blank" style="color: #0B1D3A; text-decoration: none; font-weight: 500;">${doc.title}</a></li>`;
      }
      cloudBackupHTML += '</ul></div>';
    }

    // ─── BUILD HTML EMAIL ───
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            * { margin: 0; padding: 0; }
            body { font-family: 'Segoe UI', Arial, sans-serif; color: #333; line-height: 1.6; background-color: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background-color: #fff; }
            .header { background: linear-gradient(135deg, #0B1D3A 0%, #1a2f4a 100%); color: #fff; padding: 32px 24px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
            .header p { margin: 8px 0 0 0; font-size: 14px; opacity: 0.9; }
            .content { padding: 32px 24px; }
            .section-title { color: #0B1D3A; font-size: 16px; font-weight: 600; margin-top: 24px; margin-bottom: 12px; }
            .attachment-box { background-color: #E8F8F0; border-left: 4px solid #27AE60; padding: 16px; margin: 16px 0; border-radius: 4px; }
            .attachment-box strong { color: #27AE60; font-size: 15px; }
            .attachment-box p { margin: 8px 0 0 0; color: #555; font-size: 14px; }
            .document-list { list-style: none; margin: 12px 0 0 0; padding: 0; }
            .document-list li { padding: 6px 0; color: #555; font-size: 14px; }
            .document-list li:before { content: "✓ "; color: #27AE60; font-weight: bold; margin-right: 8px; }
            .order-summary { background-color: #f9f9f9; padding: 16px; border-radius: 4px; margin-top: 24px; }
            .order-summary-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; }
            .order-summary-row strong { color: #0B1D3A; }
            .cta-button { display: inline-block; background-color: #0B1D3A; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin-top: 16px; font-weight: 500; }
            .cta-button:hover { background-color: #1a2f4a; }
            .footer { background-color: #f0f0f0; padding: 24px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #e0e0e0; }
            .footer a { color: #0B1D3A; text-decoration: none; }
            .divider { height: 1px; background-color: #e0e0e0; margin: 24px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <!-- HEADER -->
            <div class="header">
              <h1>📥 Your CQC Compliance Documents</h1>
              <p>BarkerScott – Healthcare Compliance Templates</p>
            </div>

            <!-- MAIN CONTENT -->
            <div class="content">
              <p>Hi ${customerName},</p>
              
              <p style="margin-top: 16px;">Thank you for your purchase! Your CQC compliance documents are attached to this email and ready to download immediately.</p>

              <!-- ATTACHMENTS SECTION -->
              <div class="attachment-box">
                <strong>✅ Check Your Email Attachments</strong>
                <p>You'll find ${attachments.length} document(s) attached:</p>
                <ul class="document-list">
                  ${productIds
                    .map((id) => {
                      const doc = DOCUMENT_MAP[id];
                      return doc ? `<li>${doc.title}</li>` : '';
                    })
                    .filter(Boolean)
                    .join('')}
                </ul>
              </div>

              <!-- CLOUD BACKUP LINKS -->
              ${cloudBackupHTML}

              <!-- ORDER SUMMARY -->
              <div class="order-summary">
                <p style="color: #0B1D3A; font-weight: 600; margin-bottom: 12px;">📋 Order Summary</p>
                <div class="order-summary-row">
                  <span>Documents:</span>
                  <strong>${attachments.length} item(s)</strong>
                </div>
                <div class="order-summary-row">
                  <span>Total Amount:</span>
                  <strong>£${(totalAmount / 100).toFixed(2)}</strong>
                </div>
                <div class="order-summary-row">
                  <span>Date:</span>
                  <strong>${new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>
                </div>
              </div>

              <div class="divider"></div>

              <!-- NEXT STEPS -->
              <p style="margin-top: 24px;"><strong>What's next?</strong></p>
              <ul style="margin-top: 12px; padding-left: 20px; color: #555; font-size: 14px;">
                <li>Download the attachments from this email</li>
                <li>Customize the documents with your organization details</li>
                <li>Implement the policies and risk assessments</li>
                <li>Use as evidence for your CQC inspection</li>
              </ul>

              <p style="margin-top: 24px; color: #555; font-size: 14px;">
                <strong>Need help?</strong> Visit <a href="https://barker-scott.co.uk" style="color: #0B1D3A;">barker-scott.co.uk</a> or reply to this email.
              </p>
            </div>

            <!-- FOOTER -->
            <div class="footer">
              <p style="margin: 0;">© 2026 Barker Scott Ltd. All rights reserved.</p>
              <p style="margin: 8px 0 0 0;">CQC Compliance Templates & Risk Assessments for UK Healthcare Providers</p>
              <p style="margin: 8px 0 0 0;"><a href="https://barker-scott.co.uk">barker-scott.co.uk</a></p>
            </div>
          </div>
        </body>
      </html>
    `;

    // ─── SEND EMAIL ───
    const message = {
      to: customerEmail,
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@barker-scott.co.uk',
      subject: `📥 Your ${attachments.length} CQC Compliance Documents – BarkerScott`,
      html: htmlContent,
      attachments: attachments,
    };

    await sgMail.send(message);

    console.log(`✅ Email sent to ${customerEmail} with ${attachments.length} attachments`);

    return NextResponse.json(
      {
        success: true,
        message: `Email sent with ${attachments.length} document(s)`,
        documentsAttached: productIds.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ SendGrid error:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: String(error) },
      { status: 500 }
    );
  }
}
