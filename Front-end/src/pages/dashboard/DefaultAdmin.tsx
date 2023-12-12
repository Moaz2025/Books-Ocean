import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
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
const DefaultAdmin = () => {
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
    <p>Admin Default</p>
    // <ThemeProvider theme={theme}>
    //   <CustomAppBar 
    //       onLogout={handleLogout}
    //       onProfileOpen={handleProfileOpen}
    //       appName="Books Ocean"
    //     />
    //   <Container component="main" maxWidth="xs">
    //     <CssBaseline />

    //     {booksLoading ? <LoadingCircle /> :
    //       <div>
    //         <BookDisplay book={books[0]} onClick={()=>{console.log("Click Book")}}/>
    //         <BookDisplay book={books[1]} onClick={()=>{console.log("Click Book")}}/>
    //       </div>
    //     }
    //   </ Container >
    // </ ThemeProvider >
      
  );
}

export default DefaultAdmin
