// app/download/[token]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const token = params.token;

    if (!token || token.length < 32) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }

    // Fetch purchase by token
    const { data: purchase, error } = await supabase
      .from('purchases')
      .select('*')
      .eq('download_token', token)
      .single();

    if (error || !purchase) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 404 });
    }

    // Check if token is expired
    if (new Date(purchase.download_token_expires_at) < new Date()) {
      return NextResponse.json({ error: 'Download link expired' }, { status: 410 });
    }

    // Log download
    await supabase
      .from('download_logs')
      .insert({
        purchase_id: purchase.id,
        ip_address: req.ip || 'unknown',
        user_agent: req.headers.get('user-agent') || 'unknown',
      });

    // Get file from Google Drive
    if (!purchase.google_drive_file_id) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // Stream file directly from Google Drive
    const googleDriveUrl = `https://www.googleapis.com/drive/v3/files/${purchase.google_drive_file_id}?alt=media&key=${process.env.GOOGLE_DRIVE_API_KEY}`;

    const response = await fetch(googleDriveUrl);

    if (!response.ok) {
      console.error('Google Drive error:', response.statusText);
      return NextResponse.json({ error: 'Failed to fetch file' }, { status: 500 });
    }

    // Return file with proper headers
    const buffer = await response.arrayBuffer();
    const fileName = purchase.product_name.replace(/\s+/g, '_') + '.docx';

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}