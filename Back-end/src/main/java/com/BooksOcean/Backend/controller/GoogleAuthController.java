package com.BooksOcean.Backend.controller;

import com.BooksOcean.Backend.entity.Buyer;
import com.BooksOcean.Backend.entity.LoginForm;
import com.BooksOcean.Backend.entity.LoginResponse;
import com.BooksOcean.Backend.services.BuyerService;
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
        Buyer buyer1 = buyerService.getBuyerByEmail(buyer.getEmail());
        if (buyer1 == null){
            buyer.setPassword(defaultPassword);
            buyerService.createBuyer(buyer);
            buyer1 = buyerService.getBuyerByEmail(buyer.getEmail());
        }
        LoginForm loginForm = new LoginForm();
        loginForm.setEmail(buyer1.getEmail());
        loginForm.setPassword(buyer1.getPassword());
        loginForm.setUserType("buyer");
        LoginController loginController = new LoginController();
        return loginController.login(loginForm);

    }
}
