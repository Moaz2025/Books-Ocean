// Profile.tsx
import React, { useState } from 'react';
import { Typography, TextField, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Profile = () => {
  // Assuming user data is received from your backend
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    // Add other profile data as needed
  });

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <Box>
        <Typography variant="h6" gutterBottom>
          Personal Information
        </Typography>
        <TextField
          label="First Name"
          value={userData.firstName}
          fullWidth
          disabled
        />
        <TextField
          label="Last Name"
          value={userData.lastName}
          fullWidth
          disabled
        />
        <TextField label="Email" value={userData.email} fullWidth disabled />
      </Box>
      {/* Add other profile sections as needed */}

      {/* Add Edit Profile Button */}
      <Button
        variant="contained"
        color="primary"
        component={Link} // Use Link from react-router-dom
        to="/profile/edit" // Specify the edit route
        style={{ marginTop: '20px' }}
      >
        Edit Profile
      </Button>
    </div>
  );
};

export default Profile;
