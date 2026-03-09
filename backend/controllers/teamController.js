const Team = require('../models/Team');
const User = require('../models/User');
const generateInviteCode = require('../utils/codeGenerator');
const generateTeamCode = require('../utils/teamCodeGenerator');
const { sendTeamConfirmationEmail } = require('../utils/email');

// @desc    Create a new team
// @route   POST /api/team/create
// @access  Private
exports.createTeam = async (req, res) => {
  try {
    const { teamName } = req.body;

    if (!teamName) {
      return res.status(400).json({ message: 'Team name is required' });
    }

    // Check if user is already in a team
    const user = await User.findById(req.userId);
    if (user.teamId) {
      return res.status(400).json({ message: 'You are already in a team' });
    }

    // Generate unique invite code
    let inviteCode;
    let codeExists = true;
    while (codeExists) {
      inviteCode = generateInviteCode();
      const existingTeam = await Team.findOne({ inviteCode });
      if (!existingTeam) {
        codeExists = false;
      }
    }

    // Generate unique team code
    let teamCode;
    let teamCodeExists = true;
    while (teamCodeExists) {
      teamCode = generateTeamCode();
      const existingTeam = await Team.findOne({ teamCode });
      if (!existingTeam) {
        teamCodeExists = false;
      }
    }

    // Create new team
    const team = new Team({
      teamName,
      leaderId: req.userId,
      members: [req.userId],
      inviteCode,
      teamCode,
      college: user.college,
    });

    await team.save();

    // Update user's teamId
    user.teamId = team._id;
    await user.save();

    // Send confirmation email
    try {
      await sendTeamConfirmationEmail(user.email, teamName, inviteCode, 'created');
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({
      message: 'Your team has been created. You can invite friends using the invite code.',
      team: {
        id: team._id,
        teamName: team.teamName,
        inviteCode: team.inviteCode,
        teamCode: team.teamCode,
        members: team.members,
        leaderId: team.leaderId,
      },
    });
  } catch (error) {
    console.error('Create team error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Join a team using invite code
// @route   POST /api/team/join
// @access  Private
exports.joinTeam = async (req, res) => {
  try {
    const { inviteCode } = req.body;

    if (!inviteCode) {
      return res.status(400).json({ message: 'Invite code is required' });
    }

    // Find team by invite code
    const team = await Team.findOne({ inviteCode });
    if (!team) {
      return res.status(404).json({ message: 'Invalid invite code' });
    }

    // Check if team is full
    if (team.members.length >= team.maxSize) {
      return res.status(400).json({ message: 'Team is already full' });
    }

    // Get user
    const user = await User.findById(req.userId);

    // Check if user is already in a team
    if (user.teamId) {
      return res.status(400).json({ message: 'You are already in a team' });
    }

    // Add user to team
    team.members.push(req.userId);
    await team.save();

    // Update user's teamId
    user.teamId = team._id;
    await user.save();

    // Send confirmation email
    try {
      await sendTeamConfirmationEmail(user.email, team.teamName, inviteCode, 'joined');
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the request if email fails
    }

    res.status(200).json({
      message: 'You have successfully joined the team',
      team: {
        id: team._id,
        teamName: team.teamName,
        inviteCode: team.inviteCode,
        teamCode: team.teamCode,
        members: team.members,
        leaderId: team.leaderId,
      },
    });
  } catch (error) {
    console.error('Join team error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get team details
// @route   GET /api/team/:teamId
// @access  Private
exports.getTeamDetails = async (req, res) => {
  try {
    const team = await Team.findById(req.params.teamId).populate('members', 'name email college');

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    res.status(200).json({
      success: true,
      team: {
        id: team._id,
        teamName: team.teamName,
        members: team.members,
        leaderId: team.leaderId,
        inviteCode: team.inviteCode,
        teamCode: team.teamCode,
        memberCount: team.members.length,
        maxSize: team.maxSize,
        college: team.college,
        createdAt: team.createdAt,
      },
    });
  } catch (error) {
    console.error('Get team error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user's team
// @route   GET /api/team/user/:userId
// @access  Private
exports.getUserTeam = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('teamId');

    if (!user || !user.teamId) {
      return res.status(404).json({ message: 'User has no team' });
    }

    const team = await Team.findById(user.teamId).populate('members', 'name email college');

    res.status(200).json({
      success: true,
      team: {
        id: team._id,
        teamName: team.teamName,
        members: team.members,
        leaderId: team.leaderId,
        inviteCode: team.inviteCode,
        teamCode: team.teamCode,
        memberCount: team.members.length,
        maxSize: team.maxSize,
        college: team.college,
        createdAt: team.createdAt,
      },
    });
  } catch (error) {
    console.error('Get user team error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
