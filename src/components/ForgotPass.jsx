import React from "react";
import "../assets/styles/ForgotPass.css"

import "../assets/styles/ForgotPass.css"

const ForgotPass = () => {
  return (
    <main className="main-content">
      <div className="forgot-password-form">
        <h3>Forgot Your Password?</h3>
        <p>Enter your email address and we'll send you instructions to reset your password.</p>

        <form>
          <div className="mb-3">
            <input type="email" className="form-control" placeholder="Email Address" required />
          </div>

          <button type="submit" className="btn btn-primary">
            Send Reset Link
          </button>
        </form>

        <p className="mt-3">
          <a href="/login">Back to Login</a>
        </p>
      </div>
    </main>
  );
};

export default ForgotPass;
