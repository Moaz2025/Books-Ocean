import React, { useEffect,ChangeEvent, FormEvent, useState } from 'react';

import { TextField, Button, Grid, Paper, Typography, Container  } from '@mui/material';

import { Book } from '../../model/book';
import { addBook, deleteBook, editBook, getBookById } from '../../services/books';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { notify } from '../signUp/SignUp';


const BookEdit:React.FC = () => {
  const { id } = useParams();
  var currentBook:Book;
  const navigate = useNavigate();

  const [bookData, setBookData] = useState<Book>({
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

  const handleEdit = (e: any) => {
    e.preventDefault();
    // Send the bookData to the backend for processing
    console.log('edit:', bookData);
    editBook(bookData, bookData.id)
      .then((message)=>{
        if(message.includes('error')){
          notify(message.substring(6), 'error')
        }else{
          notify(message, 'success')
        }
      });
    // addBook(bookData);
    // You can add an API call here to send the data to the backend
  };

  const handleDelete = (e: any) => {
    e.preventDefault();
    // Send the bookData to the backend for processing
    console.log('delete:', bookData);
    deleteBook(bookData.id)
      .then((message)=>{ 
        if(message.includes('error')){
          notify(message.substring(6), 'error')
        }else{
          notify(message, 'success')
        }
        const routing = setTimeout(
          ()=>{
            navigate('/')
          },1500
        )
      });
    // addBook(bookData);
    // You can add an API call here to send the data to the backend
  };

  return (
    <Container component="main" maxWidth="md">
      <ToastContainer />
      <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Edit Book
        </Typography>
        <form onSubmit={handleSubmit}>
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
            <Grid item xs={12}>
              <Button onClick={handleEdit} variant="contained" color="primary">
                Edit
              </Button>
            </Grid>
            <Grid item xs={12}>
            <Button onClick={handleDelete} variant="contained" color="primary">
                Delete
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default BookEdit
