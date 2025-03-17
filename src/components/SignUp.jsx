import { useState } from "react";

import "../assets/styles/signUp.css"
import Logo from "../assets/images/LOGO_header.png"

const SignUp = () => {

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    mobile: "",
    email: "",
    profession: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Please fill out all fields correctly.");
      return;
    }

    localStorage.setItem("user", JSON.stringify({
      username: formData.username,
      email: formData.email,
    }));
    alert("Signup successful!");
  };

  const validateForm = () => {
    const { fullName, username, mobile, email, profession, password } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;

    return (
      fullName.trim() !== "" &&
      username.trim() !== "" &&
      mobileRegex.test(mobile) &&
      emailRegex.test(email) &&
      profession.trim() !== "" &&
      password.length >= 6
    );
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
          type="text"
          name="username"
          className="form-control"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          name="mobile"
          className="form-control"
          placeholder="Mobile Number"
          value={formData.mobile}
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
          type="text"
          name="profession"
          className="form-control"
          placeholder="Profession"
          value={formData.profession}
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
