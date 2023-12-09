// Home.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../../services/auth';
import CircularProgress from '@mui/material/CircularProgress';
import { router } from '../../services/router';
import { useTheme } from '../ThemeTogglerProvider';
import CustomAppBar from '../../components/AppBar';
import SearchBar from '../../components/SearchBar';
import fetchBookData from '../../services/BookService';
import { Book } from '../../model/book';
import HomeDefault from './HomeDefault'; // Import HomeDefault component

const Home = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [searchBy, setSearchBy] = useState('title'); // Add searchBy state

  const handleLogout = () => {
    logout().then(() => {
      navigate('/login');
    });
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      const route = router();
      if (!route.includes('home')) {
        navigate(route);
      }
      setLoading(false);
    };
    checkAuthentication();
  }, [navigate]);

  const handleSearch = async (query: string, selectedSearchBy: string) => {
    setSearchBy(selectedSearchBy); // Update searchBy state
    const data = await fetchBookData(query, selectedSearchBy);
    setSearchResults(data);
  };

  return (
    // <ThemeProvider theme={theme}>
    //   <CustomAppBar />
    //   <Container component="main" maxWidth="xs">
    //     <CssBaseline />
    //     <Box marginTop={2}>
    //       <SearchBar onSearch={handleSearch} />
    //     </Box>
    //     {/* Render HomeDefault component */}
    //     <HomeDefault />
    //     {searchResults.map((book) => (
    //       <Card key={book.id} onClick={() => navigate(`/book/${book.id}`)}>
    //         <CardMedia component="img" height="140" image={book.coverImageLink} alt={book.title} />
    //         <CardContent>
    //           <Typography variant="h6">{book.title}</Typography>
    //           <Typography variant="subtitle1" color="textSecondary">
    //             {searchBy === 'title' ? `Author: ${book.author}` : `Title: ${book.title}`}
    //           </Typography>
    //           {/* Add more details as needed */}
    //         </CardContent>
    //       </Card>
    //     ))}
    //     <Outlet />
    //   </Container>
    // </ThemeProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CustomAppBar />
      {/* <CssBaseline /> */}
      <Container component="main" sx={{padding:0}}>
        <Outlet></Outlet>
      </ Container >
    </ ThemeProvider >
  );
};

export default Home;
