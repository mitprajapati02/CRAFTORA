import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiRequest } from '../utils/apiService';


import '../assets/styles/sidebar.css'
import '../assets/styles/offcanvas.css'

const Sidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [data, setData] = useState([]);






  useEffect(() => {
    const fetchUsertasks = async () => {
      try {
        const response = await apiRequest('social/tasks', 'GET');
        // setTasks(response);
        setData(response || []); // Ensure data is always an array
      } catch (error) {
        console.error('Error fetching social media apps:', error);
      }
    };
    if (user) fetchUsertasks();
  }, []);





  const handleProfile = () => {
    if (user) {
      navigate('/userProfile');
    } else {
      navigate('/login');
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <aside className="sidebar d-none d-md-block">
      {/* Top Section: Profile */}
      <div className="top-section">
        <button className="btn btn-primary w-100 mb-3 mt-3" onClick={handleProfile}>Profile
        </button>
      </div>


      {/* Reminders Section */}
      <div className="reminders-section mt-4">
        <h5>Reminders</h5>
        <ul className="list-group mt-2">
          {data.length > 0 ? (
            data.slice(0, 3).map((app, appIndex) =>
              (app.reminders || []).slice(0, 3).map((reminder, index) => (
                <li key={`${appIndex}-${index}`} className="list-group-item">
                  <span className="reminder-name">{reminder.reminder}</span>
                  <br />
                  <small className="reminder-date">
                    {new Date(reminder.date).toLocaleDateString()}
                  </small>
                </li>
              ))
            )
          ) : (
            <li className="list-group-item">No reminders available</li>
          )}
        </ul>
      </div>

      {/* To-Do List Section */}
      <div className="todo-section mt-4">
        <h5>To-Do List</h5>
        <ul className="list-group mt-2">
          {data.length > 0 ? (
            data.slice(0, 3).map((app, appIndex) =>
              (app.tasks || []).slice(0, 3).map((task, index) => (
                <li key={`${appIndex}-${index}`} className="list-group-item">
                  <span className="todo-name">{task.task}</span>
                  <br />
                  <small className="app-name">{app.platform}</small>
                </li>
              ))
            )
          ) : (
            <li className="list-group-item">No tasks available</li>
          )}
        </ul>
      </div>

      {/* Sign Out Button */}
      <div className="bottom-section mt-auto">
        <button className="btn btn-danger w-100" onClick={handleSignOut}>Sign Out</button>
      </div>
    </aside>
  );
};

export default Sidebar;
