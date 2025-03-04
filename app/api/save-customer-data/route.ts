import { NextResponse } from 'next/server'

// Replace this URL with your Google Apps Script Web App URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyYTtuvdPpopPoFYGMCyd4plRPcLY1XWlrQm7PY3yt2X88kFVvN4n45iMVdVELUzZSD/exec'

export async function POST(request: Request) {
  try {
    const { name, number, company } = await request.json()

    // Validate required fields
    if (!name || !number || !company) {
      return NextResponse.json({
        error: 'Missing required fields',
        status: 'error'
      }, { status: 400 })
    }

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
        company,
        date: localDate,
        time: localTime
      })
    })

    const data = await response.json()

    if (data.status !== 'success') {
      throw new Error('Failed to save to sheet')
    }

    return NextResponse.json({
      status: 'success',
      data: { id: data.id }
    })

  } catch (error) {
    console.error('Failed to save customer data:', error)
    return NextResponse.json({
      error: 'Failed to save customer data',
      status: 'error'
    }, { status: 500 })
  }
}
