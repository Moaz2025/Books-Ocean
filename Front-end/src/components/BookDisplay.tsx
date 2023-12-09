import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea } from '@mui/material';

import { Book } from '../model/book'

interface BookDisplayProps {
    book:Book;
    onClick: ()=>any
}

const BookDisplay:React.FC<BookDisplayProps> = ({book, onClick}) => {
    return (
        <Card sx={{ minWidth:140, width: 300, m: 1 }}>
          <CardActionArea onClick={onClick}>
            <Box sx={{ position: 'relative', height: 0, paddingTop: '66.6%' }}>
              <CardMedia
                component="img"
                height="140" 
                image={book.coverImageLink}
                alt="book"
                style={{ objectFit: 'contain', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
              />
            </Box>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {book.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {book.description? book.description.length < 50 ? book.description : book.description?.substring(0, 50) + '..' : ''}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                {book.price.toFixed(2) + ' $'}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      );
}

export default BookDisplay
