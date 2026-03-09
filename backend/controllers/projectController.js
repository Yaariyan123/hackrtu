const Submission = require('../models/Submission');
const Team = require('../models/Team');
const User = require('../models/User');
const path = require('path');
const fs = require('fs');

// @desc    Submit project
// @route   POST /api/project/submit
// @access  Private
exports.submitProject = async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a PDF file' });
    }

    // Get user and their team
    const user = await User.findById(req.userId);
    if (!user.teamId) {
      return res.status(400).json({ message: 'You must be in a team to submit a project' });
    }

    const team = await Team.findById(user.teamId);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Check if user is team leader
    if (team.leaderId.toString() !== req.userId.toString()) {
      return res.status(403).json({ message: 'Only team leader can submit project' });
    }

    // Check team member count (minimum 2, maximum 4)
    if (team.members.length < 2 || team.members.length > 4) {
      return res.status(400).json({
        message: `Team must have between 2 and 4 members. Current: ${team.members.length}`,
      });
    }

    // Check if team already submitted
    const existingSubmission = await Submission.findOne({ teamId: team._id });
    if (existingSubmission) {
      return res.status(400).json({ message: 'Your team has already submitted a project' });
    }

    // Create submission record
    const submission = new Submission({
      teamId: team._id,
      filePath: req.file.path,
      fileName: req.file.filename,
      submittedBy: req.userId,
    });

    await submission.save();

    res.status(201).json({
      message: 'Project submitted successfully',
      submission: {
        id: submission._id,
        teamId: submission.teamId,
        fileName: submission.fileName,
        submittedAt: submission.submittedAt,
      },
    });
  } catch (error) {
    console.error('Submit project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get submission status for a team
// @route   GET /api/project/status/:teamId
// @access  Private
exports.getSubmissionStatus = async (req, res) => {
  try {
    const submission = await Submission.findOne({ teamId: req.params.teamId });

    if (!submission) {
      return res.status(200).json({
        applicationStatus: 'Application Pending',
        hasSubmitted: false,
      });
    }

    res.status(200).json({
      applicationStatus: 'Application Submitted',
      hasSubmitted: true,
      submission: {
        id: submission._id,
        submittedAt: submission.submittedAt,
      },
    });
  } catch (error) {
    console.error('Get submission status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
