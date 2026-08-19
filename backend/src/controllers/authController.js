import bcrypt from 'bcrypt';
import Admin from '../models/Admin.model.js';
import { generateOtp } from '../utils/generateOtp.js';
import { generateToken } from '../utils/generateToken.js';
import { sendOtpEmail } from '../services/email.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { config } from '../config/env.js';

// @desc    Request OTP for Admin Login
// @route   POST /api/auth/request-otp
// @access  Public
export const requestOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!config.adminEmails.includes(email)) {
    return res.status(401).json({ message: 'Unauthorized email address' });
  }

  let admin = await Admin.findOne({ email });
  
  if (!admin) {
    // Auto-create admin if it doesn't exist and matches config.adminEmails
    admin = await Admin.create({ email });
  }

  const otp = generateOtp();
  const salt = await bcrypt.genSalt(10);
  const otpHash = await bcrypt.hash(otp, salt);
  
  // OTP valid for 10 minutes
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

  admin.otpHash = otpHash;
  admin.otpExpiry = otpExpiry;
  await admin.save();

  const emailSent = await sendOtpEmail(email, otp);

  if (emailSent) {
    res.json({ message: 'OTP sent successfully to your email' });
  } else {
    res.status(500).json({ message: 'Error sending OTP email' });
  }
});

// @desc    Verify OTP and Login
// @route   POST /api/auth/verify-otp
// @access  Public
export const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await admin.verifyOtp(otp))) {
    // Clear OTP after successful verification
    admin.otpHash = null;
    admin.otpExpiry = null;
    await admin.save();

    res.json({
      _id: admin._id,
      email: admin.email,
      token: generateToken(admin._id)
    });
  } else {
    res.status(401).json({ message: 'Invalid or expired OTP' });
  }
});

// @desc    Get Admin Profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.admin._id).select('-otpHash -otpExpiry');
  if (admin) {
    res.json(admin);
  } else {
    res.status(404).json({ message: 'Admin not found' });
  }
});
