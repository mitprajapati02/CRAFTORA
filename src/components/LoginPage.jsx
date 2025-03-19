import React, { useState, useEffect } from "react";

import { useNavigate, Link } from "react-router-dom";

import "../assets/styles/login.css"

import Logo from "../assets/images/LOGO_header.png"

import axios from "axios";

const generateToken = () => {
  return Math.random().toString(36).substr(2, 10); // Random 10-character alphanumeric token
};

const LoginPage = () => {

  const navigation = useNavigate();
  useEffect(() => {
    // Remove any leftover Bootstrap backdrop
    const backdrop = document.querySelector(".offcanvas-backdrop");
    if (backdrop) backdrop.remove();
  }, []);

  const [formData, setFormData] = useState({ email: "", password: "", token: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();



    const token = generateToken();

    const dataWithToken = { ...formData, token };

    try {
      const response = await axios.post("http://localhost:5001/api/auth/login", dataWithToken);

      // ✅ Save user details in localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert("Login successful!");
      // ✅ Redirect to dashboard
      navigation("/userDashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed, check your credentials.");
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
          <Link to="/forgotPassword">Forgot Password?</Link>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
