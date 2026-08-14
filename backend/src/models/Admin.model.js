import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  otpHash: {
    type: String,
    default: null
  },
  otpExpiry: {
    type: Date,
    default: null
  }
}, { timestamps: true });

// Method to verify OTP
adminSchema.methods.verifyOtp = async function(enteredOtp) {
  if (!this.otpHash || !this.otpExpiry || Date.now() > this.otpExpiry.getTime()) {
    return false;
  }
  return await bcrypt.compare(enteredOtp, this.otpHash);
};

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
