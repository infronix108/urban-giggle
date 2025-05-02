import { NextResponse } from 'next/server'

// Replace this URL with your Google Apps Script Web App URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyYTtuvdPpopPoFYGMCyd4plRPcLY1XWlrQm7PY3yt2X88kFVvN4n45iMVdVELUzZSD/exec'

export async function POST(request: Request) {
  try {
    const { name, number, company, sourceComponent } = await request.json();

    console.log('Incoming request data:', { name, number, company, sourceComponent });

    // Validate required fields
    if (!name || !number || !company) {
      return NextResponse.json({
        error: 'Missing required fields',
        status: 'error'
      }, { status: 400 });
    }

    // Validate phone number format
    const phoneRegex = /^\d{10}$/
    if (!phoneRegex.test(number)) {
      return NextResponse.json({
        error: 'Invalid phone number format',
        status: 'error'
      }, { status: 400 });
    }

    // Set formattedCompany based on request source
    const formattedCompany = sourceComponent === 'About' ? `inf_${company}` : company;

    // Get current date and time
    const date = new Date()
    const localDate = date.toISOString().split("T")[0] // YYYY-MM-DD
    const localTime = date.toTimeString().split(" ")[0] // HH:MM:SS

    // Send data to Google Apps Script
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        number,
        company: formattedCompany,
        date: localDate,
        time: localTime,
        source : sourceComponent === 'About' ? 'About' : 'Other',
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data.status !== 'success') {
      throw new Error('Failed to save to sheet')
    }

    return NextResponse.json({
      status: 'success',
      message: 'We will contact you back soon',
      data: { id: data.id }
    })

  } catch (error) {
    console.error('Failed to save customer data:', error)
    return NextResponse.json({
      error: 'Failed to save customer data. Please check your information and try again.',
      status: 'error'
    }, { status: 500 })
  }
}
