import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Button, Card, Container, CssBaseline, Grid, IconButton, Stack, TextField, ThemeProvider } from '@mui/material';
import { isAuthenticated } from '../../services/auth'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import UpgradeIcon from '@mui/icons-material/Upgrade';
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
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [titleFilter, setTitleFilter] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
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
    navigate('profile')
  };

  const handleClickAddBook = () => {
    navigate('add')
  }

  const handleClickPromotion = () => {
    navigate('promotion')
  }

  const onClickOnBook = (id:number) => {
    navigate(`${id}`)
  }

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
          setBooks(value);
          setFilteredBooks(value);
        }
      )
  }, [])

  useEffect(() => {
    // Filter the books based on the current search criteria
    const filtered = books.filter((book) => {
      const titleMatches = book.title.toLowerCase().includes(titleFilter.toLowerCase());
      const authorMatches = book.author.toLowerCase().includes(authorFilter.toLowerCase());

      return titleMatches && authorMatches;
    });

    setFilteredBooks(filtered);
  }, [titleFilter, authorFilter]);

  if (loading) {
    return (<LoadingCircle></LoadingCircle>)
  }

  return (
    <div>
      <Stack sx={{margin:1}} width={"100%"} spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
      <IconButton
            sx={{m:0.2}}
            edge="end"
            color="inherit"
            aria-label="profile"
            size='medium'
            onClick={handleClickPromotion}
          >
            {'User Promotion'} 
            <UpgradeIcon sx={{marginX:1}} />
        </IconButton>
        <IconButton
            sx={{m:0.2}}
            edge="end"
            color="inherit"
            aria-label="profile"
            size='medium'
            onClick={handleClickAddBook}
          >
            {'Add Books'} 
            <AddCircleIcon sx={{marginX:1}} />
        </IconButton>
        <TextField
          label="Title"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
        />

        <TextField
          label="Author"
          value={authorFilter}
          onChange={(e) => setAuthorFilter(e.target.value)}
        />
      </Stack>
      
      <Stack width={"100%"} spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
        {filteredBooks.map((book) => 
          <BookDisplay book={book} onClick={()=>onClickOnBook(book.id? book.id : 1)}/>
        )}
      </Stack>
    </div>
    
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
