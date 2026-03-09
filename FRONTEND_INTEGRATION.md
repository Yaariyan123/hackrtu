# Frontend Integration Guide

This guide shows how to integrate your React frontend with the Hackathon Backend API.

## Quick Setup

### 1. Install Axios (HTTP Client)

```bash
cd frontend
npm install axios
```

### 2. Create API Configuration File

Create `src/utils/api.js`:

```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 3. Create Auth Service

Create `src/services/authService.js`:

```javascript
import api from '../utils/api';

export const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data.data;
  },
};
```

### 4. Create Team Service

Create `src/services/teamService.js`:

```javascript
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
```

### 5. Create Project Service

Create `src/services/projectService.js`:

```javascript
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
```

## Component Examples

### Register Component

```javascript
import { useState } from 'react';
import { authService } from '../services/authService';

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    gender: '',
    college: '',
    course: '',
    graduationYear: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.register(formData);
      // Redirect to dashboard or next page
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      {/* Add other fields similarly */}
      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default RegisterForm;
```

### Team Management Component

```javascript
import { useState } from 'react';
import { teamService } from '../services/teamService';

function TeamManager() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await teamService.createTeam(teamName);
      setMessage(`Team created! Invite code: ${response.team.inviteCode}`);
      setTeamName('');
      setShowCreateForm(false);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error creating team');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinTeam = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await teamService.joinTeam(inviteCode);
      setMessage('Successfully joined team!');
      setInviteCode('');
      setShowJoinForm(false);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error joining team');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="team-buttons">
        <button onClick={() => setShowCreateForm(true)}>Create Team</button>
        <button onClick={() => setShowJoinForm(true)}>Join Team</button>
      </div>

      {showCreateForm && (
        <form onSubmit={handleCreateTeam}>
          <input
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            Create Team
          </button>
        </form>
      )}

      {showJoinForm && (
        <form onSubmit={handleJoinTeam}>
          <input
            type="text"
            placeholder="Invite Code"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
            required
          />
          <button type="submit" disabled={loading}>
            Join Team
          </button>
        </form>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}

export default TeamManager;
```

### Project Submission Component

```javascript
import { useState } from 'react';
import { projectService } from '../services/projectService';

function ProjectSubmission({ teamId }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  // Check submission status on mount
  useState(() => {
    const checkStatus = async () => {
      try {
        const data = await projectService.getSubmissionStatus(teamId);
        setStatus(data.applicationStatus);
      } catch (err) {
        console.error('Error checking status:', err);
      }
    };
    checkStatus();
  }, [teamId]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please select a PDF file');
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    try {
      const response = await projectService.submitProject(file);
      setMessage(response.message);
      setFile(null);
      setStatus('Application Submitted');
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Application Status: {status}</h3>

      {status !== 'Application Submitted' && (
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            required
          />
          <button type="submit" disabled={loading || !file}>
            {loading ? 'Submitting...' : 'Submit Project'}
          </button>
        </form>
      )}

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default ProjectSubmission;
```

## Update Frontend Configuration

Update your frontend environment to point to the backend:

Create `.env` or `.env.local` in the frontend directory:

```
VITE_API_URL=http://localhost:5000/api
```

Then update your API calls to use this variable:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

## Running Both Frontend and Backend

### Terminal 1 - Backend
```bash
cd backend
npm install
npm run dev
```

### Terminal 2 - Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`
Backend will run on `http://localhost:5000`

## Common Issues

### CORS Error
- Ensure backend is running
- Check `FRONTEND_URL` in `.env` matches your frontend URL
- Requests should have proper headers

### Token Not Persisting
- Ensure token is saved to localStorage after login/register
- Check token is included in Authorization header for protected routes
- Verify token format: `Bearer <token>`

### File Upload Fails
- Ensure Content-Type is `multipart/form-data`
- Don't set Content-Type header manually (axios will do it)
- File must be a PDF and under 10MB

### 401 Unauthorized
- Token might be expired (valid for 30 days)
- Token might not be included in request
- User role might not have access to admin routes

## Testing APIs with Postman

1. **Register a user**
   - Method: POST
   - URL: `http://localhost:5000/api/auth/register`
   - Body: JSON with user data

2. **Login**
   - Method: POST
   - URL: `http://localhost:5000/api/auth/login`
   - Body: email and password
   - Copy token from response

3. **Protected Requests**
   - Add Header: `Authorization: Bearer <token>`
   - Then make your request

## Next Steps

1. Implement auth context/Redux for state management
2. Add error handling and user feedback
3. Implement loading states
4. Add form validation on frontend
5. Create admin dashboard to view submissions
6. Add pagination for large datasets
7. Implement auto-logout on token expiration
