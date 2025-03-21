import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {theme === 'light' ? '🌞 Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default ThemeToggle;
