// ... existing imports ...

import React, { useEffect, useState } from 'react';
import { Book } from '../../model/book';
import { useNavigate } from 'react-router-dom';
import { router } from '../../services/router';
import { getAllBooks } from '../../services/books';
import LoadingCircle from '../../components/LoadingCircle';
import BookDisplay from '../../components/BookDisplay';
import { Stack, TextField, Typography } from '@mui/material';
import Rating from 'react-rating';

const HomeDefault = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [titleFilter, setTitleFilter] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [booksLoading, setBooksLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      const route = router();
      if (route !== '/home') {
        navigate(route);
      }
      setLoading(false);
    };
    checkAuthentication();
    getAllBooks().then((value) => {
      setBooksLoading(false);
      setBooks(value);
      setFilteredBooks(value);
    });
  }, []);

  useEffect(() => {
    const filtered = books.filter((book) => {
      const titleMatches = book.title.toLowerCase().includes(titleFilter.toLowerCase());
      const authorMatches = book.author.toLowerCase().includes(authorFilter.toLowerCase());

      return titleMatches && authorMatches;
    });

    setFilteredBooks(filtered);
  }, [titleFilter, authorFilter]);

  if (loading) {
    return <LoadingCircle />;
  }

  function onClickOnBook(arg0: number): any {
    throw new Error('Function not implemented.');
  }

  return (
    <div>
      <Stack sx={{ margin: 1 }} width={'100%'} spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
        <TextField label="Title" value={titleFilter} onChange={(e) => setTitleFilter(e.target.value)} />

        <TextField label="Author" value={authorFilter} onChange={(e) => setAuthorFilter(e.target.value)} />
      </Stack>
      <Stack width={'100%'} spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
        {filteredBooks.map((book) => (
          <div key={book.id}>
            <BookDisplay book={book} onClick={() => onClickOnBook(book.id ? book.id : 1)} />
            <Rating
              initialRating={book.averageRating}
              readonly
              emptySymbol="far fa-star"
              fullSymbol="fas fa-star"
            />
          </div>
        ))}
      </Stack>
    </div>
  );
};

export default HomeDefault;
