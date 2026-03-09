const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/admin');

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get('/users', authMiddleware, adminMiddleware, adminController.getAllUsers);

// @route   GET /api/admin/teams
// @desc    Get all teams
// @access  Private/Admin
router.get('/teams', authMiddleware, adminMiddleware, adminController.getAllTeams);

// @route   GET /api/admin/teams/:teamId
// @desc    Get team members
// @access  Private/Admin
router.get('/teams/:teamId', authMiddleware, adminMiddleware, adminController.getTeamMembers);

// @route   GET /api/admin/submissions
// @desc    Get all submissions
// @access  Private/Admin
router.get('/submissions', authMiddleware, adminMiddleware, adminController.getAllSubmissions);

// @route   GET /api/admin/download/:submissionId
// @desc    Download project file
// @access  Private/Admin
router.get('/download/:submissionId', authMiddleware, adminMiddleware, adminController.downloadProjectFile);

module.exports = router;
