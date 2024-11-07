// pages/BookUserPage.tsx

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, IconButton, Paper, Typography } from '@mui/material';
import { Book } from '../../model/book';
import { useParams } from 'react-router-dom';
import { addBookToCart, getBookById } from '../../services/books';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { addToCart } from '../../services/cart';
// const book:Book= {
//   title: "A People's History of the United States",
//   description: 'History of US',
//   id: 3,
//   isbn: '978-0-06-196558-6',
//   price: 24.99,
//   author: 'Howard Zinn',
//   category: 'History',
//   publishDate: new Date('1980-11-17'),
//   publisher: 'Book-Magazine',
//   pagesNumber: 325,
//   amount: 7,
//   coverImageLink: 'https://m.media-amazon.com/images/I/51j6xwoWduL._SX342_SY445_.jpg',
// };

const BookUserPage = () => {
  const { id } = useParams();
  const [book, setBookData] = useState<Book>({
      title: '',
      description: '',
      id: 0,
      isbn: '',
      price: 0,
      author: '',
      category: '',
      publishDate: undefined,
      publisher: '',
      pagesNumber: 0,
      coverImageLink: '',
      amount: 0,
    });
  
    useEffect(()=>{ 
      getBookById(parseInt(id!)).
        then((res)=>{
          console.log('Response ',res);
          const date: string = res.publishDate?.toString()!;
          console.log('Date AS string ', date.substring(0,10));
          res.publishDate = new Date(date.substring(0,10))
          setBookData(res);  
        });  
    }, []);

    const handleAddToCart = async (id: number) => {
      const result = await addToCart(id);
      console.log(result); 
    };
    return (
      <Paper style={{ display: 'flex', padding: '16px', margin: 5 }}>
        {/* Left side (details) */}
        <div style={{ flex: 1, paddingRight: '16px' }}>
          <Typography variant="h4" gutterBottom style={{ fontSize: '30px' }}>
            <strong>{book.title}</strong> 
          </Typography>
          <Typography variant="subtitle1" gutterBottom style={{ fontSize: '24px' }}>
            {book.description}
          </Typography>
          <Typography variant="body1" style={{ fontSize: '22px' }}>
            <strong>ISBN:</strong> {book.isbn}
          </Typography>
          <Typography variant="body1" style={{ fontSize: '22px' }}>
            <strong>Price:</strong> {book.price + ' '}LE
          </Typography>
          <Typography variant="body1" style={{ fontSize: '22px' }}>
            <strong>Author:</strong> {book.author}
          </Typography>
          <Typography variant="body1" style={{ fontSize: '22px' }}>
            <strong>Category:</strong> {book.category}
          </Typography>
          <Typography variant="body1" style={{ fontSize: '22px' }}>
            <strong>Publish Date:</strong> {book.publishDate?.toLocaleDateString()}
          </Typography>
          <Typography variant="body1" style={{ fontSize: '22px' }}>
            <strong>Publisher:</strong> {book.publisher}
          </Typography>
          <Typography variant="body1" style={{ fontSize: '22px' }}>
            <strong>Pages Number:</strong> {book.pagesNumber}
          </Typography>
          <Typography variant="body1" style={{ fontSize: '22px' }}>
            <strong>Amount:</strong> {book.amount}
          </Typography>
          <br />
          <IconButton
            sx={{ m: 0.2 }}
            edge="end"
            color="inherit"
            aria-label="profile"
            size="medium"
            onClick={() => handleAddToCart(book.id)}>
            {'Add to cart'}
            <AddShoppingCartIcon sx={{ marginX: 1 }} />
          </IconButton>
        </div>
  
        {/* Right side (image and Add to cart) */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          {book.coverImageLink && (
            <img src={book.coverImageLink} alt={book.title} style={{ maxWidth: '100%', marginTop: '16px' }} />
          )}
          <br />
        </div>
      </Paper>
    );
};

export default BookUserPage;