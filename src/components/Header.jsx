
import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';


import Logo from '../assets/images/LOGO_header.png'

import '../assets/styles/header.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';



const Header = () => {
  const { darkMode, toggleTheme } = useTheme();
  const [pageName, setPageName] = useState('user-dashboard');
  const location = useLocation();
  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const filteredPath = pathSegments.filter(segment => isNaN(segment) && !/[0-9a-fA-F]{24}/.test(segment));
    setPageName(filteredPath.join('/'));
  }, [location]);


  const user = localStorage.getItem('user');

  return (
    <header className="header">
      <div className="header-left d-flex align-items-center">
        <i
          className="bi bi-layout-sidebar-inset icon-hover d-md-none"
          data-bs-toggle="offcanvas"
          data-bs-target="#navbarOffcanvas"
        ></i>
        <span className="logo d-md-none">
          <img src={Logo} alt="Logo" width="150px" />
        </span>
        <i className="bi bi-star-fill icon-hover d-none d-md-inline"></i>
        <span className="d-none d-md-inline"><Link to="/user-dashboard" className="text-decoration-none " style={{ color: '#7f91f2' }}>Dashboard</Link> | {pageName || 'user-dashboard'}</span>
      </div>
      <div className="header-right d-flex align-items-center gap-3">
        <div className="search-bar d-none d-sm-flex">
          <i className="bi bi-search icon-hover"></i>
          <input type="text" placeholder="Search" />
          <i className="bi bi-command icon-hover"></i>
        </div>
        <i
          className="bi bi-search icon-hover d-block d-sm-none"
          data-bs-toggle="offcanvas"
          data-bs-target="#searchOffcanvas"
        ></i>
        <i
          className={`bi ${darkMode ? 'bi-moon-fill' : 'bi-brightness-high'} icon-hover theme-toggle`}
          onClick={toggleTheme}
        ></i>
        {user ? (
          <Link to="/add-media" className="text-decoration-none">
            <i className="bi bi-plus icon-hover " style={{ color: '#7f91f2' }}></i>
          </Link>
        ) : (
          <Link to="/login" className="text-decoration-none">
            <i className="bi bi-plus icon-hover " style={{ color: '#7f91f2' }}></i>
          </Link>
        )}
        <i
          className="bi bi-layout-sidebar-inset-reverse icon-hover d-md-none"
          data-bs-toggle="offcanvas"
          data-bs-target="#sidebarOffcanvas"
        ></i>
      </div>
    </header>
  );
};

export default Header;
