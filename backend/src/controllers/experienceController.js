import Experience from '../models/Experience.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// @desc    Get experience section data
// @route   GET /api/experience
// @access  Public
export const getExperience = asyncHandler(async (req, res) => {
  let experience = await Experience.findOne();
  if (!experience) {
    experience = await Experience.create({});
  }
  res.json(experience);
});

// @desc    Update experience section data
// @route   PUT /api/experience
// @access  Private
export const updateExperience = asyncHandler(async (req, res) => {
  let experience = await Experience.findOne();
  
  if (!experience) {
    experience = await Experience.create(req.body);
  } else {
    experience = await Experience.findOneAndUpdate({}, req.body, { new: true });
  }

  res.json(experience);
});
