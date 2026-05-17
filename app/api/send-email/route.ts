import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

const sendgridApiKey = process.env.SENDGRID_API_KEY;

if (sendgridApiKey) {
  sgMail.setApiKey(sendgridApiKey);
}

export async function POST(request: NextRequest) {
  try {
    if (!sendgridApiKey) {
      return NextResponse.json(
        { error: 'SendGrid API key not configured' },
        { status: 500 }
      );
    }

    const { customerEmail, items, sessionId } = await request.json();

    if (!customerEmail || !items) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Format items list for email
    const itemsList = items
      .map(
        (item: any) =>
          `<li><strong>${item.name}</strong> - £${item.price.toFixed(2)}</li>`
      )
      .join('');

    const total = items.reduce((sum: number, item: any) => sum + item.price, 0);

    const msg = {
      to: customerEmail,
      from: 'noreply@barkerscott.co.uk',
      subject: 'Your Purchase Confirmation - Barker Scott Ltd',
      html: `
        <h2>✅ Payment Successful!</h2>
        <p>Thank you for your purchase from Barker Scott Ltd.</p>
        
        <h3>Order Details:</h3>
        <ul>
          ${itemsList}
        </ul>
        
        <p><strong>Order Total: £${total.toFixed(2)}</strong></p>
        <p><strong>Transaction ID: ${sessionId}</strong></p>
        
        <p>Your documents are attached to this email. You can download them directly from here or log in to your account on our website to access them anytime.</p>
        
        <p>If you have any questions, please don't hesitate to contact us.</p>
        
        <p>Best regards,<br>Barker Scott Ltd<br>COC Compliance Specialists</p>
      `,
    };

    await sgMail.send(msg);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('SendGrid error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}