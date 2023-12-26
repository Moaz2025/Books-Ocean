import React, { useState, ChangeEvent } from 'react';
import { Button, TextField, Typography } from '@mui/material';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    // Add other form fields as needed
  });

  const [updateStatus, setUpdateStatus] = useState('');
  const [error, setError] = useState('');

  const updateProfile = async () => {
    try {
      // Simulate API call
      setUpdateStatus('Updating...');
      setError('');

      // Add your actual API endpoint and request logic here
      // const response = await api.updateProfile(formData);

      // Simulate success or error based on conditions
      const success = Math.random() > 0.5;

      if (success) {
        setUpdateStatus('Profile updated successfully!');
      } else {
        throw new Error('Update failed. Please try again.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Error updating profile. Please try again.');
      setUpdateStatus('');
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Edit Profile
      </Typography>
      <form>
        <TextField
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          fullWidth
          required
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          fullWidth
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          required
        />
        {/* Add other form fields as needed */}
        <Button variant="contained" color="primary" onClick={updateProfile}>
          Update Profile
        </Button>
      </form>
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
      {updateStatus && !error && (
        <Typography variant="body2" color="textSecondary">
          {updateStatus}
        </Typography>
      )}
    </div>
  );
};

export default EditProfile;
