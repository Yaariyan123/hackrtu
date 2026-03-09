const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post(
  '/register',
  [
    body('name', 'Name is required').trim().notEmpty(),
    body('email', 'Valid email is required').isEmail(),
    body('mobile', 'Mobile number is required').trim().notEmpty(),
    body('gender', 'Gender is required').isIn(['Male', 'Female', 'Other']),
    body('college', 'College name is required').trim().notEmpty(),
    body('course', 'Course is required').trim().notEmpty(),
    body('graduationYear', 'Graduation year is required').toInt().isInt({ min: 2020, max: 2040 }),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  authController.register
);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post(
  '/login',
  [
    body('email', 'Valid email is required').isEmail(),
    body('password', 'Password is required').exists(),
  ],
  authController.login
);

// @route   GET /api/auth/me
// @desc    Get current logged in user
// @access  Private
router.get('/me', authMiddleware, authController.getMe);

module.exports = router;
