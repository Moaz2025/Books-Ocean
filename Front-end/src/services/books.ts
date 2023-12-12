import axios, { AxiosResponse } from "axios";
import { Book, BooksResponse } from "../model/book";
import { getUserCredentials } from "./auth";
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
export const addBook = async (book: Book): Promise<string> => {
  try {
    const token = getUserCredentials()?.token; // Replace with your actual access token
    const response: AxiosResponse = await axios.post(`${API_URL}/data/add`, book, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    // Handle the response data here
    console.log(response.data);
    return (response.data);
  } catch (error) {
    // Handle errors here
    console.error('Error Adding Book:', error);
    return 'error Failed to add'
  }
}

export const getAllBooks = async (): Promise<Book[]> => {
    try {
        const token = getUserCredentials()?.token; // Replace with your actual access token
        const response: AxiosResponse<BooksResponse> = await axios.get(`${API_URL}/data/getAll`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        // Handle the response data here
        console.log(response.data);
        return response.data.books!;
      } catch (error) {
        // Handle errors here
        console.error('Error fetching data:', error);
      }
    return [
        {
            title: 'Clean Code',
            id: 1,
            description: 'A clear and concise guide to basic Agile values and principles.',
            isbn: '978-0-13-235088-4',
            price: 34.99,
            author: 'Robert C. Martin',
            category: 'CS',
            amount: 10,
            coverImageLink: 'https://m.media-amazon.com/images/I/41bOkXnNBjL._SY445_SX342_.jpg',
        },
        {
            title: 'A People\'s History of the United States',
            id: 3,
            isbn: '978-0-06-196558-6',
            price: 24.99,
            author: 'Howard Zinn',
            category: 'History',
            publishDate: new Date('1980-11-17'),
            amount: 7,
            coverImageLink: 'https://m.media-amazon.com/images/I/51j6xwoWduL._SX342_SY445_.jpg',
        },
        {
          title: 'Clean Code',
          id: 1,
          description: 'A clear and concise guide to basic Agile values and principles.',
          isbn: '978-0-13-235088-4',
          price: 34.99,
          author: 'Robert C. Martin',
          category: 'CS',
          amount: 10,
          coverImageLink: 'https://m.media-amazon.com/images/I/41bOkXnNBjL._SY445_SX342_.jpg',
      },
      {
        title: 'Clean Code',
        id: 1,
        description: 'A clear and concise guide to basic Agile values and principles.',
        isbn: '978-0-13-235088-4',
        price: 34.99,
        author: 'Robert C. Martin',
        category: 'CS',
        amount: 10,
        coverImageLink: 'https://m.media-amazon.com/images/I/41bOkXnNBjL._SY445_SX342_.jpg',
    },
    ]
};
export const getBookById = async (id:number): Promise<Book> => {
  try {
      const token = getUserCredentials()?.token; // Replace with your actual access token
      const response: AxiosResponse<BooksResponse> = await axios.get(`${API_URL}/data/getById/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Handle the response data here
      console.log(response.data);
      return response.data.books![0];
    } catch (error) {
      // Handle errors here
      console.error('Error fetching data:', error);
    }
    return {
      title: 'Clean Code',
      id: 1,
      description: 'A clear and concise guide to basic Agile values and principles.',
      isbn: '978-0-13-235088-4',
      price: 34.99,
      author: 'Robert C. Martin',
      category: 'CS',
      amount: 10,
      coverImageLink: 'https://m.media-amazon.com/images/I/41bOkXnNBjL._SY445_SX342_.jpg',
    }
};

export const editBook = async (book: Book, id: number): Promise<string> => {
  try {
    const token = getUserCredentials()?.token; // Replace with your actual access token
    const response: AxiosResponse = await axios.put(`${API_URL}/data/update/${id}`, book, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    // Handle the response data here
    console.log(response.data);
    return (response.data.message);
  } catch (error) {
    // Handle errors here
    console.error('Error Editting Book:', error);
    return 'error Failed to edit'
  }
}

export const deleteBook = async (id: number): Promise<string> => {
  try {
    const token = getUserCredentials()?.token; // Replace with your actual access token
    const response: AxiosResponse = await axios.delete(`${API_URL}/data/delete/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    // Handle the response data here
    console.log(response.data);
    return (response.data);
  } catch (error) {
    // Handle errors here
    console.error('Error Deleting Book:', error);
    return 'error Failed to delete'
  }
}