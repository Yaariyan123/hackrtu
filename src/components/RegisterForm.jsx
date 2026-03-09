import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';
import './AuthForm.css';

function RegisterForm() {
  const navigate = useNavigate();
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const gradYear = parseInt(String(formData.graduationYear), 10);
      const payload = {
        ...formData,
        graduationYear: !isNaN(gradYear) ? gradYear : formData.graduationYear,
      };
      await authService.register(payload);
      navigate('/dashboard');
    } catch (err) {
      const errData = err.response?.data;
      let msg = 'Registration failed';
      if (!err.response) {
        msg = 'Unable to connect. Please ensure the backend server is running on port 5000.';
      } else if (errData?.errors?.length) {
        msg = errData.errors.map((e) => e.msg).join('. ');
      } else if (errData?.message) {
        msg = errData.message;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          required
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          name="college"
          placeholder="College"
          value={formData.college}
          onChange={handleChange}
          required
        />
        <input
          name="course"
          placeholder="Course"
          value={formData.course}
          onChange={handleChange}
          required
        />
        <input
          name="graduationYear"
          type="number"
          placeholder="Year of Graduation"
          value={formData.graduationYear}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        {error && <div className="error">{error}</div>}
        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;
