import "../assets/styles/MiniHeader.css"
import Logo from "../assets/images/LOGO_header.png"

import { useTheme } from "../context/ThemeContext";

const MiniHeader = () => {

   const { darkMode, toggleTheme } = useTheme();
    return (
      <header className="header">
        {/* Left Section */}
        <div className="header-left d-flex align-items-center">
          <i className="bi bi-back icon-hover"></i>
          <span className="d-none d-md-inline">Dashboard | Default</span>
        </div>
        {/* Logo Section */}
        <div className="header-right d-flex align-items-center">
          <span className="logo">
            <img src={Logo} alt="Logo" width="150px" className="craftoraLogo" />
          </span>
        </div>
  
        {/* Right Section - Theme Toggle */}
        <div className="header-right d-flex align-items-center gap-3">
        <i
          className={`bi ${darkMode ? "bi-moon-fill" : "bi-brightness-high"} icon-hover theme-toggle`}
          onClick={toggleTheme}
        ></i>
        </div>
      </header>
    );
  };
  export default MiniHeader;