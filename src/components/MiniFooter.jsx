import React from 'react';
import '../assets/styles/miniFooter.css';
import { useState, useEffect } from 'react';

const MiniFooter = () => {

  const storedTheme = localStorage.getItem('theme') || 'light';
  // eslint-disable-next-line no-unused-vars
  const [darkMode, setDarkMode] = useState(storedTheme === 'dark');
  
    // Apply theme styles when darkMode changes
    useEffect(() => {
      document.body.style.backgroundColor = darkMode ? '#0f0f0f' : '#d5ebe1';
      document.body.style.color = darkMode ? '#d5ebe1' : '#272828';
  
      document.querySelector('.footer-container').style.backgroundColor = darkMode ? '#0f0f0f' : '#d5ebe1';
      document.querySelector('.main-container').style.backgroundColor = darkMode ? '#0f0f0f' : '#d5ebe1';
      document.querySelector('.main-content').style.backgroundColor = darkMode ? '#0f0f0f' : '#d5ebe1';
      document.querySelector('.all-container').style.backgroundColor = darkMode ? '#0f0f0f' : '#d5ebe1';
      
  
      document.querySelectorAll('.card-front').forEach((card) => {
        card.style.backgroundColor = darkMode ? '#d7ede3' : '#0f0f0f';
        card.style.color = darkMode ? '#0f0f0f' : '#d7ede3';
      });
  
      document.querySelectorAll('.main-container > div').forEach((div) => {
        div.style.backgroundColor = darkMode ? '#0f0f0f' : '#d7ede3';
        div.style.color = darkMode ? '#d7ede3' : '#0f0f0f';
      });
    }, [darkMode]);
    
  return (
    <footer className="footer-container container-xxl">
      <div className="row justify-content-center">
        <div className="div-3 mt-3 col-md-10 mx-auto">
          <p>© 2024 Craftora. All rights reserved. Built with creativity and purpose.</p>
        </div>
      </div>
    </footer>
  );
};

export default MiniFooter;
