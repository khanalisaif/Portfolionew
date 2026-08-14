import Certificates from '../models/Certificates.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// @desc    Get certificates section data
// @route   GET /api/certificates
// @access  Public
export const getCertificates = asyncHandler(async (req, res) => {
  let certificates = await Certificates.findOne();
  if (!certificates) {
    certificates = await Certificates.create({});
  }
  res.json(certificates);
});

// @desc    Update certificates section data
// @route   PUT /api/certificates
// @access  Private
export const updateCertificates = asyncHandler(async (req, res) => {
  let certificates = await Certificates.findOne();
  
  if (!certificates) {
    certificates = await Certificates.create(req.body);
  } else {
    certificates = await Certificates.findOneAndUpdate({}, req.body, { new: true });
  }

  res.json(certificates);
});
