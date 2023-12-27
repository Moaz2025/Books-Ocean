package com.BooksOcean.Backend.repository;

import com.BooksOcean.Backend.entity.Book;
import com.BooksOcean.Backend.entity.Buyer;
import com.BooksOcean.Backend.entity.Rate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RateRepository extends JpaRepository<Rate, Integer> {
    List<Rate> findByBook(int bookId);
    Rate findByBookAndBuyer(Book book, Buyer buyer);
}
