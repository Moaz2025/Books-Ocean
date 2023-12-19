package com.BooksOcean.Backend.controller;

import com.BooksOcean.Backend.entity.*;
import com.BooksOcean.Backend.service.BookService;
import com.BooksOcean.Backend.service.BuyerService;
import com.BooksOcean.Backend.service.RateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rate")
@CrossOrigin(origins = "http://localhost:3000")
public class RateController {
    @Autowired
    private BookService bookService;
    @Autowired
    private RateService rateService;
    @Autowired
    private BuyerService buyerService;
    @PostMapping("/new")
    public ResponseEntity<String> newRate(@RequestHeader("Authorization") String token, @RequestBody RateForm rateForm){
        token = token.replace("Bearer ", "");
        if(buyerService.getBuyerByToken(token) == null){
            return new ResponseEntity<>("Not authorized user", HttpStatus.FORBIDDEN);
        }
        Buyer buyer = buyerService.getBuyerByToken(token);
        Book book = bookService.getBookById(rateForm.getBook_id());
        int rating = book.getRate();
        int numOfRates = book.getNumOfRates();
        Rate dbRate = rateService.getRate(book.getId(), buyer.getEmail());
        if(dbRate == null){
            rating = (rating * numOfRates + rateForm.getRating()) / (numOfRates + 1);
            book.setRate(rating);
            book.setNumOfRates(numOfRates + 1);
            bookService.updateBook(book);
            Rate rate = new Rate();
            rate.setBook(book);
            rate.setBuyer(buyer);
            rate.setRating(rateForm.getRating());
            rate.setReview(rateForm.getReview());
            rateService.createRate(rate);
        }
        else {
            rating = (rating * numOfRates - dbRate.getRating() + rateForm.getRating()) / numOfRates;
            book.setRate(rating);
            bookService.updateBook(book);
            dbRate.setReview(rateForm.getReview());
            dbRate.setRating(rateForm.getRating());
            rateService.createRate(dbRate);
        }
        return new ResponseEntity<>("Saved", HttpStatus.ACCEPTED);
    }
    @GetMapping("/getAll/{id}")
    public ResponseEntity<RateResponse> bookRates(@RequestHeader("Authorization") String token, @PathVariable int bookId){
        RateResponse rateResponse = new RateResponse();
        token = token.replace("Bearer ", "");
        if(buyerService.getBuyerByToken(token) == null){
            rateResponse.setMessage("Not authorized user");
            return new ResponseEntity<>(rateResponse, HttpStatus.FORBIDDEN);
        }
        rateResponse.setRates(rateService.getBookRates(bookId));
        rateResponse.setMessage("Done");
        return new ResponseEntity<>(rateResponse, HttpStatus.ACCEPTED);
    }
}
