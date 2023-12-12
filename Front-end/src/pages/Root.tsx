import { Outlet } from 'react-router-dom'
import React, { useState } from 'react';
import { Button, ThemeProvider} from '@mui/material';
import { getThemeByName } from '../config/theme';
export const ThemeContext = React.createContext((themeName: string): void => {});
const Root: React.FC = (props) => {
  // State to hold the selected theme name
  const [themeName, _setThemeName] = useState('lightTheme');

  // Retrieve the theme object by theme name
  const theme = getThemeByName(themeName);
  
  const toggle = ()=>{
    if(themeName == 'lightTheme'){
      _setThemeName('darkTheme')
    }else{
      _setThemeName('lightTheme')
    }
    // console.log("Theme name", themeName)
    // console.log("Theme", theme)
  }
  return (
    <ThemeContext.Provider value={_setThemeName}>
      <ThemeProvider theme={theme}>
        <Outlet />
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export default Root
