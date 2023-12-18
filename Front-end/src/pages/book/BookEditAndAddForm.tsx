import React, { ChangeEvent, FormEvent, useState } from 'react';
import { TextField, Button, Grid, Paper, Typography, Container  } from '@mui/material';

import { Book } from '../../model/book';
import { addBook } from '../../services/books';

interface BookEditAndAddFormProps{
    book?:Book
}
const BookEditAndAddForm:React.FC<BookEditAndAddFormProps> = ({book}) => {
  const [bookData, setBookData] = useState<Book>(book ? book : {
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookData((prevData: Book) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleSelectChange = (e: ChangeEvent<{ value: unknown }>) => {
  //   const { name, value } = e.target as { name: string; value: unknown };
  //   setBookData((prevData: Book) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookData((prevData: Book) => ({
      ...prevData,
      [name]: new Date(value),
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Send the bookData to the backend for processing
    console.log('Book data submitted:', bookData);
    addBook(bookData);
    // You can add an API call here to send the data to the backend
  };

  return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                required
                value={bookData.title}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={4}
                value={bookData.description}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="ISBN"
                name="isbn"
                required
                value={bookData.isbn}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                required
                value={bookData.price}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Author"
                name="author"
                required
                value={bookData.author}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Category"
                name="category"
                type="text"
                value={bookData.category}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Publisher"
                name="publisher"
                type="text"
                value={bookData.publisher}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Pages Number"
                name="pagesNumber"
                type="number"
                value={bookData.pagesNumber}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Cover Image Link"
                name="coverImageLink"
                value={bookData.coverImageLink}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                fullWidth
                label="Publish Date"
                name="publishDate"
                type="date"
                value={bookData.publishDate?.toISOString().split('T')[0] || ''}
                onChange={handleDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Amount"
                name="amount"
                type="number"
                required
                value={bookData.amount}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
  );
}

export default BookEditAndAddForm
