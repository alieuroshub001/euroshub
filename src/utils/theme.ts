// Theme utility functions
import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

export const useTheme = (): [Theme, (theme: Theme) => void] => {
  const [theme, setThemeState] = useState<Theme>('light');

  useEffect(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setThemeState('dark');
      document.body.classList.add('dark');
    } else {
      setThemeState('light');
      document.body.classList.remove('dark');
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  return [theme, setTheme];
};