export function getPurchaseConfirmationEmail(
  customerName: string,
  items: Array<{ name: string; price: number; type?: string }>,
  totalPrice: number,
  transactionId: string,
  accountUrl: string
) {
  const itemsHtml = items
    .map(
      (item) =>
        `<tr>
          <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">${item.name}${item.type ? ` (${item.type})` : ""}</td>
          <td style="padding: 12px; text-align: right; border-bottom: 1px solid #e2e8f0;">£${item.price.toFixed(2)}</td>
        </tr>`
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; color: #1e293b; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; }
          .header { background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%); color: white; padding: 40px 20px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; display: flex; align-items: center; justify-content: center; gap: 10px; }
          .checkmark { font-size: 32px; }
          .content { padding: 30px 20px; background: white; }
          .section { margin-bottom: 30px; }
          .section h2 { color: #0f172a; font-size: 18px; margin-bottom: 15px; display: flex; align-items: center; gap: 8px; }
          .section-icon { font-size: 20px; }
          .info-box { background: #f0f9ff; border-left: 4px solid #3b82f6; padding: 15px; margin-bottom: 15px; }
          .warning-box { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin-bottom: 15px; }
          .btn { display: inline-block; background: #0f172a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 15px 0; }
          .btn:hover { background: #1e3a8a; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          table th { text-align: left; padding: 12px; background: #f1f5f9; border-bottom: 2px solid #e2e8f0; }
          .total-row { background: #f1f5f9; font-weight: 600; }
          .footer { background: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
          .disclaimer { font-size: 12px; color: #64748b; line-height: 1.8; }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header -->
          <div class="header">
            <h1><span class="checkmark">✅</span> Payment Successful!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Your documents are ready to download</p>
          </div>

          <!-- Content -->
          <div class="content">
            <p>Hi ${customerName || "there"},</p>
            
            <p>Thank you for your purchase! We're excited to help you get your compliance templates in place.</p>

            <!-- Download Section -->
            <div class="section">
              <h2><span class="section-icon">📥</span> Download Your Files</h2>
              <div class="info-box">
                <p>All your documents are ready! Access them immediately from your account.</p>
                <a href="${accountUrl}" class="btn" style="display: inline-block;">📥 Access My Account</a>
              </div>
            </div>

            <!-- Order Details -->
            <div class="section">
              <h2><span class="section-icon">📋</span> Your Order</h2>
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th style="text-align: right;">Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                  <tr class="total-row">
                    <td style="padding: 12px;">Total Paid</td>
                    <td style="padding: 12px; text-align: right;">£${totalPrice.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
              <p style="font-size: 12px; color: #64748b;">Transaction ID: ${transactionId}</p>
            </div>

            <!-- Important Info -->
            <div class="section">
              <h2><span class="section-icon">⚠️</span> Important Information</h2>
              <div class="warning-box">
                <p style="margin-top: 0;"><strong>These are templates, not final documents.</strong> You will need to:</p>
                <ul style="margin: 10px 0; padding-left: 20px;">
                  <li>READ through each document carefully</li>
                  <li>EDIT with your organisation's specific information</li>
                  <li>CUSTOMISE to match your policies and procedures</li>
                  <li>REVIEW with relevant stakeholders or legal advisors</li>
                </ul>
              </div>
            </div>

            <!-- Disclaimer -->
            <div class="section">
              <h2><span class="section-icon">⚖️</span> Disclaimer</h2>
              <p class="disclaimer">
                Barker Scott Ltd provides these templates as a starting point to help you develop your own policies and procedures. While we've created these templates with care and attention to current compliance standards, Barker Scott Ltd takes no responsibility for how these templates are implemented, customised, or used by your organisation.
              </p>
              <p class="disclaimer">
                We strongly recommend having a qualified professional (such as an HR consultant, legal advisor, or compliance specialist) review any customised templates before implementation, particularly for Safeguarding and Data Protection policies.
              </p>
            </div>

            <!-- Support -->
            <div class="section">
              <h2><span class="section-icon">❓</span> Need Help?</h2>
              <p>If you have any questions or need support, contact us:</p>
              <p>📧 <a href="mailto:support@barkerscott.co.uk" style="color: #0f172a; text-decoration: none;">support@barkerscott.co.uk</a></p>
            </div>
          </div>

          <!-- Footer -->
          <div class="footer">
            <p style="margin: 0;">Best regards,<br><strong>The Barker Scott Team</strong></p>
            <p style="margin: 10px 0 0 0; font-size: 11px;">Professional Compliance Templates & Support</p>
          </div>
        </div>
      </body>
    </html>
  `;
}