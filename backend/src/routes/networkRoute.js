import express from 'express';
import { getNetwork, updateNetwork } from '../controllers/networkController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getNetwork)
  .put(protect, updateNetwork);

export default router;
