import { IconButton, Stack, TextField } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React, { useEffect, useState } from 'react'
import { Book } from '../../model/book';
import { useNavigate } from 'react-router-dom';
import { router } from '../../services/router';
import { getAllBooks } from '../../services/books';
import LoadingCircle from '../../components/LoadingCircle';
import BookDisplay from '../../components/BookDisplay';

const HomeDefault = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [titleFilter, setTitleFilter] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [booksLoading, setBooksLoading] = useState(true);
  const onClickOnBook = (id:number) => {
    navigate(`${id}`)
  }

  useEffect(()=>{
    const checkAuthentication = async () => {
      const route = router();
      if (route != '/home') {
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
  }, []);
  
  useEffect(() => {
    // Filter the books based on the current search criteria
    const filtered = books.filter((book) => {
      const titleMatches = book.title.toLowerCase().includes(titleFilter.toLowerCase());
      const authorMatches = book.author.toLowerCase().includes(authorFilter.toLowerCase());

      return titleMatches && authorMatches;
    });

    setFilteredBooks(filtered);
  }, [titleFilter, authorFilter]);

  const handleClickCart = () => {
    navigate('cart')
  }
  if (loading) {
    return (<LoadingCircle></LoadingCircle>)
  }
  
  return (
    <div>
      <Stack sx={{margin:1}} width={"100%"} spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
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

        <IconButton
            sx={{m:0.2}}
            edge="end"
            color="inherit"
            aria-label="profile"
            size='medium'
            onClick={handleClickCart}
          >
            {'Cart'} 
            <ShoppingCartIcon sx={{marginX:1}} />
        </IconButton> 
      </Stack>
      <Stack width={"100%"} spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
        {filteredBooks.map((book) => 
          <BookDisplay book={book} onClick={()=>onClickOnBook(book.id? book.id : 1)}/>
        )}
      </Stack>
    </div>
    
  )
}

export default HomeDefault
