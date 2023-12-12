import axios, { AxiosResponse } from "axios";
import { Book, BooksResponse } from "../model/book";
import { getUserCredentials } from "./auth";
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

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
    ]
};