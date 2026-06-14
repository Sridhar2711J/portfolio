import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate request
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields." },
        { status: 400 }
      );
    }

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      return NextResponse.json(
        { error: "SMTP credentials are not configured on the server." },
        { status: 500 }
      );
    }

    // Configure Nodemailer Transporter for Gmail
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for port 465
      auth: {
        user: smtpUser,
        pass: smtpPass.replace(/"/g, ""), // Remove quotes if present
      },
    });

    // Format local time
    const currentDateTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    // HTML Email Template utilizing the primary theme color (#13b593)
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Portfolio Message</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f8fafc;
            color: #1e293b;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            border: 1px solid #e2e8f0;
          }
          .header {
            background-color: #13b593;
            color: #ffffff;
            padding: 30px;
            text-align: center;
          }
          .header h2 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
          }
          .content {
            padding: 30px;
          }
          .details-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 25px;
          }
          .details-table td {
            padding: 12px;
            border-bottom: 1px solid #f1f5f9;
          }
          .label {
            font-weight: 700;
            color: #64748b;
            width: 120px;
          }
          .value {
            color: #0f172a;
          }
          .message-box {
            background-color: #f8fafc;
            border-left: 4px solid #13b593;
            border-radius: 8px;
            padding: 20px;
            font-size: 15px;
            line-height: 1.6;
            color: #334155;
            white-space: pre-wrap;
          }
          .footer {
            background-color: #f8fafc;
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #94a3b8;
            border-top: 1px solid #e2e8f0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Form Submission</h2>
          </div>
          <div class="content">
            <table class="details-table">
              <tr>
                <td class="label">Sender Name</td>
                <td class="value">${name}</td>
              </tr>
              <tr>
                <td class="label">Sender Email</td>
                <td class="value">
                  <a href="mailto:${email}" style="color: #13b593; text-decoration: none; font-weight: 600;">${email}</a>
                </td>
              </tr>
              <tr>
                <td class="label">Received At</td>
                <td class="value">${currentDateTime} (IST)</td>
              </tr>
            </table>
            
            <div style="font-weight: 700; margin-bottom: 10px; color: #1e293b;">Message Content:</div>
            <div class="message-box">${message}</div>
          </div>
          <div class="footer">
            Sent automatically via Sridhar J's Next.js Developer Portfolio website.
          </div>
        </div>
      </body>
      </html>
    `;

    // Email Options
    const mailOptions = {
      from: `"${name} (Portfolio)" <${smtpUser}>`, // Send as current user, from SMTP user to prevent SPF/DKIM validation failures
      to: smtpUser, // Send to yourself
      replyTo: email, // Reply-to should go to the sender's email
      subject: `New Portfolio Message from ${name}`,
      text: `New message from ${name} (${email}):\n\n${message}`,
      html: htmlContent,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent successfully!" });
  } catch (error: any) {
    console.error("Nodemailer Error: ", error);
    return NextResponse.json(
      { error: "Failed to send email message: " + error.message },
      { status: 500 }
    );
  }
}
