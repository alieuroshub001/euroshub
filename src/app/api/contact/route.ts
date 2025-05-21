import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Read environment variables
const EMAIL_SERVICE = process.env.EMAIL_SERVICE || 'gmail';
const EMAIL_USERNAME = process.env.EMAIL_USERNAME || 'ali.rayyan001@gmail.com';
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || 'egjiherhpokyifeq';
const EMAIL_FROM = process.env.EMAIL_FROM || 'ali.rayyan001@gmail.com';

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: EMAIL_SERVICE,
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, email, subject, message } = body;
    
    // Validate input data
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create email options
    const mailOptions = {
      from: {
        name: `${name} via EurosHub Website`,
        address: EMAIL_FROM
      },
      to: EMAIL_USERNAME,
      subject: `EurosHub Contact Form: ${subject}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #17b6b2; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #f7f7f7; border-left: 4px solid #17b6b2;">
            <h3 style="margin-top: 0;">Message:</h3>
            <p style="white-space: pre-line;">${message}</p>
          </div>
          <p style="color: #777; font-size: 12px; margin-top: 30px;">This email was sent from the EurosHub website contact form.</p>
        </div>
      `,
    };
    
    // Send the email
    await transporter.sendMail(mailOptions);
    
    // Return success response
    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Return error response
    return NextResponse.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    );
  }
}