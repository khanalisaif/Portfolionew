import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Route imports
import authRoute from './routes/authRoute.js';
import profileRoute from './routes/profileRoute.js';
import orbitRoute from './routes/orbitRoute.js';
import educationRoute from './routes/educationRoute.js';
import skillsRoute from './routes/skillsRoute.js';
import projectRoute from './routes/projectRoute.js';
import networkRoute from './routes/networkRoute.js';
import certificatesRoute from './routes/certificatesRoute.js';
import experienceRoute from './routes/experienceRoute.js';
import aboutRoute from './routes/aboutRoute.js';
import uploadRoute from './routes/uploadRoute.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security Headers
app.use(helmet());

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000 // limit each IP to 1000 requests per windowMs
});
app.use('/api/', apiLimiter);

// Routes
app.use('/api/auth', authRoute);
app.use('/api/profile', profileRoute);
app.use('/api/orbit', orbitRoute);
app.use('/api/education', educationRoute);
app.use('/api/skills', skillsRoute);
app.use('/api/projects', projectRoute);
app.use('/api/network', networkRoute);
app.use('/api/certificates', certificatesRoute);
app.use('/api/experience', experienceRoute);
app.use('/api/about', aboutRoute);
app.use('/api/upload', uploadRoute);

// Basic Route for root
app.get('/', (req, res) => {
  res.send('Portfolio Backend API is running...');
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

export default app;
