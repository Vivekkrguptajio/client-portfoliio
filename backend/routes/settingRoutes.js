const express = require('express');
const router = express.Router();
const Setting = require('../models/Setting');
const { protect } = require('../middleware/authMiddleware');

router.get('/:key', async (req, res) => {
  try {
    const setting = await Setting.findOne({ key: req.params.key });
    if (!setting) {
      return res.status(404).json({ message: 'Setting not found' });
    }
    res.json(setting.value);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:key', protect, async (req, res) => {
  try {
    const setting = await Setting.findOneAndUpdate(
      { key: req.params.key },
      { value: req.body },
      { new: true, upsert: true }
    );
    res.json(setting.value);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
