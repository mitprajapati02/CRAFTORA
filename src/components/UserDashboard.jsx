import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/styles/UserDashboard.css'
import { apiRequest } from '../utils/apiService'; // Import reusable API function
import { useEffect, useState } from 'react';





const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [socialMediaData, setSocialMediaData] = useState([]);

  if (user) {

    useEffect(() => {
      const fetchApps = async () => {
        try {
          const response = await apiRequest('social/socialApps', 'GET');
          setSocialMediaData(response); // Store API response in state
        } catch (error) {
          console.error('Error fetching social media apps:', error);
        }
      };

      fetchApps(); // Call API on component mount
    }, []);
  }

  const navigate = useNavigate()


  return (
    <div className="main-container hide-scrollbar main-content">
      {user ? (
          socialMediaData.map((data, index) => (
            <div
              key={data.id}
              className={`card-container ${index % 2 === 0 ? 'odd-card' : 'even-card'}`}
            >
              <div className="card-flip">
                <div className="card-front">
                  <i className={data.icon}></i> {/* Dynamic icon */}
                </div>
                <div className="card-back">
                  <h5>{data.platform}</h5> {/* Social Media Platform Name */}
                  <ul>
                    {data.tasks.map((task, i) => (
                      <li key={i}>
                        {task} <button><i className="bi bi-check2"></i></button>
                      </li>
                    ))}
                  </ul>
                  <button type="button" onClick={() => navigate(`/appDashboard/${data.id}`)} className="btn btn-primary">View</button>
                </div>
              </div>
            </div>
          ))
      ) : null }




      <div className="add-card">
        <center>
          {user ? (<Link to="/addMedia" className="text-decoration-none "> <i className="bi bi-plus"></i></Link>) : (
            <Link to="/login" className="text-decoration-none "> <i className="bi bi-plus"></i></Link>
          )}
        </center>
      </div>

    </div>
  );
};

export default UserDashboard;
