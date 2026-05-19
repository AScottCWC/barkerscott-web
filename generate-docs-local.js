const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, BorderStyle, WidthType, ShadingType, VerticalAlign, AlignmentType, PageOrientation, PageBreak } = require('docx');
const fs = require('fs');
const path = require('path');

const NAVY = '#0B1D3A';
const GOLD = '#D4AF37';
const LOGO_TEXT = 'BarkerScott';
const SUBTITLE = 'CQC Compliance Solutions';

const createHeader = (docTitle) => {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                text: LOGO_TEXT,
                run: new TextRun({ bold: true, size: 32, color: NAVY.replace('#', '') })
              }),
              new Paragraph({
                text: SUBTITLE,
                run: new TextRun({ size: 16, color: GOLD.replace('#', ''), italic: true })
              })
            ],
            shading: { type: ShadingType.CLEAR, color: 'FFFFFF' }
          }),
          new TableCell({
            width: { size: 50, type: WidthType.PERCENTAGE },
            children: [
              new Paragraph({
                text: docTitle,
                alignment: AlignmentType.RIGHT,
                run: new TextRun({ bold: true, size: 24, color: NAVY.replace('#', '') })
              })
            ],
            shading: { type: ShadingType.CLEAR, color: 'FFFFFF' }
          })
        ]
      })
    ],
    borders: { bottom: { style: BorderStyle.SINGLE, size: 12, color: GOLD.replace('#', '') } }
  });
};

const createRiskTable = () => {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            children: [new Paragraph('Likelihood')],
            shading: { type: ShadingType.CLEAR, color: GOLD.replace('#', '') }
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            children: [new Paragraph('Severity')],
            shading: { type: ShadingType.CLEAR, color: GOLD.replace('#', '') }
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            children: [new Paragraph('Risk Rating')],
            shading: { type: ShadingType.CLEAR, color: GOLD.replace('#', '') }
          }),
          new TableCell({
            width: { size: 25, type: WidthType.PERCENTAGE },
            children: [new Paragraph('Mitigation')],
            shading: { type: ShadingType.CLEAR, color: GOLD.replace('#', '') }
          })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph('Low')] }),
          new TableCell({ children: [new Paragraph('Low')] }),
          new TableCell({ children: [new Paragraph('GREEN')], shading: { type: ShadingType.CLEAR, color: '90EE90' } }),
          new TableCell({ children: [new Paragraph('Monitor & review annually')] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph('Medium')] }),
          new TableCell({ children: [new Paragraph('Medium')] }),
          new TableCell({ children: [new Paragraph('AMBER')], shading: { type: ShadingType.CLEAR, color: 'FFD700' } }),
          new TableCell({ children: [new Paragraph('Active mitigation required')] })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({ children: [new Paragraph('High')] }),
          new TableCell({ children: [new Paragraph('High')] }),
          new TableCell({ children: [new Paragraph('RED')], shading: { type: ShadingType.CLEAR, color: 'FF6B6B' } }),
          new TableCell({ children: [new Paragraph('Immediate action required')] })
        ]
      })
    ]
  });
};

