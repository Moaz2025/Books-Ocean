// SearchBar.tsx
import React, { useState } from 'react';
import { TextField, Box, IconButton, InputAdornment, MenuItem, Select, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

interface SearchBarProps {
  onSearch: (query: string, searchBy: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchBy, setSearchBy] = useState('title');

  const handleSearch = () => {
    onSearch(searchQuery, searchBy);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <Box>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {searchQuery && (
                <IconButton onClick={handleClearSearch} size="small">
                  <ClearIcon />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
      />
      <Box marginTop={2}>
        <Select
          value={searchBy}
          onChange={(e) => setSearchBy(e.target.value as string)}
          fullWidth
        >
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="author">Author</MenuItem>
        </Select>
      </Box>
      <Box marginTop={2}>
        <Button variant="contained" color="primary" fullWidth onClick={handleSearch}>
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default SearchBar;
