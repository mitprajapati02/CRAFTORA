import React, { useState, useEffect } from "react";

import { useNavigate, Link } from "react-router-dom";

import "../assets/styles/login.css"

import Logo from "../assets/images/LOGO_header.png"

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const navigation = useNavigate();
  useEffect(() => {
    // Remove any leftover Bootstrap backdrop
    const backdrop = document.querySelector(".offcanvas-backdrop");
    if (backdrop) backdrop.remove();
  }, []);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { email, password } = JSON.parse(localStorage.getItem("user"));

    if(email === formData.email && password === formData.password){
      navigation('/userDashboard');
    }else{
      alert("Invalid email or password");
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
