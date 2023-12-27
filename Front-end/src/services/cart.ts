import { CartItem } from "../model/cart"; // Assuming you have the CartItem interface in a separate types file
import { getBookById } from "./books";

const CART_STORAGE_KEY = 'cart';

export const getCart = (): Map<number, number> => {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    return cartData ? new Map(JSON.parse(cartData)) : new Map();
  };
  
  export const addToCart = async (bookId: number): Promise<string> => {
    try {
      const cart = getCart();
  
      // Get book details from the server
      const book = await getBookById(bookId);
  
      if (book) {
        const newCart = new Map(cart);
        const currentAmount = newCart.get(bookId) || 0;
  
        if (currentAmount < book.amount) {
          newCart.set(bookId, currentAmount + 1);
          saveCartToLocalStorage(newCart);
          return 'Book added to the cart successfully.';
        } else {
          return 'Failed to add book to the cart. Quantity exceeds available amount.';
        }
      } else {
        return 'Failed to add book to the cart. Book not found.';
      }
    } catch (error) {
      console.error('Error adding book to cart:', error);
      return 'Failed to add book to the cart. An error occurred.';
    }
  };

export const deleteFromCart = (cart: Map<number, number>, bookId: number): Map<number, number> => {
  const newCart = new Map(cart);
  newCart.delete(bookId);
  saveCartToLocalStorage(newCart);
  return newCart;
};

export const incrementCartItem = async (
    cart: Map<number, number>,
    bookId: number
  ): Promise<Map<number, number>> => {
    try {
      const newCart = new Map(cart);
  
      // Get book details from the server
      const book = await getBookById(bookId);
  
      if (book) {
        const currentAmount = newCart.get(bookId) || 0;
  
        if (currentAmount < book.amount) {
          newCart.set(bookId, currentAmount + 1);
          saveCartToLocalStorage(newCart);
        } else {
          console.warn('Quantity not incremented. Quantity exceeds available amount.');
        }
      }
  
      return newCart;
    } catch (error) {
      console.error('Error incrementing cart item:', error);
      return cart; // Return the original cart in case of an error
    }
  };

export const decrementCartItem = (cart: Map<number, number>, bookId: number): Map<number, number> => {
  const newCart = new Map(cart);
  const currentAmount = newCart.get(bookId) || 0;

  if (currentAmount > 1) {
    newCart.set(bookId, currentAmount - 1);
  } else {
    newCart.delete(bookId);
  }

  saveCartToLocalStorage(newCart);
  return newCart;
};

export const getItemsInCart = (cart: Map<number, number>): CartItem[] => {
  return Array.from(cart.entries()).map(([bookId, amount]) => ({
    bookId,
    amount,
  }));
};

export const loadCartFromLocalStorage = (): Map<number, number> => {
  const cartData = localStorage.getItem(CART_STORAGE_KEY);
  return cartData ? new Map(JSON.parse(cartData)) : new Map();
};

export const saveCartToLocalStorage = (cart: Map<number, number>): void => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(Array.from(cart.entries())));
};

