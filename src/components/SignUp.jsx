import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/styles/signUp.css'
import Logo from '../assets/images/LOGO_header.png'

import axios from 'axios';

const generateToken = () => {
  return Math.random().toString(36).substr(2, 10); // Random 10-character alphanumeric token
};


const SignUp = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    mobile: '',
    email: '',
    profession: '',
    password: '',
    token: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, mobile, email, profession, password } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;

    if (
      username.trim() === '' ||
      !mobileRegex.test(mobile) ||
      !emailRegex.test(email) ||
      profession.trim() === '' ||
      password.length < 6
    ) {
      return alert('Invalid input! Please check your inputs');
    }

    const token = generateToken();

    const dataWithToken = { ...formData, token };

    try {
      await axios.post('https://craftora-1o90.onrender.com/api/auth/signup', dataWithToken);


      localStorage.setItem('user', JSON.stringify({ username, email, token }));
      navigate('/user-dashboard');

    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Signup failed', error);
    }
  };



  return (
    <main className="main-content d-flex justify-content-center align-items-center vh-100">
      <div className="signup-form text-center p-4 shadow rounded">
        <img src={Logo} alt="Craftora Logo" className="mb-3" />
        <h3>Create Your Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              style={{ backgroundColor: 'white' }}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="tel"
              name="mobile"
              className="form-control"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              style={{ backgroundColor: 'white' }}
              required
              title="Please enter a valid 10-digit mobile number"
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              style={{ backgroundColor: 'white' }}
              required
              title="Please enter a valid email address"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="profession"
              className="form-control"
              placeholder="Profession"
              value={formData.profession}
              onChange={handleChange}
              style={{ backgroundColor: 'white' }}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password (min. 6 characters)"
              value={formData.password}
              onChange={handleChange}
              style={{ backgroundColor: 'white' }}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
        </form>
        <p className="mt-3">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default SignUp;
