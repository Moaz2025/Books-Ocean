package com.BooksOcean.Backend.repository;

import com.BooksOcean.Backend.entity.Buyer;
import com.BooksOcean.Backend.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Integer> {
    List<Cart> findByBuyer(Buyer buyer);
}
