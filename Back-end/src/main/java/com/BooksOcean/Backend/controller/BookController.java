package com.BooksOcean.Backend.controller;

import com.BooksOcean.Backend.entity.Book;
import com.BooksOcean.Backend.entity.SearchResponse;
import com.BooksOcean.Backend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/data")
@CrossOrigin(origins = "http://localhost:3000")
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
    @GetMapping("/getAll")
    public ResponseEntity<SearchResponse> getAllBooks(@RequestHeader("Authorization") String authorizationHeader){
        String token = authorizationHeader.replace("Bearer ", "");
        SearchResponse searchResponse = new SearchResponse();
        System.out.println(authorizationHeader + "---" + token);
        List<Book> books = bookService.getAllBooks();
        searchResponse.setBooks(books);
        searchResponse.setMessage("Accepted with number of books = "+books.size());
        return new ResponseEntity<>(searchResponse, HttpStatus.ACCEPTED);
    }
}