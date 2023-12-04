import { Book } from "../model/book";

export const getBooks = async (): Promise<Book[]> => {
    return [
        {
            title: 'Clean Code',
            id: 1,
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