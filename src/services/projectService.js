import api from '../utils/api';

export const projectService = {
  submitProject: async (file) => {
    const formData = new FormData();
    formData.append('projectFile', file);

    const response = await api.post('/project/submit', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getSubmissionStatus: async (teamId) => {
    const response = await api.get(`/project/status/${teamId}`);
    return response.data;
  },
};
