import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerEmail, items, sessionId } = body;
    
    if (!customerEmail) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ error: 'No API key' }, { status: 500 });
    }

    const itemsList = items
      ?.map((item: any) => $ - £EOF{item.price})
      .join('\n') || 'No items';
    
    const total = items?.reduce((sum: number, item: any) => sum + item.price, 0) || 0;

    const emailHtml = 
      <h2>Payment Successful!</h2>
      <p>Thank you for your purchase.</p>
      <h3>Order Details:</h3>
      <p>EOF{itemsList.replace(/\n/g, '<br>')}</p>
      <p><strong>Total: £EOF{total.toFixed(2)}</strong></p>
      <p><strong>Transaction ID: </strong></p>
      <p>Best regards, Barker Scott Ltd</p>
    ;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Bearer EOF{apiKey},
      },
      body: JSON.stringify({
        from: 'noreply@barker-scott.co.uk',
        to: customerEmail,
        subject: 'Your Purchase Confirmation - Barker Scott Ltd',
        html: emailHtml,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to send email', details: result },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: result.id });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
