const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { upload, cloudinary } = require('../config/cloudinary');
const { protect } = require('../middleware/authMiddleware');

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: 1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const handleUpload = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error('Multer error:', err.message);
      return res.status(400).json({ message: 'Image upload failed: ' + err.message });
    }
    next();
  });
};

// Create new project
router.post('/', protect, handleUpload, async (req, res) => {
  try {
    const { title, category, branding, industry, location, year, description, tags, existingImage, contentBlocks } = req.body;
    let image = existingImage || '';
    let cloudinary_id = '';
    
    if (req.file) {
      image = req.file.path;
      cloudinary_id = req.file.filename;
    }

    const parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
    const parsedContentBlocks = contentBlocks ? (typeof contentBlocks === 'string' ? JSON.parse(contentBlocks) : contentBlocks) : [];

    const newProject = new Project({
      title, category, branding, industry, location, year, description, tags: parsedTags || [],
      image, cloudinary_id,
      contentBlocks: parsedContentBlocks
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error("POST PROJECT ERROR:", error);
    require('fs').appendFileSync('error.log', error.message + '\n' + (error.stack || '') + '\n');
    res.status(400).json({ message: error.message });
  }
});

// Update project
router.put('/:id', protect, handleUpload, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const { title, category, branding, industry, location, year, description, tags, contentBlocks } = req.body;
    
    if (title) project.title = title;
    if (category) project.category = category;
    if (branding !== undefined) project.branding = branding;
    if (industry !== undefined) project.industry = industry;
    if (location !== undefined) project.location = location;
    if (year) project.year = year;
    if (description) project.description = description;
    
    if (tags) {
      project.tags = typeof tags === 'string' ? JSON.parse(tags) : tags;
    }
    
    if (contentBlocks) {
      project.contentBlocks = typeof contentBlocks === 'string' ? JSON.parse(contentBlocks) : contentBlocks;
    }

    if (req.file) {
      if (project.cloudinary_id) {
        await cloudinary.uploader.destroy(project.cloudinary_id);
      }
      project.image = req.file.path;
      project.cloudinary_id = req.file.filename;
    }

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    console.error("PUT PROJECT ERROR:", error);
    require('fs').appendFileSync('error.log', error.message + '\n' + (error.stack || '') + '\n');
    res.status(400).json({ message: error.message });
  }
});

// Delete project
router.delete('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (project.cloudinary_id) {
      await cloudinary.uploader.destroy(project.cloudinary_id);
    }
    
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
