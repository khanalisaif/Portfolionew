import express from 'express';
import { 
  getSkills, updateSkills, 
  getAllSkillsCategories, updateAllSkillsCategories,
  getAllSkillsDetailed, updateAllSkillsDetailed
} from '../controllers/skillsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getSkills)
  .put(protect, updateSkills);

router.route('/categories')
  .get(getAllSkillsCategories)
  .put(protect, updateAllSkillsCategories);

router.route('/detailed')
  .get(getAllSkillsDetailed)
  .put(protect, updateAllSkillsDetailed);

export default router;
