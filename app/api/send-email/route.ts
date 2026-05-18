import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('=== Email API Started ===');
    
    const body = await request.json();
    console.log('Request body:', body);
    
    const { customerEmail, items, sessionId } = body;
    
    if (!customerEmail) {
      console.log('Error: No customer email');
      return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    console.log('API Key exists:', !!apiKey);
    
    if (!apiKey) {
      return NextResponse.json({ error: 'No API key' }, { status: 500 });
    }

    const itemsList = items
      ?.map((item: any) => `${item.name} - £${item.price}`)
      .join('\n') || 'No items';
    
    const total = items?.reduce((sum: number, item: any) => sum + item.price, 0) || 0;

    const emailHtml = `
      <h2>Payment Successful!</h2>
      <p>Thank you for your purchase.</p>
      <h3>Order Details:</h3>
      <p>${itemsList.replace(/\n/g, '<br>')}</p>
      <p><strong>Total: £${total.toFixed(2)}</strong></p>
      <p><strong>Transaction ID: ${sessionId}</strong></p>
      <p>Best regards, Barker Scott Ltd</p>
    `;

    console.log('Sending email to:', customerEmail);

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'noreply@barkerscott.co.uk',
        to: customerEmail,
        subject: 'Your Purchase Confirmation - Barker Scott Ltd',
        html: emailHtml,
      }),
    });

    const result = await response.json();
    console.log('Resend response:', result);

    if (!response.ok) {
      console.error('Resend error:', result);
      return NextResponse.json(
        { error: 'Failed to send email', details: result },
        { status: 500 }
      );
    }

    console.log('Email sent successfully!');
    return NextResponse.json({ success: true, id: result.id });

  } catch (error: any) {
    console.error('=== CATCH ERROR ===');
    console.error(error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}