import '../assets/styles/MiniHeader.css'
import Logo from '../assets/images/LOGO_header.png'

import { useTheme } from '../context/ThemeContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
const MiniHeader = () => {

   const { darkMode, toggleTheme } = useTheme();
   const navigate = useNavigate();
   const [pageName, setPageName] = useState('Default');
   const location = useLocation();
   useEffect(() => {
    const path = location.pathname;
    setPageName(path.split('/').pop());
  }, [location]);
   const handleBack = () => {
    navigate(-1);
   };
    return (
      <header className="header">
        {/* Left Section */}
        <div className="header-left d-flex align-items-center">
          <i className="bi bi-back icon-hover" onClick={handleBack}></i>
          <span className="d-none d-md-inline"><Link to="/userDashboard" className="text-decoration-none " style={{color: '#7f91f2'}}>Dashboard</Link> | {pageName || 'Default'} </span>
        </div>
        {/* Logo Section */}
        <div className="header-right d-flex align-items-center">
          <span className="logo">
            <Link to="/userDashboard" className="text-decoration-none ">
              <img src={Logo} alt="Logo" width="150px" className="craftoraLogo" />
            </Link>
          </span>
        </div>
  
        {/* Right Section - Theme Toggle */}
        <div className="header-right d-flex align-items-center gap-3">
        <i
          className={`bi ${darkMode ? 'bi-moon-fill' : 'bi-brightness-high'} icon-hover theme-toggle`}
          onClick={toggleTheme}
        ></i>
        </div>
      </header>
    );
  };
  export default MiniHeader;
