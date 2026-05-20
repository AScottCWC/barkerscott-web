import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ token: string }> }
) {
  const { token } = await context.params;

  if (!token) {
    return NextResponse.json({ error: 'Token required' }, { status: 400 });
  }

  return NextResponse.redirect(new URL('/policies', req.url));
}