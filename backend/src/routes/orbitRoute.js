import express from 'express';
import { getOrbitCards, updateOrbitCards } from '../controllers/orbitController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getOrbitCards)
  .put(protect, updateOrbitCards);

export default router;
