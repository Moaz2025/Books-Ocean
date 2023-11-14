package com.BooksOcean.Backend.service;

import com.BooksOcean.Backend.entity.Buyer;
import org.springframework.stereotype.Service;

@Service
public interface BuyerService {
    public Buyer addBuyer(Buyer buyer);
}
