const User = require('../models/User');
const Team = require('../models/Team');
const Submission = require('../models/Submission');
const path = require('path');
const fs = require('fs');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all teams
// @route   GET /api/admin/teams
// @access  Private/Admin
exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find()
      .populate('leaderId', 'name email college')
      .populate('members', 'name email college');

    const teamData = teams.map((team) => ({
      id: team._id,
      teamName: team.teamName,
      leaderId: team.leaderId,
      members: team.members,
      memberCount: team.members.length,
      maxSize: team.maxSize,
      inviteCode: team.inviteCode,
      college: team.college,
      createdAt: team.createdAt,
    }));

    res.status(200).json({
      success: true,
      count: teamData.length,
      data: teamData,
    });
  } catch (error) {
    console.error('Get teams error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get team members
// @route   GET /api/admin/teams/:teamId
// @access  Private/Admin
exports.getTeamMembers = async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId)
      .populate('members', 'name email college course graduationYear')
      .populate('leaderId', 'name email college');

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    res.status(200).json({
      success: true,
      team: {
        id: team._id,
        teamName: team.teamName,
        leaderId: team.leaderId,
        members: team.members,
        memberCount: team.members.length,
        college: team.college,
      },
    });
  } catch (error) {
    console.error('Get team members error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all submissions
// @route   GET /api/admin/submissions
// @access  Private/Admin
exports.getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate('teamId', 'teamName')
      .populate('submittedBy', 'name email');

    const submissionData = submissions.map((submission) => ({
      id: submission._id,
      teamId: submission.teamId,
      fileName: submission.fileName,
      submittedBy: submission.submittedBy,
      submittedAt: submission.submittedAt,
    }));

    res.status(200).json({
      success: true,
      count: submissionData.length,
      data: submissionData,
    });
  } catch (error) {
    console.error('Get submissions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Download project file
// @route   GET /api/admin/download/:submissionId
// @access  Private/Admin
exports.downloadProjectFile = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.submissionId);

    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    const filePath = submission.filePath;

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Download file
    res.download(filePath, submission.fileName);
  } catch (error) {
    console.error('Download file error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
