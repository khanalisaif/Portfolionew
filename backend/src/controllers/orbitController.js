import OrbitCard from '../models/OrbitCard.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// @desc    Get all orbit cards
// @route   GET /api/orbit
// @access  Public
export const getOrbitCards = asyncHandler(async (req, res) => {
  const cards = await OrbitCard.find().sort({ order: 1 });
  res.json(cards);
});

// @desc    Update orbit cards (replace all)
// @route   PUT /api/orbit
// @access  Private
export const updateOrbitCards = asyncHandler(async (req, res) => {
  const cardsData = req.body; // Expecting an array

  if (!Array.isArray(cardsData)) {
    return res.status(400).json({ message: 'Expected an array of cards' });
  }

  // Clear existing
  await OrbitCard.deleteMany({});
  
  // Insert new
  const cards = await OrbitCard.insertMany(cardsData);

  res.json(cards);
});
