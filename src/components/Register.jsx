import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/api';
import '../assets/styles.css'; // Import external CSS file for styling

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData)
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        console.error('Registration error:', error);
      });
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <label className="register-label">
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleInputChange} className="register-input" />
        </label>
        <label className="register-label">
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} className="register-input" />
        </label>
        <button type="submit" className="register-button">Register</button>
      </form>
      <p className="register-login-link">
        Already have an account? <Link to="/" className="register-link">Login here</Link>
      </p>
    </div>
  );
}

export default Register;
