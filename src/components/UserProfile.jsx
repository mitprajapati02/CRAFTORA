import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

import '../assets/styles/userProfile.css'


const UserProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: 'Username',
    mobile: '+1234567890',
    email: 'user@example.com',
    profession: 'Software Developer',
    age: 25,
    profilePicture: '',
  });

  const [apps, setApps] = useState([]); // Store social media apps
  const [profilePic, setProfilePic] = useState(null); // State for file
  const [currentUser, setCurrentUser] = useState(null); // Store current user data

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));

      if (!userData || !userData.token) {
        navigate('/login');
        return;
      }

      const token = userData.token;

      const response = await axios.get('https://craftora-1o90.onrender.com/api/user/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data.user) {
        localStorage.removeItem('user');
        navigate('/login');
        return;
      }

      setCurrentUser(response.data.user);
      setFormData(response.data.user);
      setApps(response.data.apps);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching user profile', error);
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (!userData) return;

      const token = userData.token;

      // Create FormData for file upload
      const updatedFormData = new FormData();
      updatedFormData.append('username', formData.username);
      updatedFormData.append('email', formData.email);
      updatedFormData.append('profession', formData.profession);
      updatedFormData.append('age', formData.age);

      if (profilePic) {
        updatedFormData.append('profilePic', profilePic);
      }

      await axios.put('https://craftora-1o90.onrender.com/api/user/profile', updatedFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Required for file upload
        },
      });


      alert('Profile updated successfully');
      getUserProfile(); // Refresh profile data
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error updating user profile', error);
    }
  };

  if (!currentUser) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {/* First Column */}
        <div className="col-lg-4 col-12 mb-4">
          <div className="card p-3">
            <img
              src={currentUser.profilePic ? `https://craftora-1o90.onrender.com${currentUser.profilePic}` : '/default-profile.png'}
              alt="Profile"
              className="profile-pic profile-img"
            />


            <h4 className="text-center mt-3">{currentUser.username || 'User'}</h4>
            <table className="table profile-info-table">
              <tbody>
                <tr>
                  <td><strong>Mobile:</strong></td>
                  <td>{formData.mobile || '9099227702'}</td>
                </tr>
                <tr>
                  <td><strong>Email:</strong></td>
                  <td>{formData.email || 'exapmle@gmail.com'}</td>
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
                    <Link to="/change-password" className="btn btn-primary">
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
                <div className="mb-3">
                  <label className="form-label">Profile Picture</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={(e) => setProfilePic(e.target.files[0])} // Store file in state
                  />
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
              {apps.length > 0 ? (
                apps.map((app) => (
                  <a key={app.id} href={`/app-dashboard/${app.id}`} className="social-icon">
                    <i className={app.icon}></i>
                  </a>
                ))
              ) : (
                <p>No social media accounts linked</p>
              )}
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default UserProfile;
