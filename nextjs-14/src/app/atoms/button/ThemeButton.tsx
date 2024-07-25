// ThemeToggleIcon.tsx
import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const ThemeIcon: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => 
    document.body.classList.contains('dark-mode')
  );

  const toggleTheme = () => {
    document.body.classList.toggle('dark-mode');
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    // Initial theme setting based on user preference
    if (document.body.classList.contains('dark-mode')) {
      setIsDarkMode(true);
    }
  }, []);

  return (
    <div 
      onClick={toggleTheme} 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        cursor: 'pointer' 
      }}
    >
      {isDarkMode ? (
        <SunIcon className="h-7 w-7 text-gray-700 relative bg-transparent rounded-full p-1 shadow-none transition-none bg-none" />
      ) : (
        <MoonIcon className="h-7 w-7 text-gray-700 relative bg-transparent rounded-full p-1 shadow-none transition-none bg-none" />
      )}
    </div>
  );
};

export default ThemeIcon;
