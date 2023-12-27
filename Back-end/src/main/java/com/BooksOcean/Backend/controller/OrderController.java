package com.BooksOcean.Backend.controller;

import com.BooksOcean.Backend.entity.*;
import com.BooksOcean.Backend.service.BookPurchasedService;
import com.BooksOcean.Backend.service.BookService;
import com.BooksOcean.Backend.service.BuyerService;
import com.BooksOcean.Backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/order")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {
    @Autowired
    private BuyerService buyerService;
    @Autowired
    private OrderService orderService;
    @Autowired
    private BookService bookService;
    @Autowired
    private BookPurchasedService bookPurchasedService;
    @PostMapping("/commit")
    public ResponseEntity<String> commitOrder(@RequestHeader("Authorization") String token, @RequestBody OrderDetails orderDetails){
        token = token.replace("Bearer ", "");
        if(buyerService.getBuyerByToken(token) == null){
            return new ResponseEntity<>("Not authorized user", HttpStatus.FORBIDDEN);
        }

        StringBuilder message = new StringBuilder();
        message.append("Books: ");
        int conflictCount = 0;
        List<CartItem> cartItems = orderDetails.getItems();
        for (CartItem cartItem : cartItems) {
            Book book = bookService.getBookById(cartItem.getBookId());
            if(book.getAmount() < cartItem.getAmount()) {
                String bookTitle = book.getTitle();
                message.append(bookTitle).append(", ");
                conflictCount++;
            }
        }
        message.append("have less amounts in inventory, you should edit the amounts");
        if(conflictCount > 0)
        return new ResponseEntity(message, HttpStatus.CONFLICT);

        Buyer buyer = buyerService.getBuyerByToken(token);
        Order order = new Order();
        order.setBuyer(buyer);
        Date date = new Date();
        order.setDate(date);
        order.setShippingAddress(orderDetails.getShippingAddress());
        order.setPhoneNumber(orderDetails.getPhoneNumber());
        orderService.createOrder(order);
        for (CartItem cartItem : cartItems){
            BookPurchased bookPurchased = new BookPurchased();
            Book book = bookService.getBookById(cartItem.getBookId());
            book.setAmount(book.getAmount() - cartItem.getAmount());
            bookService.updateBook(book);
            bookPurchased.setBuyer(buyer);
            bookPurchased.setBook(book);
            bookPurchased.setOrder(order);
            bookPurchased.setAmount(cartItem.getAmount());
            bookPurchasedService.createBookPurchased(bookPurchased);
        }
        return new ResponseEntity<>("Order made successfully", HttpStatus.ACCEPTED);
    }

    @GetMapping("/get")
    public ResponseEntity<List<List<CartItem>>> getOrders(@RequestHeader("Authorization") String token){
        token = token.replace("Bearer ", "");
        if(buyerService.getBuyerByToken(token) == null){
            return new ResponseEntity("Not authorized user", HttpStatus.FORBIDDEN);
        }
        Buyer buyer = buyerService.getBuyerByToken(token);
        List<Order> orders = orderService.getOrderByBuyer(buyer);
        List<CartItem> cartItems= new ArrayList<>();
        List<List<CartItem>> listOfCarts = new ArrayList<>();
        for (Order order : orders) {
            List<BookPurchased> booksPurchased = bookPurchasedService.getBooksPurchasedByOrder(order);
            cartItems= new ArrayList<>();
            for (BookPurchased bookPurchased : booksPurchased) {
                CartItem cartItem = new CartItem();
                cartItem.setBookId(bookPurchased.getBook().getId());
                cartItem.setAmount(bookPurchased.getAmount());
                cartItems.add(cartItem);
            }
            listOfCarts.add(cartItems);
        }
        return new ResponseEntity<>(listOfCarts, HttpStatus.ACCEPTED);
    }
}
