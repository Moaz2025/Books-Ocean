package com.BooksOcean.Backend.controller;

import com.BooksOcean.Backend.entity.*;
import com.BooksOcean.Backend.service.BookService;
import com.BooksOcean.Backend.service.BuyerService;
import com.BooksOcean.Backend.service.CartService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class CartControllerTest {
    Buyer buyer = new Buyer();
    LoginForm loginForm = new LoginForm();
    LoginResponse loginResponse = new LoginResponse();
    @Autowired
    AuthController authController = new AuthController();
    @Autowired
    LoginController loginController = new LoginController();
    @Autowired
    BuyerService buyerService = new BuyerService();
    @Autowired
    BookService bookService = new BookService();
    @Autowired
    CartController cartController = new CartController();
    @Autowired
    CartService cartService = new CartService();

    @Test
    void saveCartNotAuthorized() {
        String token = "test";
        List<CartItem> cartItems = new ArrayList<>();
        assertTrue("Not authorized user".equalsIgnoreCase(cartController.saveCart(token,cartItems).getBody()));
    }

    @Test
    void saveCartSuccessfully() {
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
        Book book = new Book();
        book.setTitle("testBook");
        book.setAmount(10);
        bookService.createBook(book);
        List<CartItem> cartItems = new ArrayList<>();
        CartItem cartItem = new CartItem();
        cartItem.setBookId(book.getId());
        cartItem.setAmount(book.getAmount());
        assertTrue("Book added to cart successfully".equalsIgnoreCase(cartController.saveCart(token,cartItems).getBody()));
        List<Cart> carts = cartService.getCartsByBuyer(buyer);
        for(Cart cart : carts) {
            cartService.deleteCart(cart);
        }
        bookService.deleteBook(book);
        buyerService.deleteBuyer(buyer);
    }

    @Test
    void getCartNotAuthorized() {
        String token = "test";
        List<CartItem> cartItems = new ArrayList<>();
        assertTrue("Not authorized user".equalsIgnoreCase(String.valueOf(cartController.getCart(token).getBody())));
    }

}