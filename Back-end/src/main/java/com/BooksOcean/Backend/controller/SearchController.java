package com.BooksOcean.Backend.controller;

import com.BooksOcean.Backend.entity.Book;
import com.BooksOcean.Backend.entity.SearchResponse;
import com.BooksOcean.Backend.service.AdminService;
import com.BooksOcean.Backend.service.BookService;
import com.BooksOcean.Backend.service.BuyerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/data")
@CrossOrigin(origins = "http://localhost:3000")
public class SearchController {

    @Autowired
    private BookService bookService;
    @Autowired
    private BuyerService buyerService;
    @Autowired
    private AdminService adminService;
    @PostMapping("/searchByTitle")
    public ResponseEntity<SearchResponse> searchByTitle(@RequestHeader("Authorization") String token, @RequestBody String title){
        token = token.replace("Bearer ", "");
        SearchResponse searchResponse = new SearchResponse();
        if(buyerService.getBuyerByToken(token) == null && adminService.getAdminByToken(token) == null){
            searchResponse.setMessage("Not authorized user");
            return new ResponseEntity<>(searchResponse, HttpStatus.FORBIDDEN);
        }
        Book dataBook = bookService.getBookByTitle(title);
        if (dataBook == null){
            searchResponse.setMessage("No book with this name");
            return new ResponseEntity<>(searchResponse, HttpStatus.NOT_FOUND);
        }
        searchResponse.setMessage("book exists");
        List<Book> books = new ArrayList<>();
        books.add(dataBook);
        searchResponse.setBooks(books);
        return new ResponseEntity<>(searchResponse, HttpStatus.ACCEPTED);
    }

    @PostMapping("/searchByAuthor")
    public ResponseEntity<SearchResponse> searchByAuthor(@RequestHeader("Authorization") String token, @RequestBody String author){
        token = token.replace("Bearer ", "");
        SearchResponse searchResponse = new SearchResponse();
        if(buyerService.getBuyerByToken(token) == null && adminService.getAdminByToken(token) == null){
            searchResponse.setMessage("Not authorized user");
            return new ResponseEntity<>(searchResponse, HttpStatus.FORBIDDEN);
        }
        List<Book> dataBooks = bookService.getBookByAuthor(author);
        if (dataBooks.isEmpty()){
            searchResponse.setMessage("No author with this name");
            return new ResponseEntity<>(searchResponse, HttpStatus.NOT_FOUND);
        }
        searchResponse.setMessage("Author exists");
        searchResponse.setBooks(dataBooks);
        return new ResponseEntity<>(searchResponse, HttpStatus.ACCEPTED);
    }
}
