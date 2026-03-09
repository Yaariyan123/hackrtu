import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import { authService } from '../services/authService';
import { teamService } from '../services/teamService';
import { projectService } from '../services/projectService';
import TeamForm from '../components/TeamForm';
import './DashboardPage.css';

function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [team, setTeam] = useState(null);
  const [statusInfo, setStatusInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [teamMode, setTeamMode] = useState('create');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showTeamQrModal, setShowTeamQrModal] = useState(false);
  const [submitFile, setSubmitFile] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const fetchData = async () => {
    try {
      const current = await authService.getCurrentUser();
      setUser(current);
      const teamId = current?.teamId?._id || current?.teamId;
      if (teamId) {
        const teamData = await teamService.getTeamDetails(teamId);
        setTeam(teamData);
        const status = await projectService.getSubmissionStatus(teamId);
        setStatusInfo(status);
      } else {
        setStatusInfo({ applicationStatus: 'Application Submitted', hasSubmitted: false });
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setUser(null);
        setTeam(null);
        setStatusInfo({ applicationStatus: 'Application Pending', hasSubmitted: false });
      } else {
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  const handleTeamSuccess = () => {
    setTeamMode(null);
    fetchData();
  };

  const userId = user?._id || user?.id;
  const isTeamLeader = !!(userId && team?.leaderId && team.leaderId.toString() === userId.toString());
  const teamQrValue = team
    ? JSON.stringify(
        {
          teamCode: team.teamCode,
          teamId: team.id,
          teamName: team.teamName,
          inviteCode: team.inviteCode,
          leaderId: team.leaderId,
          members: (team.members || []).map((m) => ({
            id: m._id,
            name: m.name,
            email: m.email,
            college: m.college,
          })),
        },
        null,
        0
      )
    : '';

  const handleSubmitPresentation = async (e) => {
    e.preventDefault();
    if (!submitFile) {
      setSubmitError('Please select a PDF file');
      return;
    }
    if (submitFile.type !== 'application/pdf') {
      setSubmitError('Only PDF files are allowed');
      return;
    }
    setSubmitLoading(true);
    setSubmitError('');
    try {
      await projectService.submitProject(submitFile);
      setShowSubmitModal(false);
      setSubmitFile(null);
      fetchData();
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'Failed to submit presentation');
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="dashboard-section">
        <div className="dashboard-section-bg" />
        <div className="dashboard-content">
          <div className="dashboard-loading">Loading...</div>
        </div>
      </section>
    );
  }

  const applicationStatus = user ? 'Application Submitted' : 'Application Pending';
  const presentationStatus = statusInfo?.hasSubmitted ? 'Presentation Submitted' : null;

  return (
    <section className="dashboard-section">
      <div className="dashboard-section-bg" />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>{user ? `Welcome, ${user.name}` : 'Dashboard'}</h1>
          {user ? (
            <button type="button" className="dashboard-logout" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <div className="dashboard-auth-links">
              <Link to="/login" className="dashboard-auth-btn">Login</Link>
              <Link to="/register" className="dashboard-auth-btn dashboard-auth-btn-primary">Register</Link>
            </div>
          )}
        </div>

        <div className="dashboard-status-card auth-card">
          <h2>Application Status</h2>
          <p className="status-text">
            {presentationStatus || applicationStatus}
          </p>
        </div>

        {!user ? (
          <div className="dashboard-guest-card auth-card">
            <p>Register or login to access your dashboard and manage your hackathon application.</p>
          </div>
        ) : team ? (
          <>
            <div className="dashboard-team-card auth-card">
              <div className="dashboard-team-header">
                <h2>Team Details</h2>
                {isTeamLeader && <span className="team-lead-badge">Team Lead</span>}
              </div>
              <p className="team-name">{team.teamName}</p>
              {team.teamCode && (
                <p className="team-id">
                  Team ID: <strong>{team.teamCode}</strong>
                </p>
              )}
              {team.inviteCode && (
                <p className="team-invite">
                  Invite Code: <strong>{team.inviteCode}</strong>
                </p>
              )}
              <p className="team-meta">
                {team.memberCount}/{team.maxSize} members
              </p>
              <ul className="team-members">
                {team.members?.map((m) => (
                  <li key={m._id}>
                    {m.name} <span className="email">({m.email})</span>
                    {team.leaderId?.toString() === m._id?.toString() && (
                      <span className="member-lead-badge">Lead</span>
                    )}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="dashboard-secondary-btn"
                onClick={() => setShowTeamQrModal(true)}
              >
                View Team QR
              </button>
              {isTeamLeader && !statusInfo?.hasSubmitted && (
                <button
                  type="button"
                  className="dashboard-submit-btn"
                  onClick={() => setShowSubmitModal(true)}
                >
                  Submit Presentation
                </button>
              )}
              {isTeamLeader && statusInfo?.hasSubmitted && (
                <p className="presentation-submitted">Presentation submitted successfully.</p>
              )}
            </div>
          </>
        ) : (
          <div className="dashboard-team-actions">
            <div className="team-mode-tabs">
              <button
                type="button"
                className={teamMode === 'create' ? 'active' : ''}
                onClick={() => setTeamMode('create')}
              >
                Create Team
              </button>
              <button
                type="button"
                className={teamMode === 'join' ? 'active' : ''}
                onClick={() => setTeamMode('join')}
              >
                Join Team
              </button>
            </div>
            {teamMode && (
              <TeamForm mode={teamMode} onSuccess={handleTeamSuccess} />
            )}
          </div>
        )}
      </div>

      {showSubmitModal && (
        <div className="dashboard-modal-overlay" onClick={() => !submitLoading && setShowSubmitModal(false)}>
          <div className="dashboard-modal auth-card" onClick={(e) => e.stopPropagation()}>
            <h2>Submit Presentation</h2>
            <p className="modal-hint">Upload your project presentation (PDF only, max 10MB)</p>
            <form onSubmit={handleSubmitPresentation}>
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={(e) => {
                  setSubmitFile(e.target.files?.[0] || null);
                  setSubmitError('');
                }}
              />
              {submitError && <div className="error">{submitError}</div>}
              <div className="modal-actions">
                <button type="button" onClick={() => setShowSubmitModal(false)} disabled={submitLoading}>
                  Cancel
                </button>
                <button type="submit" disabled={submitLoading}>
                  {submitLoading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showTeamQrModal && team && (
        <div className="dashboard-modal-overlay" onClick={() => setShowTeamQrModal(false)}>
          <div className="dashboard-modal auth-card" onClick={(e) => e.stopPropagation()}>
            <h2>Team QR</h2>
            <p className="modal-hint">Scan to get team details</p>
            <div className="qr-wrap">
              <div className="qr-card">
                <QRCodeCanvas value={teamQrValue} size={220} includeMargin />
              </div>
            </div>
            <div className="team-qr-details">
              {team.teamCode && (
                <p>
                  Team ID: <strong>{team.teamCode}</strong>
                </p>
              )}
              {team.inviteCode && (
                <p>
                  Invite Code: <strong>{team.inviteCode}</strong>
                </p>
              )}
            </div>
            <div className="modal-actions">
              <button type="button" onClick={() => setShowTeamQrModal(false)}>
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  try {
                    navigator.clipboard.writeText(teamQrValue);
                  } catch (_) {}
                }}
              >
                Copy Details
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default DashboardPage;
