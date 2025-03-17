import React, { useState } from "react";

import { Link } from "react-router-dom";

import "../assets/styles/UserProfile.css"

const UserProfile = () => {
  const [formData, setFormData] = useState({
    username: "Username",
    mobile: "+1234567890",
    email: "user@example.com",
    profession: "Software Developer",
    age: 25,
    profilePicture: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* First Column */}
        <div className="col-lg-4 col-12 mb-4">
          <div className="card p-3">
            <img
              src={formData.profilePicture || "https://via.placeholder.com/300x200"}
              alt="Profile"
              className="profile-img img-fluid"
            />
            <h4 className="text-center mt-3">{formData.username}</h4>
            <table className="table profile-info-table">
              <tbody>
                <tr>
                  <td><strong>Mobile:</strong></td>
                  <td>{formData.mobile}</td>
                </tr>
                <tr>
                  <td><strong>Email:</strong></td>
                  <td>{formData.email}</td>
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
                    <Link to="/ForgotPassword">
                    <a  className="btn btn-secondary">Change Password</a>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>Forgot password?</td>
                  <td>
                    <a href="/forgot-password" className="btn btn-secondary">Reset Password</a>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Update Profile Form */}
            <div className="collapse mt-3" id="updateProfileForm">
              <form>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Profile Picture</label>
                  <input type="file" className="form-control" />
                </div>
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
