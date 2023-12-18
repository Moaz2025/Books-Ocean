package com.BooksOcean.Backend.controller;

import com.BooksOcean.Backend.entity.*;
import com.BooksOcean.Backend.service.BookService;
import com.BooksOcean.Backend.service.BuyerService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class SearchControllerTest {
    Buyer buyer = new Buyer();
    Book book = new Book();
    LoginForm loginForm = new LoginForm();
    LoginResponse loginResponse = new LoginResponse();
    @Autowired
    AuthController authController = new AuthController();
    @Autowired
    LoginController loginController = new LoginController();
    @Autowired
    SearchController searchController = new SearchController();
    @Autowired
    BuyerService buyerService = new BuyerService();
    @Autowired
    BookService bookService = new BookService();

    @Test
    void searchByTitleNotAuthorized() {
        String token = "test";
        assertTrue("Not authorized user".equalsIgnoreCase(searchController.searchByTitle(token,"test").getBody().getMessage()));
    }

    @Test
    void searchByTitleNoResult() {
        buyer.setEmail("test@gmail.com");
        buyer.setPassword("test");
        buyer.setFirstName("test");
        buyer.setLastName("1");
        authController.signUp(buyer);
        loginForm.setEmail("test@gmail.com");
        loginForm.setPassword("test");
        loginForm.setUserType("buyer");
        loginResponse = loginController.login(loginForm).getBody();
        String token = loginResponse.getToken();
        assertTrue("No book with this name".equalsIgnoreCase(searchController.searchByTitle(token,"test").getBody().getMessage()));
        buyerService.deleteBuyer(buyer);
    }

    @Test
    void searchByTitleExists() {
        book.setTitle("test");
        bookService.createBook(book);
        buyer.setEmail("test@gmail.com");
        buyer.setPassword("test");
        buyer.setFirstName("test");
        buyer.setLastName("1");
        authController.signUp(buyer);
        loginForm.setEmail("test@gmail.com");
        loginForm.setPassword("test");
        loginForm.setUserType("buyer");
        loginResponse = loginController.login(loginForm).getBody();
        String token = loginResponse.getToken();
        assertTrue("book exists".equalsIgnoreCase(searchController.searchByTitle(token,"test").getBody().getMessage()));
        buyerService.deleteBuyer(buyer);
        bookService.deleteBook(book);
    }

    @Test
    void searchByAuthorNotAuthorized() {
        String token = "test";
        assertTrue("Not authorized user".equalsIgnoreCase(searchController.searchByAuthor(token,"test").getBody().getMessage()));
    }

    @Test
    void searchByAuthorNoResult() {
        buyer.setEmail("test@gmail.com");
        buyer.setPassword("test");
        buyer.setFirstName("test");
        buyer.setLastName("1");
        authController.signUp(buyer);
        loginForm.setEmail("test@gmail.com");
        loginForm.setPassword("test");
        loginForm.setUserType("buyer");
        loginResponse = loginController.login(loginForm).getBody();
        String token = loginResponse.getToken();
        assertTrue("No author with this name".equalsIgnoreCase(searchController.searchByAuthor(token,"test").getBody().getMessage()));
        buyerService.deleteBuyer(buyer);
    }

    @Test
    void searchByAuthorExists() {
        book.setAuthor("test");
        bookService.createBook(book);
        buyer.setEmail("test@gmail.com");
        buyer.setPassword("test");
        buyer.setFirstName("test");
        buyer.setLastName("1");
        authController.signUp(buyer);
        loginForm.setEmail("test@gmail.com");
        loginForm.setPassword("test");
        loginForm.setUserType("buyer");
        loginResponse = loginController.login(loginForm).getBody();
        String token = loginResponse.getToken();
        assertTrue("Author exists".equalsIgnoreCase(searchController.searchByAuthor(token,"test").getBody().getMessage()));
        buyerService.deleteBuyer(buyer);
        bookService.deleteBook(book);
    }
}