import React, { useEffect, useState } from 'react'
import { IBuyer } from '../../model/user';
import { getAllBuyers, promoteBuyer } from '../../services/promotion';
import { Button, List, ListItem, ListItemText, Typography, TextField } from '@mui/material';
import { notify } from '../signUp/SignUp';
import { ToastContainer } from 'react-toastify';

const Promotion = () => {
  const [buyers, setBuyers] = useState<IBuyer[]>([]);
  const [filterEmail, setFilterEmail] = useState<string>('');

  useEffect(() => {
    // Fetch the list of buyers from the server
    getAllBuyers()
        .then((response) => {
            setBuyers(response);
        })
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterEmail(event.target.value);
  };

  const filteredBuyers = buyers.filter((buyer) =>
    buyer.email.toLowerCase().includes(filterEmail.toLowerCase())
  );

  const promoteUser = (userEmail: string) => {
    promoteBuyer(userEmail)
        .then((value) => {
          console.log('return', value);
          notify(value);
        })
  };

  return (
    <div style={{margin: 10}}>
      <ToastContainer />
      <Typography variant="h5">Buyers List</Typography>
      <TextField
        label="Filter by Email"
        variant="outlined"
        margin="normal"
        fullWidth 
        value={filterEmail}
        onChange={handleFilterChange}
      />
      
      <List>
        {filteredBuyers.map((buyer) => (
          <ListItem key={buyer.email}>
            <ListItemText primary={buyer.email} />
            <Button onClick={() => promoteUser(buyer.email)} variant="contained" color="primary">
                Promote to Admin
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default Promotion
