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
public class BookController {
    @Autowired
    private BookService bookService;
    @Autowired
    private BuyerService buyerService;
    @Autowired
    private AdminService adminService;
    @PostMapping("/add")
    public ResponseEntity<String> addBook(@RequestHeader("Authorization") String token, @RequestBody Book book){
        token = token.replace("Bearer ", "");
        if(adminService.getAdminByToken(token) == null){
            return new ResponseEntity<>("Not authorized admin", HttpStatus.FORBIDDEN);
        }
        if(bookService.getBookByTitle(book.getTitle()) != null){
            return new ResponseEntity<>("Book already exists", HttpStatus.CONFLICT);
        }
        Book dataBook = bookService.createBook(book);
        return new ResponseEntity<>("Book added successfully", HttpStatus.ACCEPTED);
    }
    @GetMapping("/getById/{id}")
    public ResponseEntity<SearchResponse> getBookById(@PathVariable int id, @RequestHeader("Authorization") String token){
        token = token.replace("Bearer ", "");
        SearchResponse searchResponse = new SearchResponse();
        if(buyerService.getBuyerByToken(token) == null && adminService.getAdminByToken(token) == null){
            searchResponse.setMessage("Not authorized user");
            return new ResponseEntity<>(searchResponse, HttpStatus.FORBIDDEN);
        }
        Book dataBook = bookService.getBookById(id);
        if (dataBook == null){
            searchResponse.setMessage("No book with this id");
            return new ResponseEntity<>(searchResponse, HttpStatus.NOT_FOUND);
        }
        searchResponse.setMessage("book exists");
        List<Book> books = new ArrayList<>();
        books.add(dataBook);
        searchResponse.setBooks(books);
        return new ResponseEntity<>(searchResponse, HttpStatus.ACCEPTED);
    }
    @DeleteMapping("/delete/{id}")
    public  ResponseEntity<String> deleteBook(@PathVariable int id, @RequestHeader("Authorization") String token){
        token = token.replace("Bearer ", "");
        if(adminService.getAdminByToken(token) == null){
            return new ResponseEntity<>("Not authorized admin", HttpStatus.FORBIDDEN);
        }
        Book book = bookService.getBookById(id);
        if(book == null){
            return new ResponseEntity<>("Book doesn't exists", HttpStatus.NOT_FOUND);
        }
        bookService.deleteBook(book);
        return new ResponseEntity<>("Book deleted successfully", HttpStatus.ACCEPTED);
    }
    @PutMapping("update/{id}")
    public ResponseEntity<SearchResponse> updateBook(@PathVariable int id, @RequestHeader("Authorization") String token, @RequestBody Book book){
        token = token.replace("Bearer ", "");
        SearchResponse searchResponse = new SearchResponse();
        if(adminService.getAdminByToken(token) == null){
            searchResponse.setMessage("Not authorized user");
            return new ResponseEntity<>(searchResponse, HttpStatus.FORBIDDEN);
        }
        Book dbBook = bookService.getBookById(id);
        if(dbBook == null){
            searchResponse.setMessage("No book with this id");
            return new ResponseEntity<>(searchResponse, HttpStatus.NOT_FOUND);
        }
        searchResponse.setMessage("book exists");
        List<Book> books = new ArrayList<>();
        bookService.updateBook(dbBook);
        books.add(dbBook);
        searchResponse.setBooks(books);
        return new ResponseEntity<>(searchResponse, HttpStatus.ACCEPTED);
    }
    @GetMapping("getAll")
    public ResponseEntity<SearchResponse> getAllBooks(@RequestHeader("Authorization") String token){
        token = token.replace("Bearer ", "");
        SearchResponse searchResponse = new SearchResponse();
        if(buyerService.getBuyerByToken(token) == null && adminService.getAdminByToken(token) == null){
            searchResponse.setMessage("Not authorized user");
            return new ResponseEntity<>(searchResponse, HttpStatus.FORBIDDEN);
        }
        searchResponse.setMessage("book exists");
        List<Book> books = new ArrayList<>();
        books = bookService.getAllBooks();
        searchResponse.setBooks(books);
        return new ResponseEntity<>(searchResponse, HttpStatus.ACCEPTED);
    }
}
       
