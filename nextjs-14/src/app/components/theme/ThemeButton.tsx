"use client";

import React, { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const ThemeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedMode = localStorage.getItem("dark-mode");
    if (storedMode) {
      setDarkMode(storedMode === "true");
      document.documentElement.classList.toggle("dark", storedMode === "true");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("dark-mode", newMode.toString());
      document.documentElement.classList.toggle("dark", newMode);
      return newMode;
    });
  };

  return (
    <div
      className=""
      onClick={toggleDarkMode}
    >
      {darkMode ? (
        <SunIcon className="h-6 w-6 text-gray-400" />
      ) : (
        <MoonIcon className="h-6 w-6 text-gray-400" />
      )}
    </div>
  );
};

export default ThemeToggle;
