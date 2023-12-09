// HomeDefault.tsx
import React from 'react';
import SearchBar from '../../components/SearchBar';
import { Box } from '@mui/material';

const HomeDefault = () => {
  return (
    <Box>
      
      {/* Include SearchBar here */}
      <SearchBar onSearch={(_query, searchBy) => {}} />
      <p>Home page</p>
    </Box>
  );
}

export default HomeDefault;