const createPolicy = (policyName, keyPoints, legalReferences) => [
  createHeader(`Policy: ${policyName}`),
  new Paragraph(''),
  new Paragraph({ text: 'POLICY DOCUMENT', bold: true, alignment: AlignmentType.CENTER, run: new TextRun({ color: NAVY.replace('#', '') }) }),
  new Paragraph(''),
  new Paragraph({ text: '1. PURPOSE', bold: true, run: new TextRun({ color: NAVY.replace('#', ''), size: 22 }) }),
  new Paragraph(`This policy ensures ${policyName.toLowerCase()} compliance with CQC Fundamental Standards and UK healthcare legislation.`),
  new Paragraph(''),
  new Paragraph({ text: '2. SCOPE', bold: true, run: new TextRun({ color: NAVY.replace('#', ''), size: 22 }) }),
  new Paragraph('This policy applies to all staff, contractors, and third-party providers.'),
  new Paragraph(''),
  new Paragraph({ text: '3. KEY REQUIREMENTS', bold: true, run: new TextRun({ color: NAVY.replace('#', ''), size: 22 }) }),
  ...keyPoints.map(point => new Paragraph(`• ${point}`)),
  new Paragraph(''),
  new Paragraph({ text: '4. LEGAL BASIS', bold: true, run: new TextRun({ color: NAVY.replace('#', ''), size: 22 }) }),
  ...legalReferences.map(ref => new Paragraph(`• ${ref}`)),
  new Paragraph(''),
  new Paragraph({ text: '5. IMPLEMENTATION & REVIEW', bold: true, run: new TextRun({ color: NAVY.replace('#', ''), size: 22 }) }),
  new Paragraph('Policy Owner: [Insert Name]'),
  new Paragraph('Review Cycle: Annually'),
  new Paragraph('Last Updated: May 2026'),
  new Paragraph(''),
  new Paragraph({ text: 'SIGN-OFF', bold: true, alignment: AlignmentType.CENTER, run: new TextRun({ color: GOLD.replace('#', ''), size: 20 }) }),
  new Paragraph('Registered Manager: _________________________ Date: _______'),
  new Paragraph(''),
  new Paragraph({ text: '© 2026 BarkerScott CQC Compliance Solutions. All rights reserved.', alignment: AlignmentType.CENTER, run: new TextRun({ size: 18, italic: true, color: NAVY.replace('#', '') }) })
];

const createRA = (raTitle, hazards) => [
  createHeader(`Risk Assessment: ${raTitle}`),
  new Paragraph(''),
  new Paragraph({ text: 'RISK ASSESSMENT', bold: true, alignment: AlignmentType.CENTER, run: new TextRun({ color: NAVY.replace('#', '') }) }),
  new Paragraph(''),
  new Paragraph({ text: 'RISK RATING SCALE', bold: true, run: new TextRun({ color: NAVY.replace('#', ''), size: 22 }) }),
  createRiskTable(),
  new Paragraph(''),
  new Paragraph({ text: 'IDENTIFIED HAZARDS & CONTROL MEASURES', bold: true, run: new TextRun({ color: NAVY.replace('#', ''), size: 22 }) }),
  new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({ width: { size: 20, type: WidthType.PERCENTAGE }, children: [new Paragraph('Hazard')], shading: { type: ShadingType.CLEAR, color: GOLD.replace('#', '') } }),
          new TableCell({ width: { size: 20, type: WidthType.PERCENTAGE }, children: [new Paragraph('Who May Be Harmed')], shading: { type: ShadingType.CLEAR, color: GOLD.replace('#', '') } }),
          new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, children: [new Paragraph('Risk Rating')], shading: { type: ShadingType.CLEAR, color: GOLD.replace('#', '') } }),
          new TableCell({ width: { size: 30, type: WidthType.PERCENTAGE }, children: [new Paragraph('Control Measures')], shading: { type: ShadingType.CLEAR, color: GOLD.replace('#', '') } }),
          new TableCell({ width: { size: 15, type: WidthType.PERCENTAGE }, children: [new Paragraph('Residual Risk')], shading: { type: ShadingType.CLEAR, color: GOLD.replace('#', '') } })
        ]
      }),
      ...hazards.map(h => new TableRow({
        children: [
          new TableCell({ children: [new Paragraph(h.name)] }),
          new TableCell({ children: [new Paragraph(h.affected)] }),
          new TableCell({ children: [new Paragraph(h.rating)], shading: h.color ? { type: ShadingType.CLEAR, color: h.color } : {} }),
          new TableCell({ children: [new Paragraph(h.control)] }),
          new TableCell({ children: [new Paragraph(h.residual)] })
        ]
      }))
    ]
  }),
  new Paragraph(''),
  new Paragraph({ text: 'SIGN-OFF', bold: true, alignment: AlignmentType.CENTER, run: new TextRun({ color: GOLD.replace('#', ''), size: 20 }) }),
  new Paragraph('Assessment Conducted By: [Insert Name]'),
  new Paragraph('Date: May 2026'),
  new Paragraph('Next Review: May 2027')
];

