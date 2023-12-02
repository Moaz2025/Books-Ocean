package com.BooksOcean.Backend.controller;

import com.BooksOcean.Backend.entity.Buyer;
import com.BooksOcean.Backend.service.BuyerService;
import com.BooksOcean.Backend.service.Validation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    Validation validation = new Validation();
    @Autowired
    private BuyerService buyerService;
    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody Buyer buyer){
        Buyer buyer1 = buyerService.getBuyerByEmail(buyer.getEmail());
        if(!validation.validateEmail(buyer.getEmail())){
            return new ResponseEntity<>("Email is not valid", HttpStatus.BAD_REQUEST);
        }
        if (buyer1 == null){
            buyer.setSalt(validation.getSalt());
            buyer.setPassword(validation.hashPassword(buyer.getPassword(),buyer.getSalt()));
            buyerService.createBuyer(buyer);
            return new ResponseEntity<>("Signed up successfully", HttpStatus.CREATED);
        }
        return new ResponseEntity<>("Email is already registered", HttpStatus.BAD_REQUEST);
    }
}