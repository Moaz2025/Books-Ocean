package com.BooksOcean.Backend.controller;

import com.BooksOcean.Backend.entity.*;
import com.BooksOcean.Backend.service.BookService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class BookControllerTest {

    Book book = new Book();
    LoginForm loginForm = new LoginForm();
    LoginResponse loginResponse = new LoginResponse();
    @Autowired
    BookController bookController = new BookController();
    @Autowired
    LoginController loginController = new LoginController();
    @Autowired
    BookService bookService = new BookService();

    @Test
    void addBookNotAuthorized() {
        String token = "test";
        assertTrue("Not authorized admin".equalsIgnoreCase(bookController.addBook(token,book).getBody()));
    }
    @Test
    void addBookAlreadyExists() {
        loginForm.setEmail("admin@booksocean.com");
        loginForm.setPassword("admin");
        loginForm.setUserType("admin");
        loginResponse = loginController.login(loginForm).getBody();
        String token = loginResponse.getToken();
        book.setTitle("testBook");
        bookService.createBook(book);
        assertTrue("Book already exists".equalsIgnoreCase(bookController.addBook(token,book).getBody()));
        bookService.deleteBook(book);
    }
    @Test
    void addBookSucceeded(){
        loginForm.setEmail("admin@booksocean.com");
        loginForm.setPassword("admin");
        loginForm.setUserType("admin");
        loginResponse = loginController.login(loginForm).getBody();
        String token = loginResponse.getToken();
        book.setTitle("testBook");
        assertTrue("Book added successfully".equalsIgnoreCase(bookController.addBook(token,book).getBody()));
        bookService.deleteBook(book);
    }
    @Test
    void getBookByIdNotAuthorized() {
        String token = "test";
        int id = 1;
        assertTrue("Not authorized user".equalsIgnoreCase(bookController.getBookById(id, token).getBody().getMessage()));
    }
    @Test
    void getBookByIdNotFound(){
        loginForm.setEmail("admin@booksocean.com");
        loginForm.setPassword("admin");
        loginForm.setUserType("admin");
        loginResponse = loginController.login(loginForm).getBody();
        String token = loginResponse.getToken();
        assertTrue("No book with this id".equalsIgnoreCase(bookController.getBookById(0, token).getBody().getMessage()));
    }
    @Test
    void getBookByIdFound(){
        loginForm.setEmail("admin@booksocean.com");
        loginForm.setPassword("admin");
        loginForm.setUserType("admin");
        loginResponse = loginController.login(loginForm).getBody();
        String token = loginResponse.getToken();
        book.setTitle("testBook");
        bookService.createBook(book);
        assertTrue("Book exists".equalsIgnoreCase(bookController.getBookById(book.getId(),token).getBody().getMessage()));
        bookService.deleteBook(book);
    }
    @Test
    void deleteBookNotAuthorized() {
        String token = "test";
        int id = 1;
        assertTrue("Not authorized admin".equalsIgnoreCase(bookController.deleteBook(id, token).getBody()));
    }
    @Test
    void deleteBookNotFound() {
        loginForm.setEmail("admin@booksocean.com");
        loginForm.setPassword("admin");
        loginForm.setUserType("admin");
        loginResponse = loginController.login(loginForm).getBody();
        String token = loginResponse.getToken();
        int id = 0;
        assertTrue("Book doesn't exists".equalsIgnoreCase(bookController.deleteBook(id, token).getBody()));
    }
    @Test
    void deleteBookSucceeded() {
        loginForm.setEmail("admin@booksocean.com");
        loginForm.setPassword("admin");
        loginForm.setUserType("admin");
        loginResponse = loginController.login(loginForm).getBody();
        String token = loginResponse.getToken();
        book.setTitle("testBook");
        bookService.createBook(book);
        assertTrue("Book deleted successfully".equalsIgnoreCase(bookController.deleteBook(book.getId(), token).getBody()));
    }
    @Test
    void updateBookNotAuthorized() {
        String token = "test";
        int id = 1;
        assertTrue("Not authorized user".equalsIgnoreCase(bookController.updateBook(id, token, book).getBody().getMessage()));
    }
    @Test
    void updateBookNotFound() {
        loginForm.setEmail("admin@booksocean.com");
        loginForm.setPassword("admin");
        loginForm.setUserType("admin");
        loginResponse = loginController.login(loginForm).getBody();
        String token = loginResponse.getToken();
        int id = 0;
        assertTrue("No book with this id".equalsIgnoreCase(bookController.updateBook(id, token, book).getBody().getMessage()));
    }
    @Test
    void updateBookSucceeded() {
        loginForm.setEmail("admin@booksocean.com");
        loginForm.setPassword("admin");
        loginForm.setUserType("admin");
        loginResponse = loginController.login(loginForm).getBody();
        String token = loginResponse.getToken();
        book.setTitle("testBook");
        bookService.createBook(book);
        book.setTitle("updatedTitle");
        assertTrue("Book updated successfully".equalsIgnoreCase(bookController.updateBook(book.getId(), token, book).getBody().getMessage()));
        bookService.deleteBook(book);
    }
    @Test
    void getAllBooksNotAuthorized() {
        String token = "test";
        assertTrue("Not authorized user".equalsIgnoreCase(bookController.getAllBooks(token).getBody().getMessage()));
    }
    @Test
    void getAllBooksSucceeded() {
        loginForm.setEmail("admin@booksocean.com");
        loginForm.setPassword("admin");
        loginForm.setUserType("admin");
        loginResponse = loginController.login(loginForm).getBody();
        String token = loginResponse.getToken();
        assertTrue("Book exists".equalsIgnoreCase(bookController.getAllBooks(token).getBody().getMessage()));
    }
}