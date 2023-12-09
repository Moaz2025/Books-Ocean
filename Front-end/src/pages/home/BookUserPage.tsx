// pages/BookUserPage.tsx

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Book } from '../../model/book';
import { useParams } from 'react-router-dom';
import { getBookById } from '../../services/books';

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
      }, [])
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