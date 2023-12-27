// CartItem.tsx

import React, { useState, useEffect } from 'react';
import { IconButton, Typography, Card, CardContent, CardMedia } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { CartItem as CartItemType } from '../model/cart'; // Assuming you have the CartItem type
import { getBookById } from '../services/books'; // Assuming you have a bookService with getBookById
import { Book } from '../model/book';

interface CartItemProps {
  item: CartItemType;
  onIncrement: () => void;
  onDecrement: () => void;
  onDelete: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onIncrement, onDecrement, onDelete }) => {
  const [book, setBook] = useState<Partial<Book>>({}); // Replace YourBookType with the actual book type

  useEffect(() => {
    const fetchBook = async () => {
      const fetchedBook = await getBookById(item.bookId);
      setBook(fetchedBook);
    };

    fetchBook();
  }, [item.bookId]);

  return (
    <Card style={{ display: 'flex', marginBottom: '16px' }}>
      <div style={{ flex: 1, padding: '16px' }}>
        <CardContent>
          <Typography variant="h6">{book.title}</Typography>
          <Typography variant="body1">Quantity: {item.amount}</Typography>
          <div>
            <IconButton onClick={onIncrement}>
              <AddIcon />
            </IconButton>
            <IconButton onClick={onDecrement}>
              <RemoveIcon />
            </IconButton>
            <IconButton onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </div>
        </CardContent>
      </div>
      <CardMedia
        component="img"
        height="140"
        image={book.coverImageLink} // Use the actual property from your book details type
        alt={book.title} // Use the actual property from your book details type
        style={{ maxWidth: '140px', objectFit: 'contain' }} // Adjust the styling as needed
      />
    </Card>
  );
};

export default CartItem;