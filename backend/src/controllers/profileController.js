import Profile from '../models/Profile.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// @desc    Get profile data
// @route   GET /api/profile
// @access  Public
export const getProfile = asyncHandler(async (req, res) => {
  let profile = await Profile.findOne();
  if (!profile) {
    profile = await Profile.create({});
  }
  res.json(profile);
});

// @desc    Update profile data
// @route   PUT /api/profile
// @access  Private
export const updateProfile = asyncHandler(async (req, res) => {
  let profile = await Profile.findOne();
  
  if (!profile) {
    profile = await Profile.create(req.body);
  } else {
    profile = await Profile.findOneAndUpdate({}, req.body, { new: true });
  }

  res.json(profile);
});
