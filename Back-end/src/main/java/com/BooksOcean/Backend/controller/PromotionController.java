package com.BooksOcean.Backend.controller;

import com.BooksOcean.Backend.entity.Admin;
import com.BooksOcean.Backend.entity.Buyer;
import com.BooksOcean.Backend.entity.BuyerResponse;
import com.BooksOcean.Backend.service.AdminService;
import com.BooksOcean.Backend.service.BuyerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/promotion")
@CrossOrigin(origins = "http://localhost:3000")
public class PromotionController {

    @Autowired
    private BuyerService buyerService;
    @Autowired
    private AdminService adminService;

    @GetMapping("/getAllBuyers")
    public ResponseEntity<BuyerResponse> getAllBuyers(@RequestHeader("Authorization") String token) {
        token = token.replace("Bearer ", "");
        BuyerResponse buyerResponse = new BuyerResponse();
        if(adminService.getAdminByToken(token) == null){
            buyerResponse.setMessage("Not authorized admin");
            return new ResponseEntity<>(buyerResponse, HttpStatus.FORBIDDEN);
        }
        buyerResponse.setMessage("List of buyers");
        List<Buyer> buyers;
        buyers = buyerService.getAllBuyers();
        buyerResponse.setBuyers(buyers);
        return new ResponseEntity<>(buyerResponse, HttpStatus.ACCEPTED);
    }
    @PostMapping("/promoteAdmin")
    public ResponseEntity<String> promoteAdmin(@RequestHeader("Authorization") String token, @RequestBody String email){
        token = token.replace("Bearer ", "");
        if(adminService.getAdminByToken(token) == null){
            return new ResponseEntity<>("Not authorized admin", HttpStatus.FORBIDDEN);
        }
        if(buyerService.getBuyerByEmail(email) == null){
            return new ResponseEntity<>("No buyer with this email", HttpStatus.CONFLICT);
        }
        Buyer buyer = buyerService.getBuyerByEmail(email);
        Admin admin = new Admin();
        admin.setEmail(buyer.getEmail());
        admin.setFirstName(buyer.getFirstName());
        admin.setLastName(buyer.getLastName());
        admin.setSalt(buyer.getSalt());
        admin.setPassword(buyer.getPassword());
        adminService.createAdmin(admin);
        buyerService.deleteBuyer(buyer);
        return new ResponseEntity<>("Buyer promoted successfully", HttpStatus.ACCEPTED);
    }
}
