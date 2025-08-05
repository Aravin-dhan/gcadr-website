import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const university = formData.get('university') as string
    const course = formData.get('course') as string
    const year = formData.get('year') as string
    const proposedStartDate = formData.get('proposedStartDate') as string
    const proposedEndDate = formData.get('proposedEndDate') as string
    const interestLetter = formData.get('interestLetter') as string
    const cv = formData.get('cv') as File
    const writingSample = formData.get('writingSample') as File

    // Basic validation
    if (!name || !email || !university || !course || !year || !proposedStartDate || !proposedEndDate || !interestLetter) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!cv || !writingSample) {
      return NextResponse.json(
        { error: 'CV and Writing Sample are required' },
        { status: 400 }
      )
    }

    // Here you would typically:
    // 1. Save files to storage (AWS S3, Google Cloud Storage, etc.)
    // 2. Save application data to database
    // 3. Send confirmation email to applicant
    // 4. Send notification email to GCADR team
    
    // For now, we'll just log the submission
    console.log('Internship application submission:', {
      name,
      email,
      phone,
      university,
      course,
      year,
      proposedStartDate,
      proposedEndDate,
      interestLetter: interestLetter.substring(0, 100) + '...',
      cvName: cv.name,
      cvSize: cv.size,
      writingSampleName: writingSample.name,
      writingSampleSize: writingSample.size,
      timestamp: new Date().toISOString(),
    })

    // In a real implementation, you might:
    // - Use multer or similar for file handling
    // - Store files in cloud storage
    // - Save application data to database with Prisma
    // - Send emails with Nodemailer/SendGrid
    // - Generate application reference number

    return NextResponse.json(
      { 
        message: 'Internship application submitted successfully',
        referenceNumber: `GCADR-${Date.now()}` // Simple reference number
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing internship application:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
