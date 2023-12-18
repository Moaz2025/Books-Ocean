import React from 'react';
import { Container, Typography, Paper, Button } from '@mui/material';

const About: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          About Books Ocean
        </Typography>
        <Typography variant="body1">
          Welcome to Books Ocean, your online destination for a wide variety of books.
        </Typography>
        <Typography variant="body1">
          Our mission is to provide book enthusiasts with a convenient and enjoyable platform to
          explore and purchase their favorite books.
        </Typography>
        <Typography variant="body1">
          Whether you are into fiction, non-fiction, fantasy, or any other genre, we have a vast
          collection that caters to all tastes.
        </Typography>
        <Typography variant="body1">
          Happy reading with Books Ocean!
        </Typography>
      </Paper>
    </Container>
  );
};

export default About;