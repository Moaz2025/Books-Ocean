package com.BooksOcean.Backend.repository;

import com.BooksOcean.Backend.entity.BookPurchased;
import com.BooksOcean.Backend.entity.Buyer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookPurchasedRepository extends JpaRepository<BookPurchased, Integer> {
    List<BookPurchased> findByBuyer(Buyer buyer);
}
