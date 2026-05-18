import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import fs from 'fs';
import path from 'path';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const DOCUMENT_MAP: Record<
  string,
  {
    filename: string;
    googleDriveLink: string;
    title: string;
    category: string;
  }
> = {
  'bundle-care-home': {
    filename: 'care-home-bundle.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1x5Ke9SiobWKJ2ggZg6q4lKG_-CLlL909/view?usp=sharing',
    title: 'Care Home Starter Bundle',
    category: 'Care Home - Bundles'
  },
  'bundle-dental': {
    filename: 'dental-bundle.docx',
    googleDriveLink: 'https://drive.google.com/file/d/19zHEnVPpAI6oOmE578xdX9zKR96YFrnF/view?usp=sharing',
    title: 'Dental Pro Bundle',
    category: 'Dental - Bundles'
  },
  'bundle-aesthetic': {
    filename: 'aesthetic-bundle.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1V5lxLzVUWZ8YuBjsImg0KvfcRIzpOZ5Z/view?usp=sharing',
    title: 'Aesthetic Complete Bundle',
    category: 'Aesthetic - Bundles'
  },
  'bundle-gp': {
    filename: 'gp-bundle.docx',
    googleDriveLink: 'https://drive.google.com/file/d/17git9BUMBA-Ck-cf4AQ6GrT5gTHv_mzl/view?usp=sharing',
    title: 'GP Practice Bundle',
    category: 'GP Practice - Bundles'
  },
  'bundle-private-clinic': {
    filename: 'private-clinic-bundle.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1VM6-oRPA_uBDkpVTFa2n89add2HzXR9_/view?usp=sharing',
    title: 'Private Clinic Complete Bundle',
    category: 'Private Clinic - Bundles'
  },
  'bundle-ultimate': {
    filename: 'ultimate-bundle.docx',
    googleDriveLink: 'https://drive.google.com/file/d/1iXjjtIjVCxSGAQ0e8R_nIV3mpG6eC-SH/view?usp=sharing',
    title: 'Ultimate Package - All Templates',
    category: 'Ultimate - All Bundles'
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerEmail, customerName, productIds, totalAmount } = body;

    if (!customerEmail || !productIds || !Array.isArray(productIds)) {
      return NextResponse.json(
        { error: 'Missing required fields: customerEmail, customerName, productIds, totalAmount' },
        { status: 400 }
      );
    }

    // BUILD ATTACHMENTS - FIXED: any[] instead of sgMail.Attachment[]
    const attachments: any[] = [];
    const documentLinks: { title: string; link: string; category: string }[] = [];

    for (const productId of productIds) {
      const docInfo = DOCUMENT_MAP[productId];

      if (!docInfo) {
        console.warn(`⚠️ No document mapping found for product: ${productId}`);
        continue;
      }

      // Try to read file from public/downloads
      const filePath = path.join(process.cwd(), 'public', 'downloads', docInfo.filename);

      if (!fs.existsSync(filePath)) {
        console.warn(`⚠️ File not found at: ${filePath}`);
        // Continue without attachment but include Google Drive link
        documentLinks.push({
          title: docInfo.title,
          link: docInfo.googleDriveLink,
          category: docInfo.category,
        });
        continue;
      }

      try {
        const fileContent = fs.readFileSync(filePath);
        const base64Content = fileContent.toString('base64');

        attachments.push({
          filename: docInfo.filename,
          content: base64Content,
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          disposition: 'attachment',
        });

        documentLinks.push({
          title: docInfo.title,
          link: docInfo.googleDriveLink,
          category: docInfo.category,
        });

        console.log(`✅ Added attachment: ${docInfo.title}`);
      } catch (fileError) {
        console.warn(`⚠️ Error reading file ${filePath}:`, fileError);
        documentLinks.push({
          title: docInfo.title,
          link: docInfo.googleDriveLink,
          category: docInfo.category,
        });
      }
    }

    // BUILD CLOUD BACKUP LINKS HTML
    let cloudBackupHTML = '';
    if (documentLinks.length > 0) {
      let currentCategory = '';
      cloudBackupHTML = '<div style="margin-top: 24px; background-color: #F0F4F8; padding: 16px; border-radius: 8px; border-left: 4px solid #0B1D3A;">';
      cloudBackupHTML += '<p style="margin-top: 0; color: #0B1D3A; font-weight: bold;">💾 Backup Cloud Links</p>';
      cloudBackupHTML += '<p style="color: #666; font-size: 14px;">All your documents are also available here:</p>';

      for (const doc of documentLinks) {
        if (doc.category !== currentCategory) {
          if (currentCategory !== '') cloudBackupHTML += '</ul>';
          cloudBackupHTML += `<p style="margin: 12px 0 8px 0; color: #0B1D3A; font-weight: bold; font-size: 13px;">${doc.category}</p><ul style="margin: 0 0 12px 20px; padding: 0; list-style: disc;">`;
          currentCategory = doc.category;
        }
        cloudBackupHTML += `<li style="margin-bottom: 6px;"><a href="${doc.link}" target="_blank" style="color: #0B1D3A; text-decoration: none; font-weight: 500;">📄 ${doc.title}</a></li>`;
      }
      cloudBackupHTML += '</ul></div>';
    }

    // BUILD HTML EMAIL
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
            .attachment-box { background-color: #E8F8F0; border-left: 4px solid #27AE60; padding: 16px; margin: 16px 0; border-radius: 4px; }
            .attachment-box strong { color: #27AE60; font-size: 15px; }
            .attachment-box p { margin: 8px 0 0 0; color: #555; font-size: 14px; }
            .document-list { list-style: none; margin: 12px 0 0 0; padding: 0; }
            .document-list li { padding: 6px 0; color: #555; font-size: 14px; }
            .document-list li:before { content: "✓ "; color: #27AE60; font-weight: bold; margin-right: 8px; }
            .order-summary { background-color: #f9f9f9; padding: 16px; border-radius: 4px; margin-top: 24px; }
            .order-summary-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; }
            .order-summary-row strong { color: #0B1D3A; }
            .footer { background-color: #f0f0f0; padding: 24px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #e0e0e0; }
            .footer a { color: #0B1D3A; text-decoration: none; }
            .divider { height: 1px; background-color: #e0e0e0; margin: 24px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📥 Your CQC Compliance Bundle</h1>
              <p>BarkerScott – Healthcare Compliance Templates</p>
            </div>

            <div class="content">
              <p>Hi ${customerName},</p>
              
              <p style="margin-top: 16px;">Thank you for your purchase! Your CQC compliance documents bundle is ready to access.</p>

              ${attachments.length > 0 ? `
                <div class="attachment-box">
                  <strong>✅ Email Attachments Ready</strong>
                  <p>You'll find ${attachments.length} document(s) attached to this email. Download them directly below.</p>
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
              ` : ''}

              ${cloudBackupHTML}

              <div class="order-summary">
                <p style="color: #0B1D3A; font-weight: 600; margin-bottom: 12px;">📋 Order Summary</p>
                <div class="order-summary-row">
                  <span>Bundle(s):</span>
                  <strong>${productIds.length} item(s)</strong>
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

              <p style="margin-top: 24px;"><strong>What's next?</strong></p>
              <ul style="margin-top: 12px; padding-left: 20px; color: #555; font-size: 14px;">
                <li>Download the attachments from this email or the Google Drive links</li>
                <li>Customize the documents with your organization details</li>
                <li>Implement the policies and risk assessments</li>
                <li>Use as evidence for your CQC inspection</li>
              </ul>

              <p style="margin-top: 24px; color: #555; font-size: 14px;">
                <strong>Need help?</strong> Visit <a href="https://barker-scott.co.uk" style="color: #0B1D3A;">barker-scott.co.uk</a> or reply to this email.
              </p>
            </div>

            <div class="footer">
              <p style="margin: 0;">© 2026 Barker Scott Ltd. All rights reserved.</p>
              <p style="margin: 8px 0 0 0;">CQC Compliance Templates & Risk Assessments for UK Healthcare Providers</p>
              <p style="margin: 8px 0 0 0;"><a href="https://barker-scott.co.uk">barker-scott.co.uk</a></p>
            </div>
          </div>
        </body>
      </html>
    `;

    // SEND EMAIL
    const message = {
      to: customerEmail,
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@barker-scott.co.uk',
      subject: `📥 Your ${productIds.length} Bundle(s) – BarkerScott CQC Compliance`,
      html: htmlContent,
      attachments: attachments,
    };

    await sgMail.send(message);

    console.log(`✅ Email sent to ${customerEmail} with ${attachments.length} attachments`);

    return NextResponse.json(
      {
        success: true,
        message: `Email sent successfully!`,
        documentsAttached: attachments.length,
        bundleCount: productIds.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Email error:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: String(error) },
      { status: 500 }
    );
  }
}