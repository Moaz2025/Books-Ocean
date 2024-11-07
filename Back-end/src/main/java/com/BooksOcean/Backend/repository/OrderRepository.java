package com.BooksOcean.Backend.repository;

import com.BooksOcean.Backend.entity.Buyer;
import com.BooksOcean.Backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByBuyer(Buyer buyer);
}
