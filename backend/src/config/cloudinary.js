const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'portfolio',
    allowedFormats: ['jpeg', 'png', 'jpg', 'webp', 'gif', 'svg', 'avif', 'bmp', 'tiff', 'heic', 'heif', 'ico'],
  },
});

const upload = multer({ 
  storage: storage,
  limits: { fieldSize: 50 * 1024 * 1024 } // 50MB limit for large base64 text fields
});

module.exports = { cloudinary, upload };
