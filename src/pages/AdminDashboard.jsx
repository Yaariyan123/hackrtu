import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { adminService } from '../services/adminService';
import './AdminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('teams');
  const [teams, setTeams] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teamMembers, setTeamMembers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser.role !== 'admin') {
          navigate('/dashboard');
          return;
        }
        setUser(currentUser);
        await fetchData();
      } catch (err) {
        console.error('Failed to fetch user:', err);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [navigate]);

  const fetchData = async () => {
    try {
      setError('');
      const [teamsData, submissionsData] = await Promise.all([
        adminService.getAllTeams(),
        adminService.getAllSubmissions(),
      ]);
      setTeams(teamsData);
      setSubmissions(submissionsData);
    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
    }
  };

  const handleViewTeamMembers = async (team) => {
    try {
      setSelectedTeam(team);
      const members = await adminService.getTeamMembers(team.id);
      setTeamMembers(members);
    } catch (err) {
      console.error('Failed to fetch team members:', err);
    }
  };

  const handleDownload = async (submissionId, fileName) => {
    try {
      const blob = await adminService.downloadSubmission(submissionId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Failed to download:', err);
      alert('Failed to download file');
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  const filteredTeams = teams.filter((team) =>
    team.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.leaderId?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.college?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSubmissions = submissions.filter((sub) =>
    sub.teamId?.teamName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.fileName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="admin-loading">Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-left">
          <h1>Admin Dashboard</h1>
          <p className="admin-greeting">Welcome, {user?.name}</p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="admin-container">
        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'teams' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('teams');
              setSelectedTeam(null);
              setTeamMembers(null);
            }}
          >
            Teams ({teams.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'submissions' ? 'active' : ''}`}
            onClick={() => setActiveTab('submissions')}
          >
            Submissions ({submissions.length})
          </button>
        </div>

        {error && <div className="admin-error">{error}</div>}

        <div className="admin-search">
          <input
            type="text"
            placeholder="Search by team name, leader, or college..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {activeTab === 'teams' && (
          <div className="admin-content">
            {selectedTeam && teamMembers ? (
              <div className="team-details-modal">
                <div className="modal-header">
                  <button
                    className="back-btn"
                    onClick={() => {
                      setSelectedTeam(null);
                      setTeamMembers(null);
                    }}
                  >
                    ← Back to Teams
                  </button>
                </div>
                <div className="team-details">
                  <h2>{teamMembers.teamName}</h2>
                  <div className="team-info">
                    <div className="info-group">
                      <label>Team Leader:</label>
                      <p>{teamMembers.leaderId?.name}</p>
                      <small>{teamMembers.leaderId?.email}</small>
                    </div>
                    <div className="info-group">
                      <label>College:</label>
                      <p>{teamMembers.college || 'N/A'}</p>
                    </div>
                    <div className="info-group">
                      <label>Members ({teamMembers.memberCount}):</label>
                    </div>
                  </div>

                  <div className="members-list">
                    <h3>Team Members</h3>
                    <div className="members-table">
                      <div className="table-header">
                        <div className="col-name">Name</div>
                        <div className="col-email">Email</div>
                        <div className="col-college">College</div>
                        <div className="col-course">Course</div>
                        <div className="col-graduation">Graduation Year</div>
                      </div>
                      {teamMembers.members && teamMembers.members.length > 0 ? (
                        teamMembers.members.map((member) => (
                          <div key={member._id} className="table-row">
                            <div className="col-name">{member.name}</div>
                            <div className="col-email">{member.email}</div>
                            <div className="col-college">{member.college || 'N/A'}</div>
                            <div className="col-course">{member.course || 'N/A'}</div>
                            <div className="col-graduation">{member.graduationYear || 'N/A'}</div>
                          </div>
                        ))
                      ) : (
                        <div className="no-data">No team members</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="teams-grid">
                {filteredTeams.length > 0 ? (
                  filteredTeams.map((team) => (
                    <div key={team.id} className="team-card">
                      <div className="team-card-header">
                        <h3>{team.teamName}</h3>
                        <span className="team-badge">{team.memberCount}/{team.maxSize}</span>
                      </div>
                      <div className="team-card-body">
                        <div className="team-info-item">
                          <label>Leader:</label>
                          <p>{team.leaderId?.name}</p>
                        </div>
                        <div className="team-info-item">
                          <label>College:</label>
                          <p>{team.college || 'N/A'}</p>
                        </div>
                        <div className="team-info-item">
                          <label>Created:</label>
                          <p>{new Date(team.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <button
                        className="view-members-btn"
                        onClick={() => handleViewTeamMembers(team)}
                      >
                        View Members
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="no-data">No teams found</div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'submissions' && (
          <div className="admin-content">
            <div className="submissions-table">
              <div className="table-header">
                <div className="col-team">Team Name</div>
                <div className="col-leader">Leader Name</div>
                <div className="col-filename">Filename</div>
                <div className="col-date">Date</div>
                <div className="col-action">Action</div>
              </div>
              {filteredSubmissions.length > 0 ? (
                filteredSubmissions.map((submission) => (
                  <div key={submission.id} className="table-row">
                    <div className="col-team">{submission.teamId?.teamName}</div>
                    <div className="col-leader">{submission.submittedBy?.name}</div>
                    <div className="col-filename">{submission.fileName}</div>
                    <div className="col-date">{new Date(submission.submittedAt).toLocaleString()}</div>
                    <div className="col-action">
                      <button
                        className="download-btn"
                        onClick={() => handleDownload(submission.id, submission.fileName)}
                      >
                        Download
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-data">No submissions found</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
