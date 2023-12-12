// pages/BookUserPage.tsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, CircularProgress, Box, styled } from '@mui/material';
import { Book } from '../../model/book';

const StyledCard = styled(Card)({
  maxWidth: 600,
  margin: 'auto',
  marginTop: 20,
  padding: 20,
  textAlign: 'center',
});

const StyledCardMedia = styled(CardMedia)({
  height: 140,
});

const BookUserPage = ({ bookId }: { bookId: number }) => {
  const [book, setBook] = useState<Book | null>({
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
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulating asynchronous book data fetching
    fetchBookData(bookId)
      .then((data) => setBook(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [bookId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!book) {
    return <div>No book data available.</div>;
  }

  return (
    <StyledCard>
      <StyledCardMedia component="img" height="140" image={book.coverImageLink} alt={book.title} />
      <CardContent>
        <Typography variant="h5">{book.title}</Typography>
        <Typography variant="subtitle1">Author: {book.author}</Typography>
        <Typography variant="body1">Description: {book.description}</Typography>
        <Typography variant="body2">ISBN: {book.isbn}</Typography>
        <Typography variant="body2">Price: ${book.price}</Typography>
        <Typography variant="body2">Category: {book.category}</Typography>
        <Typography variant="body2">Publish Date: {book.publishDate ? book.publishDate.toDateString() : 'N/A'}</Typography>
        <Typography variant="body2">Publisher: {book.publisher}</Typography>
        <Typography variant="body2">Pages: {book.pagesNumber}</Typography>
        <Typography variant="body2">Amount: {book.amount}</Typography>
      </CardContent>
    </StyledCard>
  );
};

// Simulating book data fetching
const fetchBookData = async (bookId: number): Promise<Book> => {
  // You can replace this with your actual data fetching logic
  const response = await fetch(`/api/books/${bookId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch book data');
  }
  const data: Book = await response.json();
  return data;
};

export default BookUserPage;
