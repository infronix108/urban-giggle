import { NextResponse } from 'next/server'

// Replace with your Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwqcmMZ938a6Oimo7hiJijUmMipLTBuiL_z-_9ApRsWnnArkfiZjO2QqbSX6g_s4VFVJA/exec'

interface LoginRequest {
  action: 'send_otp' | 'verify_otp'
  email: string
  otp?: string
}

export async function POST(request: Request) {
  try {
    const { action, email, otp } = await request.json() as LoginRequest;

    // Validate required fields
    if (!action || !email) {
      return NextResponse.json({
        error: 'Missing required fields',
        status: 'error'
      }, { status: 400 });
    }

    // Forward request to Google Apps Script
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action, email, otp }),
    });

    const data = await response.json();

    // Pass through the response from Google Apps Script
    if (data.status === 'error') {
      return NextResponse.json(data, { status: 400 });
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({
      error: 'Internal server error',
      status: 'error'
    }, { status: 500 });
  }
}
