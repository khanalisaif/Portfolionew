import express from 'express';
import { 
  getProjects, updateProjects, 
  getProjectDetails, updateProjectDetails,
  getProjectsPage, updateProjectsPage
} from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getProjects)
  .put(protect, updateProjects);

router.route('/details')
  .get(getProjectDetails)
  .put(protect, updateProjectDetails);

router.route('/page')
  .get(getProjectsPage)
  .put(protect, updateProjectsPage);

export default router;
