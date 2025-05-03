const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // adjust if needed

const router = express.Router();

// POST /api/signup
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields are required' });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(409).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Validate
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
      }
  
      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password." });
      }
  
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password." });
      }
  
      // Success response
      return res.status(200).json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        },
        message: "Login successful"
      });
    } catch (error) {
      console.error("Login error:", error.message);
      return res.status(500).json({ message: "Server error. Please try again later." });
    }
  });

module.exports = router;
