const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

const sendTeamConfirmationEmail = async (email, teamName, inviteCode, action = 'created') => {
  const subject = 'Hackathon Team Confirmation';
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Hackathon Team Confirmation</h2>
      <p>You have successfully ${action} a hackathon team.</p>
      
      <div style="background-color: #f0f0f0; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Team Name:</strong> ${teamName}</p>
        <p><strong>Invite Code:</strong> ${inviteCode}</p>
      </div>
      
      <p>Share this invite code with your team members so they can join your team.</p>
      
      <p>Best of luck with your hackathon project!</p>
    </div>
  `;

  await sendEmail(email, subject, html);
};

module.exports = {
  sendEmail,
  sendTeamConfirmationEmail,
};
