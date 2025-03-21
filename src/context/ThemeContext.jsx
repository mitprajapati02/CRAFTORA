import { createContext, useContext, useState, useEffect } from 'react';

// Create Theme Context
const ThemeContext = createContext();

// Custom Hook to use Theme Context
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Check localStorage for saved theme or default to light mode
  const storedTheme = localStorage.getItem('theme') || 'light';
  const [darkMode, setDarkMode] = useState(storedTheme === 'dark');

  // Function to toggle theme
  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

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
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
