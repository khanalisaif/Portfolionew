import Skills from '../models/Skills.model.js';
import AllSkillsCategory from '../models/AllSkillsCategory.model.js';
import AllSkillsDetailed from '../models/AllSkillsDetailed.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// @desc    Get skills data
// @route   GET /api/skills
// @access  Public
export const getSkills = asyncHandler(async (req, res) => {
  let skills = await Skills.findOne();
  if (!skills) {
    skills = await Skills.create({});
  }
  res.json(skills);
});

// @desc    Update skills data
// @route   PUT /api/skills
// @access  Private
export const updateSkills = asyncHandler(async (req, res) => {
  let skills = await Skills.findOne();
  
  if (!skills) {
    skills = await Skills.create(req.body);
  } else {
    skills = await Skills.findOneAndUpdate({}, req.body, { new: true });
  }

  res.json(skills);
});

// @desc    Get all skills categories
// @route   GET /api/skills/categories
// @access  Public
export const getAllSkillsCategories = asyncHandler(async (req, res) => {
  const categories = await AllSkillsCategory.find();
  res.json(categories);
});

// @desc    Update all skills categories
// @route   PUT /api/skills/categories
// @access  Private
export const updateAllSkillsCategories = asyncHandler(async (req, res) => {
  const items = req.body;
  if (!Array.isArray(items)) return res.status(400).json({ message: 'Expected an array' });

  await AllSkillsCategory.deleteMany({});
  const categories = await AllSkillsCategory.insertMany(items);
  res.json(categories);
});

// @desc    Get all skills detailed
// @route   GET /api/skills/detailed
// @access  Public
export const getAllSkillsDetailed = asyncHandler(async (req, res) => {
  const detailed = await AllSkillsDetailed.find();
  
  // Transform to the object map format expected by frontend
  const result = {};
  detailed.forEach(item => {
    result[item.skillId] = item;
  });
  
  res.json(result);
});

// @desc    Update all skills detailed
// @route   PUT /api/skills/detailed
// @access  Private
export const updateAllSkillsDetailed = asyncHandler(async (req, res) => {
  const data = req.body; // Expecting an object where keys are skillId
  
  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    return res.status(400).json({ message: 'Expected an object map' });
  }

  const insertData = Object.keys(data).map(key => ({
    skillId: key,
    ...data[key]
  }));

  await AllSkillsDetailed.deleteMany({});
  const detailed = await AllSkillsDetailed.insertMany(insertData);

  // Return mapped object
  const result = {};
  detailed.forEach(item => {
    result[item.skillId] = item;
  });
  
  res.json(result);
});
