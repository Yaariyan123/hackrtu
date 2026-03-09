import React, { useState } from 'react';
import { teamService } from '../services/teamService';
import './AuthForm.css';

function TeamForm({ onSuccess, mode = 'create' }) {
  const [teamName, setTeamName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await teamService.createTeam(teamName);
      onSuccess?.();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create team');
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await teamService.joinTeam(inviteCode);
      onSuccess?.();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to join team');
    } finally {
      setLoading(false);
    }
  };

  if (mode === 'create') {
    return (
      <div className="auth-card">
        <h2>Create Team</h2>
        <form onSubmit={handleCreate}>
          <input
            name="teamName"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Team'}
          </button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    );
  }

  return (
    <div className="auth-card">
      <h2>Join Team</h2>
      <form onSubmit={handleJoin}>
        <input
          name="inviteCode"
          placeholder="Invite Code"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Joining...' : 'Join Team'}
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default TeamForm;
