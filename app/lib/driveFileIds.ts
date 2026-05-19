export const driveFolders = {
  adhd: {
    policies: process.env.GOOGLE_DRIVE_FOLDER_ADHD_POLICIES!,
    riskAssessments: process.env.GOOGLE_DRIVE_FOLDER_ADHD_RA!,
  },
  weightLoss: {
    policies: process.env.GOOGLE_DRIVE_FOLDER_WEIGHTLOSS_POLICIES!,
    riskAssessments: process.env.GOOGLE_DRIVE_FOLDER_WEIGHTLOSS_RA!,
  },
  telehealth: {
    policies: process.env.GOOGLE_DRIVE_FOLDER_TELEHEALTH_POLICIES!,
    riskAssessments: process.env.GOOGLE_DRIVE_FOLDER_TELEHEALTH_RA!,
  },
};

export const driveFiles = {
  adhd: {
    policies: [
      { id: "1kmiUD2BPb-zxb9UiASA1enMGiZEzrjPu", name: "Staff_Training_Policy.docx" },
      { id: "19OVRIfpQJhxlchIiZPXuDi6RPdJ23KRD", name: "Safeguarding_Policy.docx" },
      { id: "1Ex9TY_0Ia-aV1yFU3CCBhMvpyvJ6u4Ne", name: "Medication_Management_Policy.docx" },
      { id: "10UD65Cty5mMXMC8X-jDhGqkfl3ZtGdZQ", name: "Diagnostic_Accuracy_Policy.docx" },
      { id: "1bsx6SBgXwdpxQ4n-tZFdyVKgYOx7eeDF", name: "Complaints_Handling_Policy.docx" },
    ],
    riskAssessments: [
      { id: "1NkXkaARYt1oL4jHspRNOv0AV9ejwr41v", name: "Infection_Control_RA.docx" },
      { id: "1m-GJLznba1jFMY17YhvI3yFJqFxvJtnu", name: "Emergency_Protocols_RA.docx" },
      { id: "1uCXmS-FqTavPYczH2whe0iSacCoBR2Ah", name: "Data_Security_RA.docx" },
      { id: "1U5GlwezIDwuuhO5x6WawbnYAKYaAkj-9", name: "Consent_Capacity_RA.docx" },
    ],
  },
  weightLoss: {
    policies: [
      { id: "17mCqlTv_tpMosIlhl0gm-9qlikJN9F8z", name: "Psychological_Assessment_Policy.docx" },
      { id: "12KSYSWZMPiTn3kNH8xmNR2EnjQJPbmwi", name: "Informed_Consent_Policy.docx" },
      { id: "15uY5xN4elq7MksT1dW8UmKeMO58JWn5V", name: "GLP1_Prescribing_Policy.docx" },
      { id: "13RXQRkjcn9c4z-bqtZP-MWF0st54bcPW", name: "Equity_Access_Policy.docx" },
      { id: "1hkbOOrpad87O12zwgcPgjfkT--6Krh0t", name: "Cardiovascular_Safety_Policy.docx" },
    ],
    riskAssessments: [
      { id: "1Pqwxb4nF30aAbjXveaHHrGNAkPzbzMEg", name: "Record_Keeping_RA.docx" },
      { id: "1aQ9TA-J3tf5SXTZUGexw5dWPK2zdX5pv", name: "Pancreatitis_Risk_RA.docx" },
      { id: "1shfLB1u9R8q8H3sCH5wzkskRp9dV1uAD", name: "Drug_Interactions_RA.docx" },
      { id: "1jkpXs82EJFyWc9sCz1Z7ayFj4zpJwCo2", name: "Dietary_Assessment_RA.docx" },
    ],
  },
  telehealth: {
    policies: [
      { id: "1ik3E8bFfeX5zhPuh64gbkGayQWs7eYTE", name: "Remote_Consent_Policy.docx" },
      { id: "1I8e9GW7miWsP6Guh-RgLrXeqO8lm7yf_", name: "Patient_Privacy_Policy.docx" },
      { id: "1tLgC0zxUUGgVEDdIjfJ0nJpWuJi4Qq5t", name: "Patient_Education_Policy.docx" },
      { id: "1-su64JImQStss6vWGBiFMIDjI5ISZhtT", name: "Duty_of_Candour_Policy.docx" },
      { id: "1cT9bciZUFvoODFt7p_xdfBjg3fiH9ElF", name: "Cybersecurity_Policy.docx" },
      { id: "1YGjSejGZ4n7a6pLoNi9CU9oqmFP8qwNP", name: "Clinical_Governance_Policy.docx" },
    ],
    riskAssessments: [
      { id: "1hagxwwhi6snQFDiEhByvV_Nelo8LH5tP", name: "Emergency_Response_RA.docx" },
      { id: "1ePq-Ob8Z2d3MIXHMmJxAtEVYdjllJaGK", name: "Digital_Exclusion_RA.docx" },
      { id: "1SCrivbIRVzWHv9VnfPndmn4Rgl8rBgvG", name: "Controlled_Substances_RA.docx" },
      { id: "14ZU_vgNO35JRipt8h3YxuR9ViZO1M71P", name: "Business_Continuity_RA.docx" },
    ],
  },
};

export const bundleConfig = {
  adhd: {
    name: "ADHD Clinics",
    policies: 5,
    riskAssessments: 4,
    totalDocuments: 9,
    pricePerPolicy: 39.99,
    pricePerRA: 39.99,
  },
  weightLoss: {
    name: "Weight Loss Clinics",
    policies: 5,
    riskAssessments: 4,
    totalDocuments: 9,
    pricePerPolicy: 39.99,
    pricePerRA: 39.99,
  },
  telehealth: {
    name: "Telehealth Services",
    policies: 6,
    riskAssessments: 4,
    totalDocuments: 10,
    pricePerPolicy: 39.99,
    pricePerRA: 39.99,
  },
};

export function calculateBundlePrice(bundleId: string): number {
  const config = bundleConfig[bundleId as keyof typeof bundleConfig];
  if (!config) return 0;
  return (config.policies * config.pricePerPolicy) + (config.riskAssessments * config.pricePerRA);
}