import { Cart, CartItem, ICart } from "../model/cart"; // Assuming you have the CartItem interface in a separate types file
import { getBookById } from "./books";
import { UserCredentials } from "../model/user";
import axios, { AxiosResponse } from "axios";
import { getUserCredentials } from "./auth";
// import CartItem from "../components/CartItem";
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
const userCredentialsNameInStorage = 'credentials'

const CART_STORAGE_KEY = 'cart';
export const getCartAsString = () : string => {
  const cartData = localStorage.getItem(CART_STORAGE_KEY);
  return cartData!
}
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

export const saveCartAsArrayToLocalStorage = (cart: ICart): void => {
  const map = new Map();
  cart.items.forEach(
    (item) => {
      map.set(item.bookId, item.amount)
    }
  )
  saveCartToLocalStorage(map);
};

export const convertMapStringToList = (mapJsonString: string): CartItem[] => {
  const mapArray: [number, number][] = JSON.parse(mapJsonString);
  return mapArray.map(([bookId, amount]) => ({ bookId, amount }));
};

export const convertMapToList = (map: Map<number, number>): string[] => {
  let result : string[] = [];
  map.forEach((value, key) => {
    const cartItem : CartItem = {
      bookId: key,
      amount: value
    }
    result.push(JSON.stringify(cartItem));
  });
  return result
}

export const convertMapToListOfItems = (map: Map<number, number>): CartItem[] => {
  let result : CartItem[] = [];
  map.forEach((value, key) => {
    const cartItem : CartItem = {
      bookId: key,
      amount: value
    }
    result.push(cartItem);
  });
  return result
}


export const sendCartToServer = async(): Promise<void> => {
  const cart = getCart();
  const token = getUserCredentials()?.token; // Replace with your actual access token

  const cartArray = getCartAsString()
  const cartJson = convertMapToListOfItems(cart);
  console.log('Cart As JSON',cartJson);
  console.log(cartArray.toString());
  console.log(JSON.stringify(cartArray));
  const requestData = cartJson.map(item => ({
    bookId: item.bookId,
    amount: item.amount,
  }));
  console.log('Array')
  console.log(requestData.toString());
  console.log(JSON.stringify(requestData))
  const response = await axios.post(`${API_URL}/cart/save`, JSON.stringify(requestData), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => {
      console.log(response);
      
      // Check if the response status is OK (2xx)
      if (response.status >= 200 && response.status < 300) {
        localStorage.setItem(CART_STORAGE_KEY, '')
        // The request was successful
      } else {
        // The request was not successful, handle accordingly
        throw new Error(`Failed to send cart to the server. Status: ${response.status}`);
      }
    })
    .catch(error => {
      console.error('Error sending cart to server:', error);
      console.log(response);
      
      throw error;
    });
};

export const getCartFromServer = async (): Promise<ICart> => {
  try {
      const token = getUserCredentials()?.token; // Replace with your actual access token
      const response: AxiosResponse<CartItem[]> = await axios.get(`${API_URL}/cart/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Handle the response data here
      console.log(response.data);
      const result: ICart = {
        items : response.data 
      }
      return result;
    } catch (error) {
      // Handle errors here
      console.error('Error fetching data:', error);
      const result: ICart = {
        items : []
      }
      return result;
    }
};
// export const getCartFromServer = async(): Promise<ICart> => {
//   const token = getUserCredentials()?.token; // Replace with your actual access token

//   const response :AxiosResponse<ICart> = await axios.get(`${API_URL}/cart/get`, {
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then(response => {
//       // Check if the response status is OK (2xx)
//       if (response.status >= 200 && response.status < 300) {
//         // The request was successful
//       } else {
//         // The request was not successful, handle accordingly
//         throw new Error(`Failed to send cart to the server. Status: ${response.status}`);
//       }
//     })
//     .catch(error => {
//       console.error('Error sending cart to server:', error);
//       throw error;
//     });
// };