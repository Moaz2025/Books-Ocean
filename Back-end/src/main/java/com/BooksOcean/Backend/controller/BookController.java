package com.BooksOcean.Backend.controller;

import com.BooksOcean.Backend.entity.Book;
import com.BooksOcean.Backend.entity.SearchResponse;
import com.BooksOcean.Backend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/home")
public class BookController {
    @Autowired
    private BookService bookService;
    @PostMapping("/add")
    public ResponseEntity<SearchResponse> addBook(@RequestBody Book book){
        SearchResponse searchResponse = new SearchResponse();
        Book dataBook = bookService.createBook(book);
        List<Book> books = new ArrayList<>();
        books.add(book);
        searchResponse.setBooks(books);
        return new ResponseEntity<>(searchResponse, HttpStatus.ACCEPTED);
    }
}
