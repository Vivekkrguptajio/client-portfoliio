const express = require('express');
const router = express.Router();
const { upload } = require('../config/cloudinary');
const { protect } = require('../middleware/authMiddleware');

const handleUpload = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error('Multer error:', err.message);
      return res.status(400).json({ message: 'Image upload failed: ' + err.message });
    }
    next();
  });
};

// Upload single image for content block builder
router.post('/', protect, handleUpload, (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    // Return the Cloudinary URL and ID
    res.json({ url: req.file.path, cloudinary_id: req.file.filename });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
