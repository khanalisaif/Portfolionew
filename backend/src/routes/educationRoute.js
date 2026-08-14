import express from 'express';
import { getEducation, updateEducation, getAllEducation, updateAllEducation } from '../controllers/educationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getEducation)
  .put(protect, updateEducation);

router.route('/all')
  .get(getAllEducation)
  .put(protect, updateAllEducation);

export default router;
