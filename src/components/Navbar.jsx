import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiRequest } from '../utils/apiService';
import { useParams } from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import '../assets/styles/navbar.css'
import '../assets/styles/offcanvas.css'

import { Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const { appId } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));

  const [mediaList, setMediaList] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);

  let userName = user?.username || 'User';


  useEffect(() => {
    const fetchUserMedia = async () => {
      try {
        const response = await apiRequest('social/socialApps', 'GET');
        setMediaList(response);
        console.log(response);
      } catch (error) {
        console.error('Error fetching social media apps:', error);
      }
    };
    if (user) fetchUserMedia();
  }, []);



  const handleMediaSelect = (media) => {
    setSelectedMedia(media);
    navigate(`/appDashboard/${media.id}`); // Navigate to media's dashboard
  };

  const handleAddNewApp = () => {
    if (user) {
      navigate('/addMedia');
    } else {
      navigate('/login');
    }
  };

  return (
    <nav className="navbar d-none d-md-flex">
      {/* User Profile Section */}
      <div className="user-profile">
        <img
          src="user-profile-pic.jpg"
          alt="User Profile"
          className="profile-pic"
        />
        <p className="user-name">{userName}</p>
      </div>

      {/* Dynamically Display User's Social Media Apps */}
      <div className="social-apps">
        <ul>
          {mediaList.length > 0 ? (
            mediaList.map((media) => (
              <li
                key={media.id}
                className={`app-item ${media?.id === appId ? "active" : ""
                  }`}
                onClick={() => handleMediaSelect(media)}
                style={{ cursor: "pointer" }}
              >
                <i className={`bi bi-${media.icon} app-icon`}></i>
                <span className="app-name">{media.platform}</span>
              </li>
            ))
          ) : (
            <p>No media added yet.</p>
          )}
        </ul>
      </div>

      {/* Add New Media Button */}
      <div className="add-new-app">
        <button
          className="btn btn-primary"
          id="addAppBtn"
          onClick={handleAddNewApp}
        >
          <i className="bi bi-plus-circle"></i> Add New Social
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
