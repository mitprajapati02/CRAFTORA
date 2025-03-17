import { useState } from "react";

import "../assets/styles/signUp.css"
import Logo from "../assets/images/LOGO_header.png"

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
    // Add signup logic here
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
              name="fullName"
              className="form-control"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
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
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
        </form>
        <p className="mt-3">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </main>
  );
};

export default SignUp;
