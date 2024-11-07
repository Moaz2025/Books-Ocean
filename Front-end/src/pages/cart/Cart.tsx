import { useEffect, useState } from "react";
import { checkout, decrementCartItem, deleteFromCart, getCart, incrementCartItem } from "../../services/cart";
import { Button, Divider, TextField, Typography } from "@mui/material";
import CartItem from "../../components/CartItem";
import { CartItem as CartItemType, Order } from "../../model/cart";
import { notify } from "../signUp/SignUp";
import { ToastContainer } from "react-toastify";

const Cart: React.FC = () => {
    const [cart, setCart] = useState<Map<number, number>>(new Map());
    const [shippingAddress, setShippingAddress] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    useEffect(() => {
      setCart(getCart());
    }, []);
  
    const handleIncrement = async (id: number) => {
      setCart(await incrementCartItem(cart, id));
    };
  
    const handleDecrement = async (id: number) => {
      setCart(await decrementCartItem(cart, id));
    };
  
    const handleDelete = async (id: number) => {
      setCart(await deleteFromCart(cart, id));
    };
    const handleCheckout = () => {
      const order: Order = {
        items: Array.from(cart.entries()).map(([bookId, amount]) => ({ bookId, amount })),
        shippingAddress,
        phoneNumber,
      };
      
      // Now you can use the 'order' object for further processing, such as sending it to the server
      console.log('Order:', order);
      checkout(order)
        .then((value) => {
          if(value.includes('error')){
            notify(value.replace('error', ''));
          }else{
            notify(value);
            const timer = setTimeout(()=>{
              window.location.reload();
            }, 2500)
          }
        })
    };
    return (
      <div style={{margin: 10}}>
        <ToastContainer />
        <Typography variant="h4" gutterBottom>
          Shopping Cart
        </Typography>
        <Divider />
        {Array.from(cart.entries()).map(([bookId, item]) => (
          <CartItem
            key={bookId}
            item={{
                bookId: bookId,
                amount: item
            }}
            onIncrement={() => handleIncrement(bookId)}
            onDecrement={() => handleDecrement(bookId)}
            onDelete={() => handleDelete(bookId)}
          />
        ))}
        {Array.from(cart.entries()).length === 0 && (
          <Typography variant="body1" style={{ marginTop: '16px' }}>
            Your cart is empty.
          </Typography>
        )}
        <TextField
          label="Shipping Address"
          variant="outlined"
          fullWidth
          margin="normal"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleCheckout}>
          Checkout
        </Button>
      </div>
    );
  };
  
  export default Cart;