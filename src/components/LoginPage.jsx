import React, { useState } from "react";

import "../assets/styles/login.css"

import Logo from "../assets/images/LOGO_header.png"

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Submitted:", formData);
    // Add authentication logic here
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
          <a href="#">Sign Up</a>
          <a href="#">Forgot Password?</a>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
