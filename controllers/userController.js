// userController.js
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');

exports.registerUser = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);

    if (!req.file) return res.status(400).send('Resume file is required');
    
    const { fullname, email, mobilenumber, skills, password } = req.body;
        // Regular expression for email validation
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
          return res.status(400).send('Please use a valid email address');
        }
    
        // Regular expression for mobile number validation (10 digits only)
        const mobileRegex = /^[0-9]{10}$/;
        if (!mobileRegex.test(mobilenumber)) {
          return res.status(400).send('Mobile number must contain exactly 10 digits');
        }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      fullname,
      email,
      mobilenumber,
      skills,
      password: hashedPassword,
      resume: req.file.path
    });

    await user.save();
    res.status(201).send(user);
  } catch (err) {
    console.error('Error during user registration:', err); // Log detailed error
    res.status(500).send({ error: err.message || 'Something went wrong!' });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).send('Invalid credentials');

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) return res.status(401).send('Invalid credentials');

    const secretKey = process.env.JWT_SECRET || 'default_secret_key';
    const token = jwt.sign({ id: user._id, role: user.role }, secretKey, { expiresIn: '1h' });

    console.log('Generated token for user:', token); // Log the token
    res.status(200).send({ user: { id: user._id, fullname: user.fullname, email: user.email }, token });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).send({ error: err.message || 'Something went wrong!' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    console.log('Fetching profile for user ID:', req.user.id); // Log user ID

    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      console.error('User not found for ID:', req.user.id);
      return res.status(404).send('User not found');
    }

    console.log('User profile fetched:', user); // Log fetched user
    res.status(200).send(user);
  } catch (err) {
    console.error('Error fetching profile:', err.message);
    res.status(500).send({ error: err.message || 'Something went wrong!' });
  }
};

// Update the user's profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from the JWT token
    const { fullname, email, mobilenumber, skills, password } = req.body;

    // Validation for email and mobile number
    const emailRegex = /\S+@\S+\.\S+/;
    if (email && !emailRegex.test(email)) {
      return res.status(400).send('Please use a valid email address');
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (mobilenumber && !mobileRegex.test(mobilenumber)) {
      return res.status(400).send('Mobile number must contain exactly 10 digits');
    }

    // Hash the password if it's provided
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Find the user by ID and update their profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fullname,
        email,
        mobilenumber,
        skills,
        password: hashedPassword || undefined, // Only update password if provided
      },
      { new: true }
    ).select('-password'); // Exclude the password from the response

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    res.status(200).send(updatedUser); // Return the updated user profile
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).send({ error: err.message || 'Something went wrong!' });
  }
};