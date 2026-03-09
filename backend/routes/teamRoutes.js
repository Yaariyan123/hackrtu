const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const teamController = require('../controllers/teamController');
const authMiddleware = require('../middleware/auth');

// @route   POST /api/team/create
// @desc    Create a new team
// @access  Private
router.post(
  '/create',
  authMiddleware,
  [body('teamName', 'Team name is required').trim().notEmpty()],
  teamController.createTeam
);

// @route   POST /api/team/join
// @desc    Join a team using invite code
// @access  Private
router.post(
  '/join',
  authMiddleware,
  [body('inviteCode', 'Invite code is required').trim().notEmpty()],
  teamController.joinTeam
);

// @route   GET /api/team/:teamId
// @desc    Get team details
// @access  Private
router.get('/:teamId', authMiddleware, teamController.getTeamDetails);

// @route   GET /api/team/user/:userId
// @desc    Get user's team
// @access  Private
router.get('/user/:userId', authMiddleware, teamController.getUserTeam);

module.exports = router;
