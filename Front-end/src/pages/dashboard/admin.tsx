import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link, Outlet } from 'react-router-dom';
import { Button, Container, CssBaseline, ThemeProvider } from '@mui/material';
import { isAuthenticated } from '../../services/auth'
import { useNavigate } from 'react-router-dom';
import {useEffect, useState} from 'react'
import { logout } from '../../services/auth';
import CircularProgress from '@mui/material/CircularProgress';
import { router } from '../../services/router';
import ButtonAppBar from '../../components/AppBar';
import DashboardAppBar from '../../components/AppBar';
import CustomAppBar from '../../components/AppBar';
import About from '../about/About';
import BookTable from '../book/BookTable';
import { getAllBooks } from '../../services/books';
import { Book } from '../../model/book';
import { useTheme } from '../ThemeTogglerProvider';
import BookDisplay from '../../components/BookDisplay';
import LoadingCircle from '../../components/LoadingCircle';
const Admin = () => {
  const {theme, toggleTheme} = useTheme();
  const [books, setBooks] = useState<Book[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [booksLoading, setBooksLoading] = useState(true);
  const handleLogout = () =>{
    console.log('Logging out!')
    logout().then(()=>{
      navigate('/login')
    })
  }

  const handleProfileOpen = () => {
    navigate('/profile')
  };

  useEffect(()=>{
    const checkAuthentication = async () => {
      const route = router();
      if (route != '/admin') {
        navigate(route);
      }
      setLoading(false);
    };
    checkAuthentication()
    getAllBooks()
      .then(
        (value)=>{
          setBooksLoading(false)
          setBooks(value)
        }
      )
  }, [])
  if (loading) {
    <LoadingCircle></LoadingCircle>
  }
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CustomAppBar />
      <CssBaseline />
      <Container style={{width:'100%', maxWidth:'100%'}}>
        <Outlet></Outlet>
      </ Container >
    </ ThemeProvider >
  );
}

export default Admin
