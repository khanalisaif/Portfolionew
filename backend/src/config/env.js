import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI,
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET
  },
  email: {
    user: process.env.SES_SMTP_USER,
    pass: process.env.SES_SMTP_PASS,
    from: process.env.FROM_EMAIL
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'portfolio_super_secret_key_2024',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  },
  adminEmail: process.env.ADMIN_EMAIL,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173'
};
