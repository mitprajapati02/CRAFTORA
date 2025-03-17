import React from "react";
import logo from "../assets/images/LOGO.png"

import { createContext, useContext, useState, useEffect } from "react";

import { Link } from "react-router-dom";


import "../assets/styles/Footer.css"

const Footer = () => {
const storedTheme = localStorage.getItem("theme") || "light";
  const [darkMode, setDarkMode] = useState(storedTheme === "dark");

  // Function to toggle theme
  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  // Apply theme styles when darkMode changes
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#0f0f0f" : "#d5ebe1";
    document.body.style.color = darkMode ? "#d5ebe1" : "#272828";

    document.querySelector(".footer-container").style.backgroundColor = darkMode ? "#0f0f0f" : "#d5ebe1";
    document.querySelector(".main-container").style.backgroundColor = darkMode ? "#0f0f0f" : "#d5ebe1";
    document.querySelector(".main-content").style.backgroundColor = darkMode ? "#0f0f0f" : "#d5ebe1";
    document.querySelector(".all-container").style.backgroundColor = darkMode ? "#0f0f0f" : "#d5ebe1";
    

    document.querySelectorAll(".card-front").forEach((card) => {
      card.style.backgroundColor = darkMode ? "#d7ede3" : "#0f0f0f";
      card.style.color = darkMode ? "#0f0f0f" : "#d7ede3";
    });

    document.querySelectorAll(".main-container > div").forEach((div) => {
      div.style.backgroundColor = darkMode ? "#0f0f0f" : "#d7ede3";
      div.style.color = darkMode ? "#d7ede3" : "#0f0f0f";
    });
  }, [darkMode]);


  return (
    <footer className="footer-container container-xxl py-4">
      <div className="row justify-content-center">
        {/* Div-1 */}
        <div className="col-md-5 div-1 me-md-3 text-center">
        <Link to="/userDashboard">
          <img src={logo} alt="Craftora Logo" className="footer-logo mb-2" />
        </Link>
          
          <p className="mb-2 text-success">Your Sanctuary for Organized Creativity.</p>
          <p className="text-light">
            Crafted with passion by <strong>Mit Prajapati</strong>, a dedicated student of Integrated Master of Science
            in Information Technology at Gujarat University. Bridging creativity and technology to forge a future of
            organized success.
          </p>
        </div>

        {/* Div-2 */}
        <div className="col-md-5 div-2">
          <div className="mb-3">
            <h5>Links</h5>
            <Link to="/userDashboard">Home</Link> | <Link to="/PrivacyPolicy">Privacy Policy</Link> | <Link to="/Terms&Service">Terms of Service</Link> | <Link to="/contactUs">Contact Us</Link>
          </div>
          <div>
            <h5>Contact</h5>
            <p>
              <strong>Name:</strong> Mit Prajapati
            </p>
            <p>
              <strong>Mobile:</strong> <a href="tel:+919099227702">+91 9099227702</a>
            </p>
            <p>
              <strong>Email:</strong> <a href="mailto:mp7702524@gmail.com">mp7702524@gmail.com</a>
            </p>
            <div className="social-icons d-flex gap-3 mt-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-github"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Div-3 */}
      <div className="div-3 mt-3 col-md-10 mx-auto text-center">
        <p>© 2024 Craftora. All rights reserved. Built with creativity and purpose.</p>
      </div>
    </footer>
  );
};

export default Footer;
