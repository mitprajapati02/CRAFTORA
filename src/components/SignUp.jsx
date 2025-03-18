import { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/signUp.css"
import Logo from "../assets/images/LOGO_header.png"

const SignUp = () => {

  const [formData, setFormData] = useState({
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

    const {username, mobile, email, profession, password } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;

    if (
      username.trim() === "" ||
      !mobileRegex.test(mobile) ||
      !emailRegex.test(email) ||
      profession.trim() === "" ||
      password.length < 6
    ) {
      alert("Please fill out all fields correctly.");
      return;
    }

    localStorage.setItem("user", JSON.stringify({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    }));

    alert("Signup successful!");
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
          style={{backgroundColor: "white"}}
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
          style={{backgroundColor: "white"}}
          required
          pattern="[0-9]{10}"
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
          style={{backgroundColor: "white"}}
          required
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
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
          style={{backgroundColor: "white"}}
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
          style={{backgroundColor: "white"}}
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
