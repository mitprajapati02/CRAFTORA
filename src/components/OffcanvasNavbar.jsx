import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiRequest } from '../utils/apiService';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import '../assets/styles/navbar.css';
import '../assets/styles/offcanvas.css';

const OffcanvasNavbar = () => {
  const navigate = useNavigate();
  const { appId } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));
  const [mediaList, setMediaList] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  let userName = user?.username || 'User';

  useEffect(() => {
    const fetchUserMedia = async () => {
      try {
        const response = await apiRequest('social/socialApps', 'GET');
        setMediaList(response);
        setProfilePic(response[0]?.profilePic);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching social media apps:', error);
      }
    };
    if (user) fetchUserMedia();
  }, []);

  const handleMediaSelect = (media) => {
    setSelectedMedia(media);
    navigate(`/app-dashboard/${media.id}`);
  };

  const handleAddNewApp = () => {
    if (user) {
      navigate('/add-media');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="offcanvas offcanvas-start" id="navbarOffcanvas">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Navbar</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
      </div>
      <div className="offcanvas-body">
        {/* User Profile */}
        <div className="user-profile">
          <img
            src={profilePic ? `${profilePic}` : '/default-profile.png'}
            alt="Profile"
            className="profile-pic"
          />
          <p className="user-name">{userName}</p>
        </div>

        {/* Social Apps List */}
        <div className="social-apps">
          <ul>
            {mediaList.length > 0 ? (
              mediaList.map((media) => (
                <li
                  key={media.id}
                  className={`app-item ${media?.id === appId ? 'active' : ''}`}
                  onClick={() => handleMediaSelect(media)}
                  style={{ cursor: 'pointer' }}
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

        {/* Add New Social Media Button */}
        <div className="add-new-app">
          <button className="btn btn-primary" id="addAppBtn" onClick={handleAddNewApp}>
            <i className="bi bi-plus-circle"></i> Add New Social
          </button>
        </div>
      </div>
    </div>
  );
};

export default OffcanvasNavbar;
