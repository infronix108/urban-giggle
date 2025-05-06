import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email } = await request.json();
  if (!email) {
    return NextResponse.json({ status: 'error', message: 'Missing email' }, { status: 400 });
  }
  // Google Apps Script endpoint for user info
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwqcmMZ938a6Oimo7hiJijUmMipLTBuiL_z-_9ApRsWnnArkfiZjO2QqbSX6g_s4VFVJA/exec';
  const res = await fetch(GOOGLE_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'get_user_info', email }),
  });
  const data = await res.json();
  return NextResponse.json(data);
}
