package com.BooksOcean.Backend.controller;

import com.BooksOcean.Backend.entity.Buyer;
import com.BooksOcean.Backend.entity.LoginForm;
import com.BooksOcean.Backend.entity.LoginResponse;
import com.BooksOcean.Backend.service.BuyerService;
import com.BooksOcean.Backend.service.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class GoogleAuthController {
    String defaultPassword = "google";
    @Autowired
    private BuyerService buyerService;
    @PostMapping("/google")
    public ResponseEntity<LoginResponse> signUp(@RequestBody Buyer buyer){
        System.out.println(buyer.getEmail());
        Buyer buyer1 = buyerService.getBuyerByEmail(buyer.getEmail());
        if (buyer1 == null){
            buyer.setPassword(defaultPassword);
            buyerService.createBuyer(buyer);
            buyer1 = buyerService.getBuyerByEmail(buyer.getEmail());
        }
        LoginResponse loginResponse = new LoginResponse();
        LoginForm loginForm = new LoginForm();
        loginForm.setEmail(buyer1.getEmail());
        loginForm.setPassword(buyer1.getPassword());
        loginForm.setUserType("buyer");
        loginResponse.setMessage("Login successfully");
        loginResponse.setUserType("buyer");
        loginResponse.setEmail(loginForm.getEmail());
        Token token = new Token();
        String generatedToken = token.generateToken();
        buyer.setToken(generatedToken);
        loginResponse.setToken(generatedToken);
        buyerService.updateBuyer(buyer);
        return new ResponseEntity<>(loginResponse, HttpStatus.ACCEPTED);
    }
}