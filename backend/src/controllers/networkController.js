import Network from '../models/Network.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// @desc    Get network section data
// @route   GET /api/network
// @access  Public
export const getNetwork = asyncHandler(async (req, res) => {
  let network = await Network.findOne();
  if (!network) {
    network = await Network.create({});
  }
  res.json(network);
});

// @desc    Update network section data
// @route   PUT /api/network
// @access  Private
export const updateNetwork = asyncHandler(async (req, res) => {
  let network = await Network.findOne();
  
  if (!network) {
    network = await Network.create(req.body);
  } else {
    network = await Network.findOneAndUpdate({}, req.body, { new: true });
  }

  res.json(network);
});
