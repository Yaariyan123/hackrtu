import api from '../utils/api';

export const teamService = {
  createTeam: async (teamName) => {
    const response = await api.post('/team/create', { teamName });
    return response.data;
  },

  joinTeam: async (inviteCode) => {
    const response = await api.post('/team/join', { inviteCode });
    return response.data;
  },

  getTeamDetails: async (teamId) => {
    const response = await api.get(`/team/${teamId}`);
    return response.data.team;
  },

  getUserTeam: async (userId) => {
    const response = await api.get(`/team/user/${userId}`);
    return response.data.team;
  },
};
