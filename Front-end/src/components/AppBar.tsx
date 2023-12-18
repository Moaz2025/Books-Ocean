import React, { MouseEvent, useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../pages/ThemeTogglerProvider';
import { logout } from '../services/auth';
import { ThemeContext } from '../pages/Root';


interface CustomAppBarProps {
  onLogout?: () => any;
  onProfileOpen?: () => any;
  appName?: string;
}

const appName = 'Books Ocean'
const CustomAppBar: React.FC<CustomAppBarProps> = () => {
  const navigate = useNavigate();
  const handleLogout = (event: MouseEvent) => {
    event.preventDefault();
    logout()
      .then(()=>{
        navigate('/login');
    });
  };

  const handleVisitProfile = (event: MouseEvent) => {
    event.preventDefault();
    navigate('profile')
  };

  const handleVisitHome = (event: MouseEvent) => {
    event.preventDefault();
    navigate('/')
  };

  const handleVisitAbout = (event: MouseEvent) => {
    event.preventDefault();
    navigate('about')
  };

  const { themeName, setThemeName } = useContext(ThemeContext);
  const handleThemeChange = () => {
    // Toggle between light and dark themes
    setThemeName(themeName === 'lightTheme' ? 'darkTheme' : 'lightTheme');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Left side - Log out button */}
        <IconButton
          sx={{m:0.2}}
          edge="start"
          color="inherit"
          aria-label="logout"
          onClick={handleLogout}
          size='large'
        >
          <ExitToAppIcon />
        </IconButton>

        <IconButton
          sx={{m:0.2}}
          edge="start"
          color="inherit"
          aria-label="logout"
          onClick={handleVisitHome}
          size='large'
        >
          <HomeIcon />
        </IconButton>

        <IconButton
          sx={{m:0.2}}
          edge="start"
          color="inherit"
          aria-label="logout"
          onClick={handleVisitAbout}
          size='large'
        >
          <InfoIcon />
        </IconButton>
        {/* Center - App Name */}
        <Typography variant="h4" fontFamily={'cursive'} textAlign="center" component="div" sx={{ flexGrow: 1 }}>
          {appName}
        </Typography>

        <IconButton
          sx={{m:0.2}}
          edge="end"
          color="inherit"
          aria-label="profile"
          onClick={handleThemeChange}
          size='small'
          
        >
          <SettingsBrightnessIcon fontSize='large'/>
        </IconButton>

        {/* Right side - Profile button */}
        <IconButton
          sx={{m:0.2}}
          edge="end"
          color="inherit"
          aria-label="profile"
          onClick={handleVisitProfile}
          size='medium'
          
        >
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;