import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import streamifier from 'streamifier';

// Multer memory storage
const storage = multer.memoryStorage();
export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB max
  }
});

// @desc    Upload file to Cloudinary
// @route   POST /api/upload
// @access  Private
export const uploadFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const fileBuffer = req.file.buffer;
  
  // Determine if it's an image or raw file (like PDF)
  let resourceType = 'auto';
  if (req.file.mimetype.includes('pdf') || req.file.mimetype.includes('document')) {
    resourceType = 'raw';
  }

  const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
      const cld_upload_stream = cloudinary.uploader.upload_stream(
        {
          folder: 'portfolio',
          resource_type: resourceType
        },
        (error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        }
      );
      streamifier.createReadStream(buffer).pipe(cld_upload_stream);
    });
  };

  try {
    const result = await uploadToCloudinary(fileBuffer);
    res.json({
      message: 'File uploaded successfully',
      url: result.secure_url,
      format: result.format,
      type: result.resource_type
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading to Cloudinary' });
  }
});
