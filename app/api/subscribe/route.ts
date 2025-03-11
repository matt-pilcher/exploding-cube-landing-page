import { NextResponse } from 'next/server'

// This API route handles the email capture field on the main landing page. 
export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    // Mock successful API response
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay

    // Mock response
    return NextResponse.json({ 
      success: true, 
      message: 'Successfully subscribed',
      data: { email } 
    })

  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}