// lib/driveFileMapping.ts
// Maps product IDs to Google Drive file IDs
// You'll need to get the file IDs from your Drive folders

export const DRIVE_FOLDER_IDS = {
  // Main downloads folder
  root: '1lnurWzdSfUZh_fFzbXUlHkZ_J7ZTriiL',
  
  // Aesthetic
  'aesthetic-policies': 'FOLDER_ID_HERE',
  'aesthetic-ras': 'FOLDER_ID_HERE',
  
  // GP Surgery
  'gp-policies': 'FOLDER_ID_HERE',
  'gp-ras': 'FOLDER_ID_HERE',
  
  // Private Healthcare
  'private-health-policies': 'FOLDER_ID_HERE',
  'private-health-ras': 'FOLDER_ID_HERE',
  
  // ADHD
  'adhd-policies': 'FOLDER_ID_HERE',
  'adhd-ras': 'FOLDER_ID_HERE',
  
  // Weight Loss
  'weightloss-policies': 'FOLDER_ID_HERE',
  'weightloss-ras': 'FOLDER_ID_HERE',
  
  // Telehealth
  'telehealth-policies': 'FOLDER_ID_HERE',
  'telehealth-ras': 'FOLDER_ID_HERE',
};

// Maps product IDs to Google Drive file IDs
// Example: 'aes-pol-001' -> file ID for 'Consent Risk Disclosure Policy.docx'
export const PRODUCT_FILE_IDS: Record<string, string> = {
  // Add mappings like:
  // 'aes-pol-001': 'FILE_ID_1',
  // 'aes-pol-002': 'FILE_ID_2',
  // etc...
};

export function getGoogleDriveFileId(productId: string): string | null {
  return PRODUCT_FILE_IDS[productId] || null;
}

export function getFolderIdByCategory(category: string): string | null {
  return DRIVE_FOLDER_IDS[category as keyof typeof DRIVE_FOLDER_IDS] || null;
}
