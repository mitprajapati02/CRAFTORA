import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link, useNavigate } from 'react-router-dom';


import '../assets/styles/sidebar.css'
import '../assets/styles/offcanvas.css'

const Sidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleProfile = () => {
    if(user){
      navigate('/userProfile');
    }else{
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

      {/* Second Section: Reminders */}
      <div className="reminders-section mt-4">
        <h5>Reminders</h5>
        <ul className="list-group mt-2">
          <li className="list-group-item">
            <span className="reminder-name">Pay Bills</span><br />
            <small className="reminder-date">2024-11-20</small>
          </li>
          <li className="list-group-item">
            <span className="reminder-name">Project Deadline</span><br />
            <small className="reminder-date">2024-11-25</small>
          </li>
        </ul>
      </div>

      {/* Third Section: To-Do List */}
      <div className="todo-section mt-4">
        <h5>To-Do List</h5>
        <ul className="list-group mt-2">
          <li className="list-group-item">
            <span className="todo-name">Update Profile</span><br />
            <small className="app-name">Facebook</small>
          </li>
          <li className="list-group-item">
            <span className="todo-name">Post New Photo</span><br />
            <small className="app-name">Instagram</small>
          </li>
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
