import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import '../assets/styles/login.css'
import Logo from '../assets/images/LOGO_header.png'



const generateToken = () => {
  return Math.random().toString(36).substr(2, 10);
};

const LoginPage = () => {

  const navigation = useNavigate();
  useEffect(() => {

    const backdrop = document.querySelector('.offcanvas-backdrop');
    if (backdrop) backdrop.remove();
  }, []);

  const [formData, setFormData] = useState({ email: '', password: '', token: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = generateToken();
    const dataWithToken = { ...formData, token };

    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', dataWithToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      alert('Login successful!');
      navigation('/user-dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed, check your credentials.');
    }
  };

  return (
    <main className="main-content">
      <div className="login-container">
        <img src={Logo} alt="Craftora Logo" />
        <h2>Welcome Back to Craftora</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Login
          </button>
        </form>
        <div className="d-flex justify-content-between">
          <Link to="/signup">Sign Up</Link>
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