// ADHD Documents
const docs = {
  'ADHD_Medication_Management_Policy.docx': {
    type: 'policy',
    data: {
      title: 'Medication Management Policy',
      keyPoints: [
        'All ADHD medications prescribed by registered medical practitioners only',
        'Physical health monitoring: baseline blood pressure, heart rate, height, weight prior to prescribing',
        'Annual physical health assessments for all patients on stimulant medication',
        'Documented informed consent including side effects, contraindications',
        'Secure storage in locked cabinet with temperature monitoring logs',
        'Licensed medicines counter staff verify patient identity before dispensing',
        'Emergency protocols for adverse reactions (anaphylaxis, cardiac events)',
        'Staff training: annual mandatory updates on ADHD medications and prescribing guidelines (NICE NG87, 2018)'
      ],
      legalReferences: [
        'Health and Social Care Act 2008 (Regulated Activities) Regulations 2014, Regulation 12',
        'Medicines Act 1968 & Misuse of Drugs Act 1971',
        'CQC Fundamental Standard: Safe Care and Treatment',
        'NICE NG87: Attention deficit hyperactivity disorder (ADHD): diagnosis and management (2018)',
        'General Pharmaceutical Council (GPhC) Standards of Conduct, Ethics and Performance'
      ]
    }
  },
  'ADHD_Consent_Capacity_RA.docx': {
    type: 'ra',
    data: {
      title: 'Consent & Mental Capacity Risk Assessment',
      hazards: [
        { name: 'Patient lacks capacity to consent', affected: 'Patients with cognitive impairment', rating: 'AMBER', color: 'FFD700', control: 'Mental Capacity Act 2005 assessment documented; Best Interests decision if needed', residual: 'GREEN' },
        { name: 'Informed consent not obtained', affected: 'All patients', rating: 'RED', color: 'FF6B6B', control: 'Standardised consent form covering diagnosis, treatment plan, medication side effects', residual: 'GREEN' },
        { name: 'Patient under 18 consent unclear', affected: 'Patients aged <18', rating: 'AMBER', color: 'FFD700', control: 'Parental/guardian consent for <16s; Assessment of Gillick competence for 16-17s', residual: 'GREEN' }
      ]
    }
  },
  'ADHD_Safeguarding_Policy.docx': {
    type: 'policy',
    data: {
      title: 'Safeguarding & Prevent Duty Policy',
      keyPoints: [
        'All staff complete Level 1 Safeguarding training (children & adults) annually, Level 3 for clinical staff',
        'Designated Safeguarding Lead (clinical manager) responsible for policy implementation',
        'Mandatory reporting of suspected child abuse, neglect, exploitation, or FGM to Local Authority or Police',
        'Adult safeguarding concerns escalated to Local Authority Adult Safeguarding Team',
        'Prevent Duty: staff trained to identify radicalisation; referrals to Channel programme if needed',
        'Staff whistleblowing policy: safe channels for reporting concerns without fear of reprisal',
        'Record-keeping: all concerns documented with actions taken'
      ],
      legalReferences: [
        'Children Act 1989 & 2004; Care Act 2014',
        'Serious Crime Act 2015 (FGM Duty)',
        'Counter-Terrorism and Security Act 2015 (Prevent Duty)',
        'CQC Fundamental Standard: Safeguarding Service Users from Abuse and Improper Treatment',
        'NHS Safeguarding Policy Framework (2023)',
        'UK GDPR & Data Protection Act 2018'
      ]
    }
  },
  'ADHD_Data_Security_RA.docx': {
    type: 'ra',
    data: {
      title: 'Data Protection & Cybersecurity Risk Assessment',
      hazards: [
        { name: 'Unauthorised access to patient mental health records', affected: 'Patients; clinic staff', rating: 'RED', color: 'FF6B6B', control: 'Role-based access controls (RBAC); password protection (≥12 characters, MFA); staff training; annual audit', residual: 'GREEN' },
        { name: 'Data breach due to insecure email or file transfer', affected: 'Patients; regulators', rating: 'RED', color: 'FF6B6B', control: 'Encrypted email (TLS); encrypted USB for physical transfers; annual cyber assessment', residual: 'GREEN' },
        { name: 'Loss of patient records due to system failure', affected: 'Patients; staff; business continuity', rating: 'AMBER', color: 'FFD700', control: 'Daily automated backups; disaster recovery plan tested quarterly; offsite backup storage', residual: 'GREEN' }
      ]
    }
  },
  'ADHD_Diagnostic_Accuracy_Policy.docx': {
    type: 'policy',
    data: {
      title: 'Diagnostic Accuracy & NICE Compliance Policy',
      keyPoints: [
        'All diagnoses follow NICE NG87 (2018) diagnostic criteria and assessment pathway',
        'Comprehensive history: developmental, educational, occupational, family psychiatric history documented',
        'Baseline assessments: ADHD Rating Scale (ADHD-RS), Conners Scale, or equivalent validated tool',
        'Differential diagnosis exclusion: sleep disorders, mood disorders, anxiety, thyroid dysfunction ruled out',
        'Collateral information: school/college reports, employer feedback, family corroboration recorded',
        'Diagnostic accuracy audit: 5% of cases reviewed by independent clinician annually',
        'Handover to GP/shared care: clear communication letter within 5 working days'
      ],
      legalReferences: [
        'NICE NG87: Attention deficit hyperactivity disorder (ADHD): diagnosis and management (2018)',
        'CQC Fundamental Standard: Effective Care and Treatment',
        'GMC Guidance: Good Medical Practice',
        'Royal College of Psychiatrists Position Statement on ADHD (2021)',
        'Health and Social Care Act 2008 (Regulated Activities) Regulations 2014, Reg 14'
      ]
    }
  },
  'ADHD_Emergency_Protocols_RA.docx': {
    type: 'ra',
    data: {
      title: 'Emergency Procedures Risk Assessment',
      hazards: [
        { name: 'Anaphylactic reaction to medication', affected: 'Patients', rating: 'RED', color: 'FF6B6B', control: 'Emergency medications on-site: adrenaline auto-injectors, antihistamines; staff trained; ambulance protocol', residual: 'GREEN' },
        { name: 'Cardiac event during/after consultation', affected: 'Patients on stimulant medication', rating: 'AMBER', color: 'FFD700', control: 'Baseline ECG if cardiac history; BP monitoring; emergency call procedures; BLS training; AED on-site', residual: 'GREEN' },
        { name: 'Suicidal ideation disclosure', affected: 'Patients; staff', rating: 'RED', color: 'FF6B6B', control: 'Mental health crisis assessment; suicide risk screening; GP contact within 24 hours; Crisis Team contact', residual: 'GREEN' }
      ]
    }
  },
  'ADHD_Staff_Training_Policy.docx': {
    type: 'policy',
    data: {
      title: 'Staff Competency & Training Policy',
      keyPoints: [
        'Mandatory training: Safeguarding Level 1 (annual), ADHD awareness, Data Protection/GDPR, Health & Safety',
        'Clinical staff: ADHD diagnosis and management (NICE NG87); medication side effects; mental capacity assessment',
        'Administrative staff: confidentiality, GDPR Subject Access Requests, patient complaint procedures',
        'Induction for new staff: 3-day induction covering clinic policies, patient pathways, emergency procedures',
        'Competency assessment: annual appraisals with observable competency outcomes',
        'Continuing Professional Development (CPD): 40-60 hours/year for clinical staff',
        'Training records maintained: dates, topics, assessor sign-off; audit annually'
      ],
      legalReferences: [
        'Health and Social Care Act 2008 (Regulated Activities) Regulations 2014, Reg 18 (Staffing)',
        'CQC Fundamental Standard: Staffing',
        'GMC Good Medical Practice & CPD Requirements',
        'Nursing and Midwifery Council (NMC) Code & CPD Standards',
        'HSAB Safeguarding Training Standards (Level 1/2/3)'
      ]
    }
  },
  'ADHD_Complaints_Handling_Policy.docx': {
    type: 'policy',
    data: {
      title: 'Complaints & Duty of Candour Policy',
      keyPoints: [
        'Patient complaints received in writing, verbally, or by email; acknowledged within 2 working days',
        'Formal investigation initiated within 5 days; completed within 28 days for routine complaints',
        'Duty of Candour: if moderate/severe harm suspected, patient/carer notified within 10 days with apology',
        'Learning from complaints: all complaints logged; themes identified; improvements implemented',
        'Patient given right to escalate to Health and Social Care Ombudsman if dissatisfied',
        'No gagging clauses permitted; confidentiality agreements do not restrict legitimate complaints',
        'Complaint outcome documented in patient record with actions taken'
      ],
      legalReferences: [
        'Health and Social Care Act 2008 (Regulated Activities) Regulations 2014, Reg 16 (Duty of Candour)',
        'CQC Fundamental Standard: Responsive Service',
        'Health and Social Care Ombudsman guidance',
        'NHS Complaints Procedure (England) 2021',
        'Data Protection Act 2018 (complaint records retention: 3 years minimum)'
      ]
    }
  },
  'ADHD_Infection_Control_RA.docx': {
    type: 'ra',
    data: {
      title: 'Infection Prevention & Control Risk Assessment',
      hazards: [
        { name: 'Transmission of respiratory infections (COVID-19, influenza, RSV)', affected: 'Patients; staff; vulnerable persons', rating: 'AMBER', color: 'FFD700', control: 'Hand hygiene stations; PPE available; vaccination policy (annual flu, COVID-19); ill staff not attend; ventilation checked', residual: 'GREEN' },
        { name: 'Blood-borne virus (BBV) exposure', affected: 'Staff; patients', rating: 'AMBER', color: 'FFD700', control: 'Safe needle disposal; staff vaccination (Hep B); hand hygiene; Post-Exposure Prophylaxis (PEP) available', residual: 'GREEN' },
        { name: 'Environmental contamination from patients with infections', affected: 'Subsequent patients; staff', rating: 'AMBER', color: 'FFD700', control: 'Cleaning schedule: high-touch surfaces after each patient; approved disinfectant; staff training; daily deep clean', residual: 'GREEN' }
      ]
    }
  },
  'Weightloss_GLP1_Prescribing_Policy.docx': {
    type: 'policy',
    data: {
      title: 'GLP-1 Medication Prescribing & Monitoring Policy',
      keyPoints: [
        'GLP-1 agonists (semaglutide [Wegovy], tirzepatide [Zepbound]) prescribed by registered medical practitioners only',
        'Patient eligibility: BMI ≥30 kg/m² or ≥27 kg/m² with weight-related comorbidity per NICE NG208 (2023)',
        'Baseline assessment: fasting glucose, HbA1c, renal function (eGFR), lipid panel, liver function tests',
        'Cardiovascular baseline: blood pressure, ECG if cardiac history; annual monitoring on treatment',
        'Dose titration protocol: start low; titrate weekly to target dose; document response',
        'Patient education: GLP-1 mechanism, side effects (nausea, vomiting, constipation, pancreatitis risk), injection technique',
        'Mandatory dietitian review: ongoing nutritional assessment; supplementation plan documented',
        'Shared care with GP: clear communication letter within 5 working days'
      ],
      legalReferences: [
        'Health and Social Care Act 2008 (Regulated Activities) Regulations 2014, Reg 12',
        'NICE NG208: Obesity: identification and management (2023)',
        'Medicines Act 1968 & Misuse of Drugs Act 1971',
        'CQC Fundamental Standard: Effective Care and Treatment',
        'GMC Good Medical Practice: prescribing within competence',
        'Royal College of Physicians (RCP) Guidance on Weight Management Services (2023)'
      ]
    }
  }
};

const generateDocs = async () => {
  console.log('🚀 Generating CQC-compliant documents...\n');
  
  const outputDir = path.join(process.cwd(), 'cqc-documents');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  let count = 0;
  for (const [filename, config] of Object.entries(docs)) {
    try {
      const children = config.type === 'policy'
        ? createPolicy(config.data.title, config.data.keyPoints, config.data.legalReferences)
        : createRA(config.data.title, config.data.hazards);

      const doc = new Document({
        sections: [{
          properties: {
            page: { margin: { top: 720, right: 720, bottom: 720, left: 720 } }
          },
          children
        }]
      });

      await Packer.toBuffer(doc).then(buffer => {
        fs.writeFileSync(path.join(outputDir, filename), buffer);
        count++;
        console.log(`✓ ${filename}`);
      });
    } catch (error) {
      console.error(`✗ ${filename} - ${error.message}`);
    }
  }

  console.log(`\n✅ Generated ${count} documents in: ${outputDir}`);
};

generateDocs().catch(err => console.error('Error:', err.message));
