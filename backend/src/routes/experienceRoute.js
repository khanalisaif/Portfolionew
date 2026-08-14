import express from 'express';
import { getExperience, updateExperience } from '../controllers/experienceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getExperience)
  .put(protect, updateExperience);

export default router;
