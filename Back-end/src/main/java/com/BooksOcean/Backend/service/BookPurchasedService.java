package com.BooksOcean.Backend.service;

import com.BooksOcean.Backend.entity.BookPurchased;

import com.BooksOcean.Backend.entity.Buyer;
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

    public List<BookPurchased> getBooksByBuyerEmail(Buyer buyer){
        return bookPurchasedRepository.findByBuyer(buyer);
    }

    public BookPurchased updateBooksPurchased(BookPurchased booksPurchased) {
        return bookPurchasedRepository.save(booksPurchased);
    }

    public void deleteBookPurchased(BookPurchased bookPurchased) {
        bookPurchasedRepository.delete(bookPurchased);
    }
}
