import React, { MouseEvent } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
interface CustomAppBarProps {
  onLogout: () => any;
  onProfileOpen: () => any;
  appName: string;
}

const CustomAppBar: React.FC<CustomAppBarProps> = ({ onLogout, onProfileOpen, appName }) => {
  const handleLogout = (event: MouseEvent) => {
    event.preventDefault();
    onLogout();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Left side - Log out button */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="logout"
          onClick={onLogout}
          size='large'
        >
            <ExitToAppIcon></ExitToAppIcon>
        </IconButton>
        {/* Center - App Name */}
        <Typography variant="h6" textAlign="center" component="div" sx={{ flexGrow: 1 }}>
          {appName}
        </Typography>

        {/* Right side - Profile button */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="profile"
          onClick={onProfileOpen}
          size='large'
          
        >
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;