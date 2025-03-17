import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "../assets/styles/navbar.css"
import "../assets/styles/offcanvas.css"

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar d-none d-md-flex">
      {/* Top row with user profile */}
      <div className="user-profile">
        <img src="user-profile-pic.jpg" alt="User Profile" className="profile-pic" />
        <p className="user-name">John Doe</p>
      </div>

      {/* Social Apps List */}
      <div className="social-apps">
        <ul>
          {/* Social media app list items */}
          <li className="app-item active" id="app1">
            <i className="bi bi-facebook app-icon"></i>
              <Link to="/appDashboard"><span className="app-name">Facebook</span></Link>
            
          </li>
          <li className="app-item" id="app2">
            <i className="bi bi-twitter app-icon"></i>
            <span className="app-name">Twitter</span>
          </li>
          <li className="app-item" id="app3">
            <i className="bi bi-instagram app-icon"></i>
            <span className="app-name">Instagram</span>
          </li>
        </ul>
      </div>

      {/* Add new social app button */}
      <div className="add-new-app">
        <button className="btn btn-primary" id="addAppBtn">
          <i className="bi bi-plus-circle"></i> Add New Social
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
