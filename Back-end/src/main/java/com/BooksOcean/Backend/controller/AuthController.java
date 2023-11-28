package com.BooksOcean.Backend.controller;

import com.BooksOcean.Backend.entity.Buyer;
import com.BooksOcean.Backend.services.BuyerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    @Autowired
    private BuyerService buyerService;
    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody Buyer buyer){
        Buyer buyer1 = buyerService.getBuyerByEmail(buyer.getEmail());
        if (buyer1 == null){
            buyerService.createBuyer(buyer);
            return new ResponseEntity<>("Signed up successfully", HttpStatus.CREATED);
        }
        return new ResponseEntity<>("Email is already registered", HttpStatus.BAD_REQUEST);

    }
}
