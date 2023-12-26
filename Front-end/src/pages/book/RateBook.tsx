// RateBook.tsx
import React, { useState } from 'react';
import { Box, Rating, Button, Typography, TextField } from '@mui/material';

const RateBook = () => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (_event: any, newValue: React.SetStateAction<number>) => {
    setRating(newValue);
  };

  const submitRating = () => {
    // Implement logic to submit the rating, possibly through an API call
    console.log(`Submitted rating: ${rating}`);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Rate this book
      </Typography>
      <Rating
        name="book-rating"
        value={rating}
        precision={0.5}
        onChange={handleRatingChange}
      />
      <Button variant="contained" color="primary" onClick={submitRating}>
        Submit Rating
      </Button>
    </Box>
  );
};

export default RateBook;
