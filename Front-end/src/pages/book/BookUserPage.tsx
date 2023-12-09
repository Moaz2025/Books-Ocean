// pages/BookUserPage.tsx

import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Book } from '../../model/book';

const book:Book= {
  title: "A People's History of the United States",
  description: 'History of US',
  id: 3,
  isbn: '978-0-06-196558-6',
  price: 24.99,
  author: 'Howard Zinn',
  category: 'History',
  publishDate: new Date('1980-11-17'),
  publisher: 'Book-Magazine',
  pagesNumber: 325,
  amount: 7,
  coverImageLink: 'https://m.media-amazon.com/images/I/51j6xwoWduL._SX342_SY445_.jpg',
};

const BookUserPage = () => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={book.coverImageLink}
        alt={book.title}
      />
      <CardContent>
        <Typography variant="h5">{book.title}</Typography>
        <Typography variant="subtitle1">Author: {book.author}</Typography>
        <Typography variant="body1">Description: {book.description}</Typography>
        {/* Add more details as needed */}
      </CardContent>
    </Card>
  );
};

export default BookUserPage;
