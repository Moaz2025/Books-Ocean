package com.BooksOcean.Backend.repository;

import com.BooksOcean.Backend.entity.Buyer;
import com.BooksOcean.Backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    Order findByBuyer(Buyer buyer);
}
