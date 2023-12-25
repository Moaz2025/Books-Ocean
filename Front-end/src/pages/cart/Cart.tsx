import { useEffect, useState } from "react";
import { decrementCartItem, deleteFromCart, getCart, incrementCartItem } from "../../services/cart";
import { Button, Divider, Typography } from "@mui/material";
import CartItem from "../../components/CartItem";
import { CartItem as CartItemType } from "../../model/cart";

const Cart: React.FC = () => {
    const [cart, setCart] = useState<Map<number, number>>(new Map());
  
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
  
    return (
      <div style={{margin: 10}}>
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
        <Button variant="contained" color="primary">
          Checkout
        </Button>
      </div>
    );
  };
  
  export default Cart;