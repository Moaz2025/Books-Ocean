package com.BooksOcean.Backend.service;

import com.BooksOcean.Backend.entity.BookPurchased;

import com.BooksOcean.Backend.entity.Buyer;
import com.BooksOcean.Backend.entity.Order;
import com.BooksOcean.Backend.repository.BookPurchasedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookPurchasedService {

    @Autowired
    private BookPurchasedRepository bookPurchasedRepository;

    public BookPurchased createBookPurchased(BookPurchased bookPurchased) {
        return bookPurchasedRepository.save(bookPurchased);
    }

    public List<BookPurchased> getBooksPurchasedByBuyer(Buyer buyer){
        return bookPurchasedRepository.findByBuyer(buyer);
    }

    public List<BookPurchased> getBooksPurchasedByOrder(Order order){
        return bookPurchasedRepository.findByOrder(order);
    }

    public BookPurchased updateBooksPurchased(BookPurchased booksPurchased) {
        return bookPurchasedRepository.save(booksPurchased);
    }

    public void deleteBookPurchased(BookPurchased bookPurchased) {
        bookPurchasedRepository.delete(bookPurchased);
    }
}
