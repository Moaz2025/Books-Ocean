package com.BooksOcean.Backend.service;

import com.BooksOcean.Backend.entity.Buyer;
import com.BooksOcean.Backend.entity.Cart;
import com.BooksOcean.Backend.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    public Cart createCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public List<Cart> getCartsByBuyer(Buyer buyer){
        return cartRepository.findByBuyer(buyer);
    }

    public Cart updateCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public void deleteCart(Cart cart) {
        cartRepository.delete(cart);
    }
}
