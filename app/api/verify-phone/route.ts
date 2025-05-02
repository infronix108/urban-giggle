import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { phone } = await request.json()
    
    // Basic validation for Indian mobile numbers
    // Validates numbers starting with 6, 7, 8, or 9 and having 10 digits
    const indianPhoneRegex = /^[6-9]\d{9}$/
    const isValid = indianPhoneRegex.test(phone)
    
    if (isValid) {
      return NextResponse.json({ 
        valid: true, 
        message: 'Phone number verified successfully' 
      })
    } else {
      return NextResponse.json({ 
        valid: false, 
        message: 'Please enter a valid Indian mobile number' 
      }, { 
        status: 400 
      })
    }
  } catch (error) {
    return NextResponse.json({ 
      valid: false, 
      message: 'Verification failed. Please try again.' 
    }, { 
      status: 500 
    })
  }
}
