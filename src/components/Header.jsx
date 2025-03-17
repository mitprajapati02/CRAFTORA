
import React, { useState } from "react";
import "../assets/styles/header.css"; // Import CSS
import "bootstrap-icons/font/bootstrap-icons.css"; // Bootstrap Icons
import "bootstrap/dist/css/bootstrap.min.css";

import { useTheme } from "../context/ThemeContext";


import Logo from "../assets/images/LOGO_header.png"

const Header = () => {
  const { darkMode, toggleTheme } = useTheme();

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
        <span className="d-none d-md-inline">Dashboard | Default</span>
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
          className={`bi ${darkMode ? "bi-moon-fill" : "bi-brightness-high"} icon-hover theme-toggle`}
          onClick={toggleTheme}
        ></i>
        <i className="bi bi-plus icon-hover"></i>
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
