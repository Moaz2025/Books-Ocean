// ReviewBook.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Button } from '@mui/material';

interface ReviewBookProps {
  bookId: string; // Assuming bookId is a unique identifier for each book
}

const ReviewBook: React.FC<ReviewBookProps> = ({ bookId }) => {
  const [review, setReview] = useState('');
  const [user, setUser] = useState(''); // Assuming user is the username

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setReview(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Save the review and user information to your backend
    // (Make an API call to save the review along with the user ID)

    // Reset the form
    setReview('');
    setUser('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Your Review"
        name="review"
        multiline
        rows={4}
        value={review}
        onChange={handleInputChange}
        required
      />
      <TextField
        fullWidth
        label="Your Username"
        name="user"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Submit Review
      </Button>
    </form>
  );
};

export default ReviewBook;
