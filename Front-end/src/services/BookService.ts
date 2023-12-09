// src/services/bookService.ts

export interface Book {
    title: string;
    description: string;
    id: number;
    isbn: string;
    price: number;
    author: string;
    category: string;
    publishDate: Date;
    publisher: string;
    pagesNumber: number;
    amount: number;
    coverImageLink: string;
  }
  
  const fetchBookData = async (searchQuery: string, searchBy: string): Promise<Book[]> => {
    const response = await fetch(`https://your-api-endpoint/books?search=${searchQuery}&searchBy=${searchBy}`);
    const data: Book[] = await response.json();
    return data;
  };
  
  export default fetchBookData;
  