package com.BooksOcean.Backend.service;

import com.BooksOcean.Backend.entity.Book;
import com.BooksOcean.Backend.entity.Buyer;
import com.BooksOcean.Backend.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public Book createBook(Book book) {
        return bookRepository.save(book);
    }

    public Book getBookById(int id){
        return bookRepository.findById(id).orElse(null);
    }

    public Book getBookByTitle(String title){
        return bookRepository.findByTitle(title);
    }

    public List<Book> getBookByAuthor(String author){
        return bookRepository.findByAuthor(author);
    }

    public Book updateBook(Book book) {
        return bookRepository.save(book);
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public void deleteBook(Book book) {
        bookRepository.delete(book);
    }
}