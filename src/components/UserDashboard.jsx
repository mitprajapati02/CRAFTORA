import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/styles/UserDashboard.css'
import { apiRequest } from '../utils/apiService';
import { useEffect, useState } from 'react';

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log('user',user)
  const [socialMediaData, setSocialMediaData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log('user',user)
    const fetchApps = async () => {
      if (user) {
        try {
          const response = await apiRequest('social/socialApps', 'GET');
          setSocialMediaData(response);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Error fetching social media apps:', error);
        }
      }
    };

    fetchApps();
  }, []);

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
                <i className={data.icon}></i>
              </div>
              <div className="card-back">
                <h5>{data.platform}</h5>
                <ul>
                  {data.tasks.slice(0, 2).map((taskObj) => (
                    <li className="task-item">
                      <p>{taskObj.task}</p>
                    </li>
                  ))}
                </ul>
                <button type="button" onClick={() => navigate(`/app-dashboard/${data.id}`)} className="btn btn-primary">View</button>
              </div>
            </div>
          </div>
        ))
      ) : null}

      <div className="add-card">
        <center>
          {user ? (<Link to="/add-media" className="text-decoration-none "> <i className="bi bi-plus"></i></Link>) : (
            <Link to="/login" className="text-decoration-none "> <i className="bi bi-plus"></i></Link>
          )}
        </center>
      </div>
    </div>
  );
};

export default UserDashboard;
