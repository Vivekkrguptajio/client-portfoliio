const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  branding: { type: String },
  industry: { type: String },
  location: { type: String },
  year: { type: String },
  description: { type: String, required: true },
  tags: [{ type: String }],
  image: { type: String }, // Cloudinary URL
  cloudinary_id: { type: String }, // For deletion
  contentBlocks: [{
    type: { type: String, enum: ['text', 'image', 'youtube'] },
    content: { type: String }
  }],
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
