const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// @route   POST /api/auth/login
// @desc    Admin login
// @access  Public
router.post('/login', authController.login);

// @route   POST /api/auth/register
// @desc    Admin register (only for initial setup)
// @access  Public (should be disabled in production after first admin)
router.post('/register', authController.register);

// @route   POST /api/auth/logout
// @desc    Admin logout
// @access  Private
router.post('/logout', authController.logout);

// @route   GET /api/auth/me
// @desc    Get current admin user
// @access  Private
router.get('/me', authController.getMe);

// @route   PUT /api/auth/profile
// @desc    Update admin profile
// @access  Private
router.put('/profile', authController.updateProfile);

// @route   PUT /api/auth/change-password
// @desc    Change password
// @access  Private
router.put('/change-password', authController.changePassword);

module.exports = router;
