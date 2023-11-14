package com.BooksOcean.Backend.service;

import com.BooksOcean.Backend.entity.Buyer;
import com.BooksOcean.Backend.repository.BuyerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BuyerServiceImplementation implements BuyerService{

    @Autowired
    BuyerRepository repo;
    public Buyer addBuyer(Buyer buyer){
        return repo.save(buyer);
    }

}
