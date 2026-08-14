import About from '../models/About.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// @desc    Get about section data
// @route   GET /api/about
// @access  Public
export const getAbout = asyncHandler(async (req, res) => {
  let about = await About.findOne();
  if (!about) {
    about = await About.create({});
  }
  res.json(about);
});

// @desc    Update about section data
// @route   PUT /api/about
// @access  Private
export const updateAbout = asyncHandler(async (req, res) => {
  let about = await About.findOne();
  
  if (!about) {
    about = await About.create(req.body);
  } else {
    about = await About.findOneAndUpdate({}, req.body, { new: true });
  }

  res.json(about);
});
