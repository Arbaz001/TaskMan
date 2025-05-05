import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeContext';

const DarkModeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg rounded-full p-3 flex items-center justify-center transition-colors duration-300 hover:bg-purple-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
    >
      {theme === 'dark' ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-purple-700" />}
    </button>
  );
};

export default DarkModeToggle; 