import express from 'express';
import { getCertificates, updateCertificates } from '../controllers/certificatesController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getCertificates)
  .put(protect, updateCertificates);

export default router;
