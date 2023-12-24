package com.BooksOcean.Backend.controller;

import com.BooksOcean.Backend.entity.Buyer;
import com.BooksOcean.Backend.entity.LoginForm;
import com.BooksOcean.Backend.entity.LoginResponse;
import com.BooksOcean.Backend.service.BuyerService;
import com.BooksOcean.Backend.service.Token;
import com.BooksOcean.Backend.service.Validation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class GoogleAuthController {
    Validation validation = new Validation();
    String defaultPassword = "google";
    @Autowired
    private BuyerService buyerService;
    @PostMapping("/google")
    public ResponseEntity<LoginResponse> signUp(@RequestBody Buyer buyer){
        System.out.println(buyer.getEmail());
        Buyer dataBuyer = buyerService.getBuyerByEmail(buyer.getEmail());
        if (dataBuyer == null){
            buyer.setSalt(validation.getSalt());
            buyer.setPassword(validation.hashPassword(defaultPassword, buyer.getSalt()));
            buyerService.createBuyer(buyer);
            dataBuyer = buyerService.getBuyerByEmail(buyer.getEmail());
        }
        LoginResponse loginResponse = new LoginResponse();
        LoginForm loginForm = new LoginForm();
        loginForm.setEmail(dataBuyer.getEmail());
        loginForm.setPassword(dataBuyer.getPassword());
        loginForm.setUserType("buyer");
        loginResponse.setMessage("Login successfully");
        loginResponse.setUserType("buyer");
        loginResponse.setEmail(loginForm.getEmail());
        Token token = new Token();
        String generatedToken = token.generateToken();
        dataBuyer.setToken(generatedToken);
        loginResponse.setToken(generatedToken);
        buyerService.updateBuyer(dataBuyer);
        return new ResponseEntity<>(loginResponse, HttpStatus.ACCEPTED);
    }
}