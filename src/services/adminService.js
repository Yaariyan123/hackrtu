import api from '../utils/api';

export const adminService = {
  getAllTeams: async () => {
    const response = await api.get('/admin/teams');
    return response.data.data;
  },

  getTeamMembers: async (teamId) => {
    const response = await api.get(`/admin/teams/${teamId}`);
    return response.data.team;
  },

  getAllSubmissions: async () => {
    const response = await api.get('/admin/submissions');
    return response.data.data;
  },

  downloadSubmission: async (submissionId) => {
    const response = await api.get(`/admin/download/${submissionId}`, {
      responseType: 'blob',
    });
    return response.data;
  },

  getAllUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data.data;
  },
};
