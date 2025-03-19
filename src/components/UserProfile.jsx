import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

import { Link } from "react-router-dom";

import "../assets/styles/userProfile.css"

const UserProfile = () => {
  const [formData, setFormData] = useState({
    username: "Username",
    mobile: "+1234567890",
    email: "user@example.com",
    profession: "Software Developer",
    age: "",
    profilePicture: "",
  });

  const [currentUser, setCurrentUser] = useState({
    username: "Username",
    mobile: "+1234567890",
    email: "user@example.com",
    profession: "Software Developer",
    age: 25,
    profilePicture: "",
  });

  const getUserProfile = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (!userData) return;
      console.log(userData);
      const token = userData?.token;
      const response = await axios.get("http://localhost:5001/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      if (!response.data) {
        return
      };
      setCurrentUser(response.data.user);
      setFormData(response.data.user);
      console.log(response);
    } catch (error) {
      console.error("Error fetching user profile", error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (!userData) return;
      const token = userData?.token;
      const response = await axios.put("http://localhost:5001/api/user/profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      alert("Profile updated successfully");
      getUserProfile();
    } catch (error) {
      console.error("Error updating user profile", error);
    }
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {/* First Column */}
        <div className="col-lg-4 col-12 mb-4">
          <div className="card p-3">
            <img
              src={"https://via.placeholder.com/300x200"}
              alt="Profile"
              className="profile-img img-fluid"
            />
            <h4 className="text-center mt-3">{currentUser.username || "User"}</h4>
            <table className="table profile-info-table">
              <tbody>
                <tr>
                  <td><strong>Mobile:</strong></td>
                  <td>{formData.mobile || "9099227702"}</td>
                </tr>
                <tr>
                  <td><strong>Email:</strong></td>
                  <td>{formData.email || "exapmle@gmail.com"}</td>
                </tr>
                <tr>
                  <td><strong>Profession:</strong></td>
                  <td>{formData.profession}</td>
                </tr>
                <tr>
                  <td><strong>Age:</strong></td>
                  <td>{formData.age}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Second Column */}
        <div className="col-lg-8 col-12">
          {/* Settings */}
          <div className="card p-3 mb-4">
            <h4>Settings</h4>
            <table className="table">
              <tbody>
                <tr>
                  <td>Want to update profile?</td>
                  <td>
                    <button className="btn btn-primary" data-bs-toggle="collapse" data-bs-target="#updateProfileForm">
                      Update
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Want to change password?</td>
                  <td>
                    <Link to="/forgot-password" className="btn btn-primary">
                      Change Password
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>Forgot password?</td>
                  <td>
                    <Link to="/forgot-password" className="btn btn-primary">Forgot Password</Link>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Update Profile Form */}
            <div className="collapse mt-3" id="updateProfileForm">
              <form onSubmit={handleSubmit}>
                <h4>Update Profile</h4>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} />
                </div>
                {/* <div className="mb-3">
                  <label className="form-label">Profile Picture</label>
                  <input type="file" className="form-control" />
                </div> */}
                <div className="mb-3">
                  <label className="form-label">Mobile</label>
                  <input type="text" className="form-control" name="mobile" value={formData.mobile} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Profession</label>
                  <input type="text" className="form-control" name="profession" value={formData.profession} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Age</label>
                  <input type="number" className="form-control" name="age" value={formData.age} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
              </form>
            </div>
          </div>

          {/* Socials */}
          <div className="card p-3">
            <h4>Socials</h4>
            <div className="social-icons mt-3">
              <a href="#" className="social-icon"><i className="bi bi-facebook"></i></a>
              <a href="#" className="social-icon"><i className="bi bi-twitter"></i></a>
              <a href="#" className="social-icon"><i className="bi bi-instagram"></i></a>
              <a href="#" className="social-icon"><i className="bi bi-linkedin"></i></a>
              <a href="#" className="social-icon"><i className="bi bi-youtube"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
