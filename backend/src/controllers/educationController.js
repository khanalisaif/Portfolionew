import Education from '../models/Education.model.js';
import AllEducation from '../models/AllEducation.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// @desc    Get education section data
// @route   GET /api/education
// @access  Public
export const getEducation = asyncHandler(async (req, res) => {
  let education = await Education.findOne();
  if (!education) {
    education = await Education.create({});
  }
  res.json(education);
});

// @desc    Update education section data
// @route   PUT /api/education
// @access  Private
export const updateEducation = asyncHandler(async (req, res) => {
  let education = await Education.findOne();
  
  if (!education) {
    education = await Education.create(req.body);
  } else {
    education = await Education.findOneAndUpdate({}, req.body, { new: true });
  }

  res.json(education);
});

// @desc    Get all education data
// @route   GET /api/education/all
// @access  Public
export const getAllEducation = asyncHandler(async (req, res) => {
  const allEducation = await AllEducation.find().sort({ createdAt: -1 });
  res.json(allEducation);
});

// @desc    Update all education data
// @route   PUT /api/education/all
// @access  Private
export const updateAllEducation = asyncHandler(async (req, res) => {
  const items = req.body;

  if (!Array.isArray(items)) {
    return res.status(400).json({ message: 'Expected an array' });
  }

  await AllEducation.deleteMany({});
  const allEducation = await AllEducation.insertMany(items);

  res.json(allEducation);
});
