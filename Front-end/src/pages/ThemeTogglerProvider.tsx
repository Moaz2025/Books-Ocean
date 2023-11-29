// ThemeToggler.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeTogglerProviderProps {
  children: ReactNode;
}

const ThemeTogglerProvider = ({ children }: ThemeTogglerProviderProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const themeConfig = createTheme({
    palette: {
      mode: theme,
    },
  });

  const contextValue: ThemeContextType = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={themeConfig}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeTogglerProvider');
  }
  return context;
};

export { ThemeTogglerProvider, useTheme };