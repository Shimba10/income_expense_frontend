import React, { useState } from 'react';
import { login } from '../services/api';
import { Link } from 'react-router-dom'; // Import Link from React Router
import '../assets/styles.css'; // Import external CSS file for styling

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData)
      .then(() => {
        window.location.href = '/dashboard';
      })
      .catch(error => {
        console.error('Login error:', error);
      });
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label className="login-label">
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleInputChange} className="login-input" />
        </label>
        <label className="login-label">
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} className="login-input" />
        </label>
        <button type="submit" className="login-button">Login</button>
      </form>
      <p className="register-link">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;
