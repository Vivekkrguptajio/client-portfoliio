const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
  const { password } = req.body;

  if (!process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET) {
    return res.status(500).json({ message: 'Server auth configuration missing' });
  }

  if (password.trim() === process.env.ADMIN_PASSWORD.trim()) {
    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET.trim(), {
      expiresIn: '30d',
    });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid admin password' });
  }
});

module.exports = router;
