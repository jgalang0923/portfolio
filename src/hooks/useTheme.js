// src/hooks/useTheme.js
import { useState, useEffect } from 'react';

const useTheme = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [themePreference, setThemePreference] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('themePreference') || 'system';
    }
    return 'system';
  });

  const setThemeLight = () => {
    setThemePreference('light');
    localStorage.setItem('themePreference', 'light');
  };

  const setThemeDark = () => {
    setThemePreference('dark');
    localStorage.setItem('themePreference', 'dark');
  };

  const setThemeSystem = () => {
    setThemePreference('system');
    localStorage.setItem('themePreference', 'system');
  };

  useEffect(() => {
    let mediaQuery;
    let handleChange;

    if (themePreference === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);

      mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      handleChange = (e) => setDarkMode(e.matches);
      mediaQuery.addEventListener('change', handleChange);
    } else {
      setDarkMode(themePreference === 'dark');
    }

    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    return () => {
      if (mediaQuery && handleChange) {
        mediaQuery.removeEventListener('change', handleChange);
      }
    };
  }, [themePreference, darkMode]);

  return { darkMode, themePreference, setThemeLight, setThemeDark, setThemeSystem };
};

export default useTheme;