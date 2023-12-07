package com.BooksOcean.Backend.service;

import com.BooksOcean.Backend.entity.Buyer;
import com.BooksOcean.Backend.repository.BuyerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BuyerService {

    @Autowired
    private BuyerRepository buyerRepository;

    public Buyer createBuyer(Buyer buyer) {
        return buyerRepository.save(buyer);
    }

    public Buyer getBuyerByEmail(String email){
        return buyerRepository.findById(email).orElse(null);
    }

    public Buyer getBuyerByToken(String token){
        return buyerRepository.findByToken(token);
    }

    public Buyer updateBuyer(Buyer buyer1) {
        return buyerRepository.save(buyer1);
    }

    public List<Buyer> getAllBuyers() {
        return buyerRepository.findAll();
    }

    public void deleteBuyer(Buyer buyer) {
        buyerRepository.delete(buyer);
    }

}
