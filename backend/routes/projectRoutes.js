const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   POST /api/project/submit
// @desc    Submit project
// @access  Private
router.post(
  '/submit',
  authMiddleware,
  upload.single('projectFile'),
  projectController.submitProject
);

// @route   GET /api/project/status/:teamId
// @desc    Get submission status for a team
// @access  Private
router.get('/status/:teamId', authMiddleware, projectController.getSubmissionStatus);

module.exports = router;
