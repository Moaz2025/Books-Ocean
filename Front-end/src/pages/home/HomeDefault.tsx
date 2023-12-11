// HomeDefault.tsx
import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Book } from '../../model/book';
import SearchBar from '../../components/SearchBar';

interface HomeDefaultProps {
  selectedBook: Book | null;
}

const HomeDefault = ({ selectedBook }: HomeDefaultProps) => {
  console.log('Selected Book in HomeDefault:', selectedBook);

  return (
    <Box>
      <SearchBar onSearch={(_query, searchBy) => {}} />
      {selectedBook ? (
        <Card>
          <CardMedia component="img" height="140" image={selectedBook.coverImageLink} alt={selectedBook.title} />
          <CardContent>
            <Typography variant="h5">{selectedBook.title}</Typography>
            <Typography variant="subtitle1">Author: {selectedBook.author}</Typography>

          </CardContent>
        </Card>
      ) : (
        <p>No book selected.</p>
      )}
    </Box>
  );
};

export default HomeDefault;
