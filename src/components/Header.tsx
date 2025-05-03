import React from 'react';
import { BookOpen, Moon, Sun } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Header: React.FC = () => {
  const { state, toggleDarkMode } = useApp();
  const { isDarkMode } = state;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-lg bg-white/30 dark:bg-black/30 border-b border-white/20 dark:border-gray-800/30 transition-all duration-500 ease-in-out">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-xl font-medium text-gray-900 dark:text-white">Journey Diary</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;