package com.BooksOcean.Backend.controller;

import com.BooksOcean.Backend.entity.Book;
import com.BooksOcean.Backend.entity.Buyer;
import com.BooksOcean.Backend.entity.Cart;
import com.BooksOcean.Backend.entity.CartItem;
import com.BooksOcean.Backend.service.BuyerService;
import com.BooksOcean.Backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {
    @Autowired
    private BuyerService buyerService;
    @Autowired
    private CartService cartService;
    @PostMapping("/save")
    public ResponseEntity<String> saveCart(@RequestHeader("Authorization") String token, @RequestBody List<CartItem> cartItems){
        token = token.replace("Bearer ", "");
        if(buyerService.getBuyerByToken(token) == null){
            return new ResponseEntity<>("Not authorized user", HttpStatus.FORBIDDEN);
        }
        Buyer buyer = buyerService.getBuyerByToken(token);
        List<Cart> carts = cartService.getCartsByBuyer(buyer);
        for (Cart cart : carts){
            cartService.deleteCart(cart);
        }
        for (CartItem cartItem : cartItems) {
            Cart cart = new Cart();
            Book book = new Book();
            cart.setBuyer(buyer);
            book.setId(cartItem.getBookId());
            cart.setBook(book);
            cart.setAmount(cartItem.getAmount());
            cartService.createCart(cart);
        }
        return new ResponseEntity<>("Book added to cart successfully", HttpStatus.ACCEPTED);
    }
    @GetMapping("/get")
    public ResponseEntity<List<CartItem>> getCart(@RequestHeader("Authorization") String token){
        token = token.replace("Bearer ", "");
        if(buyerService.getBuyerByToken(token) == null){
            return new ResponseEntity("Not authorized user", HttpStatus.FORBIDDEN);
        }
        Buyer buyer = buyerService.getBuyerByToken(token);
        List<Cart> carts = cartService.getCartsByBuyer(buyer);
        List<CartItem> cartItems= new ArrayList<>();
        for (Cart cart : carts) {
            Book book = cart.getBook();
            CartItem cartItem = new CartItem();
            cartItem.setBookId(book.getId());
            cartItem.setAmount(cart.getAmount());
            cartItems.add(cartItem);
        }
        return new ResponseEntity<>(cartItems, HttpStatus.ACCEPTED);
    }

}
