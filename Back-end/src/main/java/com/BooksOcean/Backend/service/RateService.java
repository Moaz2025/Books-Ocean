package com.BooksOcean.Backend.service;

import com.BooksOcean.Backend.entity.Book;
import com.BooksOcean.Backend.entity.Rate;
import com.BooksOcean.Backend.repository.BookRepository;
import com.BooksOcean.Backend.repository.RateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RateService {
    @Autowired
    private RateRepository rateRepository;
    @Autowired
    BuyerService buyerService;
    @Autowired
    BookService bookService;
    public Rate createRate(Rate rate) {
        return rateRepository.save(rate);
    }
    public List<Rate> getBookRates(int bookId){
        return rateRepository.findByBook(bookId);
    }
    public Rate getRate(int bookId, String buyerEmail){
        return rateRepository.findByBookAndBuyer(bookService.getBookById(bookId), buyerService.getBuyerByEmail(buyerEmail));
    }
}
