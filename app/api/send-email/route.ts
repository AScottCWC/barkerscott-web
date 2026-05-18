import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerEmail, items, sessionId } = body;
    
    if (!customerEmail) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "No API key" }, { status: 500 });
    }

    const itemsHtml = items?.map((item: any) => {
      return `<div style="margin: 15px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #0066cc; border-radius: 4px;"><strong style="font-size: 16px;">${item.name}</strong><p style="color: #666; margin: 8px 0; font-size: 14px;">£${item.price}</p></div>`;
    }).join("") || "<p>No items</p>";
    
    const total = items?.reduce((sum: number, item: any) => sum + item.price, 0) || 0;

    const emailHtml = `<div style="font-family: Arial, sans-serif; color: #333; max-width: 650px; margin: 0 auto; background-color: #ffffff;"><div style="background-color: #0066cc; padding: 20px; color: white; border-radius: 4px 4px 0 0;"><h1 style="margin: 0; font-size: 28px;">✅ Payment Successful!</h1><p style="margin: 8px 0 0 0; font-size: 16px;">Your templates are ready to download</p></div><div style="padding: 20px;"><p>Hi there,</p><p>Thank you for your purchase! We're excited to help you get your compliance templates in place.</p><div style="background-color: #fff3cd; padding: 15px; border-left: 4px solid #ff9800; border-radius: 4px; margin: 20px 0;"><h3 style="margin: 0 0 10px 0; color: #ff6f00;">📋 Important Information About Your Templates</h3><p style="margin: 8px 0; font-size: 14px;"><strong>These are templates, not final documents.</strong> You will need to:</p><ul style="margin: 10px 0; padding-left: 20px; font-size: 14px;"><li><strong>READ</strong> through each document carefully</li><li><strong>EDIT</strong> with your organisation's specific information and details</li><li><strong>CUSTOMISE</strong> to match your policies and procedures</li><li><strong>REVIEW</strong> with relevant stakeholders or legal advisors as appropriate</li></ul></div><h3 style="color: #0066cc; margin-top: 30px; margin-bottom: 15px;">Your Order:</h3>${itemsHtml}<div style="background-color: #f0f0f0; padding: 15px; border-radius: 4px; margin: 20px 0;"><p style="margin: 0;"><strong>Total Paid:</strong> £${total.toFixed(2)}</p><p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">Transaction ID: ${sessionId}</p></div><div style="background-color: #f5f5f5; padding: 15px; border-radius: 4px; margin: 20px 0; border-left: 4px solid #999;"><h4 style="margin: 0 0 10px 0; color: #333;">⚖️ Important Disclaimer</h4><p style="margin: 8px 0; font-size: 13px; color: #555;"><strong>Barker Scott Ltd</strong> provides these templates as a starting point to help you develop your own policies and procedures.</p><p style="margin: 8px 0; font-size: 13px; color: #555;">While we've created these templates with care and attention to current compliance standards, <strong>Barker Scott Ltd takes no responsibility</strong> for how these templates are implemented, customised, or used by your organisation.</p><p style="margin: 8px 0; font-size: 13px; color: #555;">We strongly recommend having a qualified professional (such as an HR consultant, legal advisor, or compliance specialist) review any customised templates before implementation, particularly for Safeguarding and Data Protection policies.</p></div><div style="background-color: #e8f4f8; padding: 15px; border-radius: 4px; margin: 20px 0; border-left: 4px solid #0066cc;"><h4 style="margin: 0 0 10px 0; color: #0066cc;">📥 Download Your Files</h4><p style="margin: 8px 0; font-size: 14px;">Your files are being prepared. You'll receive a follow-up email with download links shortly, or contact us at support@barker-scott.co.uk to request your files.</p></div><div style="background-color: #e8f4f8; padding: 15px; border-radius: 4px; margin: 20px 0; border-left: 4px solid #0066cc;"><h4 style="margin: 0 0 10px 0; color: #0066cc;">Need Help?</h4><p style="margin: 8px 0; font-size: 14px;">If you have any questions about your templates or need further support, please don't hesitate to contact us:</p><p style="margin: 8px 0; font-size: 14px;">📧 Email: <a href="mailto:support@barker-scott.co.uk" style="color: #0066cc; text-decoration: none;">support@barker-scott.co.uk</a></p></div><p style="margin-top: 30px; font-size: 14px;">Best regards,<br><strong>The Barker Scott Team</strong><br><span style="color: #666; font-size: 12px;">Professional Compliance Templates & Support</span></p></div><div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 4px 4px;"><p style="margin: 0;">© 2026 Barker Scott Ltd. All rights reserved.</p></div></div>`;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "noreply@barker-scott.co.uk",
        to: customerEmail,
        subject: "Your Purchase Confirmation - Barker Scott Ltd",
        html: emailHtml,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to send email", details: result }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: result.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}