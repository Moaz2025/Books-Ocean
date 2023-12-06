import { Outlet } from 'react-router-dom'
import React, { useState } from 'react';
import { ThemeProvider} from '@mui/material';
import { getThemeByName } from '../config/theme';
export const ThemeContext = React.createContext<{
  themeName: string;
  setThemeName: (themeName: string) => void;
}>({
  themeName: 'lightTheme',
  setThemeName: () => {},
});const Root: React.FC = (props) => {
  // State to hold the selected theme name
  const [themeName, _setThemeName] = useState('lightTheme');

  // Retrieve the theme object by theme name
  const theme = getThemeByName(themeName);
  
  const setThemeName = (newThemeName: string) => {
    _setThemeName(newThemeName);
  };

  const toggle = () => {
    // Toggle between light and dark themes
    setThemeName(themeName === 'lightTheme' ? 'darkTheme' : 'lightTheme');
  };

  return (
    <ThemeContext.Provider value={{ themeName, setThemeName }}>
      <ThemeProvider theme={theme}>
        <Outlet />
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export default Root
