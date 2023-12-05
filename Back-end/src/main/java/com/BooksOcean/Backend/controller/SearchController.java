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
public class SearchController {

    @Autowired
    private BookService bookService;
    @PostMapping("/search/title")
    public ResponseEntity<SearchResponse> searchByTitle(@RequestBody Book book){
        SearchResponse searchResponse = new SearchResponse();
        Book dataBook = bookService.getBookByTitle(book.getTitle());
        if (dataBook == null){
            searchResponse.setMessage("No book with this name");
            return new ResponseEntity<>(searchResponse, HttpStatus.BAD_REQUEST);
        }
        searchResponse.setMessage("book exists");
        List<Book> books = new ArrayList<>();
        books.add(dataBook);
        searchResponse.setBooks(books);
        return new ResponseEntity<>(searchResponse, HttpStatus.ACCEPTED);
    }

    @PostMapping("/search/author")
    public ResponseEntity<SearchResponse> searchByAuthor(@RequestBody Book book){
        SearchResponse searchResponse = new SearchResponse();
        List<Book> dataBooks = bookService.getBookByAuthor(book.getAuthor());
        if (dataBooks.isEmpty()){
            searchResponse.setMessage("No author with this name");
            return new ResponseEntity<>(searchResponse, HttpStatus.BAD_REQUEST);
        }
        searchResponse.setMessage("Author exists");
        searchResponse.setBooks(dataBooks);
        return new ResponseEntity<>(searchResponse, HttpStatus.ACCEPTED);
    }
}
