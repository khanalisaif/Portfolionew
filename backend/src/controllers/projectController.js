import Project from '../models/Project.model.js';
import ProjectDetails from '../models/ProjectDetails.model.js';
import ProjectsPage from '../models/ProjectsPage.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// --- Projects (List) ---

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().sort({ order: 1 });
  res.json(projects);
});

// @desc    Update projects (replace all)
// @route   PUT /api/projects
// @access  Private
export const updateProjects = asyncHandler(async (req, res) => {
  const items = req.body;
  if (!Array.isArray(items)) return res.status(400).json({ message: 'Expected an array' });

  await Project.deleteMany({});
  const projects = await Project.insertMany(items);
  res.json(projects);
});

// --- Project Details ---

// @desc    Get all project details
// @route   GET /api/projects/details
// @access  Public
export const getProjectDetails = asyncHandler(async (req, res) => {
  const details = await ProjectDetails.find();
  
  const result = {};
  details.forEach(item => {
    result[item.projectId] = item;
  });
  
  res.json(result);
});

// @desc    Update all project details
// @route   PUT /api/projects/details
// @access  Private
export const updateProjectDetails = asyncHandler(async (req, res) => {
  const data = req.body;
  
  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    return res.status(400).json({ message: 'Expected an object map' });
  }

  const insertData = Object.keys(data).map(key => ({
    projectId: key,
    ...data[key]
  }));

  await ProjectDetails.deleteMany({});
  const details = await ProjectDetails.insertMany(insertData);

  const result = {};
  details.forEach(item => {
    result[item.projectId] = item;
  });
  
  res.json(result);
});

// --- Projects Page Info ---

// @desc    Get projects page info
// @route   GET /api/projects/page
// @access  Public
export const getProjectsPage = asyncHandler(async (req, res) => {
  let page = await ProjectsPage.findOne();
  if (!page) {
    page = await ProjectsPage.create({});
  }
  res.json(page);
});

// @desc    Update projects page info
// @route   PUT /api/projects/page
// @access  Private
export const updateProjectsPage = asyncHandler(async (req, res) => {
  let page = await ProjectsPage.findOne();
  
  if (!page) {
    page = await ProjectsPage.create(req.body);
  } else {
    page = await ProjectsPage.findOneAndUpdate({}, req.body, { new: true });
  }

  res.json(page);
});
