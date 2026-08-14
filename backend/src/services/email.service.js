import nodemailer from 'nodemailer';
import { config } from '../config/env.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.email.user,
    pass: config.email.pass
  }
});

export const sendOtpEmail = async (to, otp) => {
  const mailOptions = {
    from: config.email.from,
    to,
    subject: 'Your Admin Login OTP - Portfolio',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #4f46e5; text-align: center;">Portfolio Admin Access</h2>
        <p style="color: #374151; font-size: 16px;">Hello Admin,</p>
        <p style="color: #374151; font-size: 16px;">You requested to login to the admin panel. Here is your One-Time Password (OTP):</p>
        <div style="text-align: center; margin: 30px 0;">
          <span style="background-color: #f3f4f6; color: #1f2937; padding: 12px 24px; font-size: 24px; font-weight: bold; letter-spacing: 4px; border-radius: 6px;">${otp}</span>
        </div>
        <p style="color: #6b7280; font-size: 14px; text-align: center;">This code will expire in 10 minutes.</p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <p style="color: #9ca3af; font-size: 12px; text-align: center;">If you did not request this, please ignore this email.</p>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('OTP Email sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return false;
  }
};
