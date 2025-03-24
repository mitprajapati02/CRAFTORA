import React from 'react';
import { Link } from 'react-router-dom';

import { useState } from "react";
import axios from "axios";

import '../assets/styles/ForgotPass.css'


const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost:5001/api/user/forgot-password", { email });
      setMessage(response.data.message);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <main className="main-content">
      <div className="forgot-password-form">
        <h3>Forgot Your Password?</h3>
        <p>Enter your email address and we'll send you instructions to reset your password.</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ backgroundColor: 'white' , color: 'black'}}

              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Send Reset Link
          </button>
        </form>

        {message && <p className="text-success mt-2">{message}</p>}
        {error && <p className="text-danger mt-2">{error}</p>}

        <p className="mt-3">
          <Link to="/user-profile">Back to Profile</Link>
        </p>
      </div>
    </main>
  );

};

export default ForgotPass;
