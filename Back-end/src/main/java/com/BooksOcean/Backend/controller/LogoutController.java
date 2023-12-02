package com.BooksOcean.Backend.controller;

import com.BooksOcean.Backend.entity.Admin;
import com.BooksOcean.Backend.entity.Buyer;
import com.BooksOcean.Backend.entity.LoginResponse;
import com.BooksOcean.Backend.service.AdminService;
import com.BooksOcean.Backend.service.BuyerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class LogoutController {
    @Autowired
    private BuyerService buyerService;
    @Autowired
    private AdminService adminService;
    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestBody LoginResponse loginResponse){
        if(loginResponse.getUserType().equalsIgnoreCase("buyer")) {
            Buyer buyer = buyerService.getBuyerByEmail(loginResponse.getEmail());
            buyer.setToken(null);
            buyerService.updateBuyer(buyer);
        }
        if(loginResponse.getUserType().equalsIgnoreCase("admin")){
            Admin admin = adminService.getAdminByEmail(loginResponse.getEmail());
            admin.setToken(null);
            adminService.updateAdmin(admin);
        }
        return new ResponseEntity<>("Logged out successfully ", HttpStatus.ACCEPTED);
    }
}

