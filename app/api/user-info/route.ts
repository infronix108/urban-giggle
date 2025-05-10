import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, token } = await request.json();
    if (!email || typeof email !== 'string' || !email.trim()) {
      console.error('Missing or invalid email in request body:', email);
      return NextResponse.json({ status: 'error', message: 'Missing or invalid email' }, { status: 400 });
    }
    if (!token || typeof token !== 'string' || !token.trim()) {
      console.error('Missing or invalid token in request body:', token);
      return NextResponse.json({ status: 'error', message: 'Missing or invalid token' }, { status: 400 });
    }
    // Google Apps Script endpoint for user info
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwqcmMZ938a6Oimo7hiJijUmMipLTBuiL_z-_9ApRsWnnArkfiZjO2QqbSX6g_s4VFVJA/exec';
    const res = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'get_user_info', email: email.trim(), token: token.trim() }),
    });
    const data = await res.json();
    if (data.status === 'success') {
      return NextResponse.json(data);
    } else {
      return NextResponse.json({ status: 'error', message: data.message || 'User not found' }, { status: 404 });
    }
  } catch (err: any) {
    console.error('Error in /api/user-info:', err);
    return NextResponse.json({ status: 'error', message: err.message || 'Internal server error' }, { status: 500 });
  }
}

