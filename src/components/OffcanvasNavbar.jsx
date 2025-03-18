import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "../assets/styles/navbar.css"
import "../assets/styles/offcanvas.css"

const OffcanvasNavbar = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  let userName;
   if(user){
    userName = user.username;
  }
    const navigate = useNavigate();
  const handleAddNewApp = () => {
    if(user){
      navigate("/addMedia");
    }else{
      navigate("/login");
    }
  };

  return (
    <div className="offcanvas offcanvas-start" id="navbarOffcanvas">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Navbar</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
      </div>
      <div className="offcanvas-body">
        {/* Top row with user profile */}
        <div className="user-profile">
          <img src="user-profile-pic.jpg" alt="User Profile" className="profile-pic" />
          <p className="user-name">{userName}</p>
        </div>

        {/* Social Apps List */}
        <div className="social-apps">
          <ul>
            <li className="app-item active" id="app1">
              <i className="bi bi-facebook app-icon"></i>
              <span className="app-name">Facebook</span>
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
          <button className="btn btn-primary" id="addAppBtn" onClick={handleAddNewApp}>
            <i className="bi bi-plus-circle"></i> Add New Social
          </button>
        </div>
      </div>
    </div>
  );
};

export default OffcanvasNavbar;
