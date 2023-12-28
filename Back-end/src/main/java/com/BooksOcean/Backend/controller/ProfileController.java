package com.BooksOcean.Backend.controller;

import com.BooksOcean.Backend.entity.Admin;
import com.BooksOcean.Backend.entity.Buyer;
import com.BooksOcean.Backend.entity.PasswordForm;
import com.BooksOcean.Backend.entity.UsernameForm;
import com.BooksOcean.Backend.service.AdminService;
import com.BooksOcean.Backend.service.BuyerService;
import com.BooksOcean.Backend.service.Validation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profile")
@CrossOrigin(origins = "http://localhost:3000")
public class ProfileController {
    @Autowired
    private BuyerService buyerService;
    @Autowired
    private AdminService adminService;
    @Autowired
    Validation validation;
    @PostMapping("/username/{email}")
    public ResponseEntity<String> editUsername(@RequestHeader ("Authorization") String token, @PathVariable String email, @RequestBody UsernameForm usernameForm){
        token = token.replace("Bearer ", "");
        if(usernameForm.getUserType().equalsIgnoreCase("buyer")){
            if(!token.equals(buyerService.getBuyerByEmail(email).getToken())){
                return new ResponseEntity<>("Not authorized user", HttpStatus.FORBIDDEN);
            }
            Buyer buyer = buyerService.getBuyerByEmail(email);
            buyer.setFirstName(usernameForm.getFirstName());
            buyer.setLastName(usernameForm.getLastName());
            buyerService.updateBuyer(buyer);
            return new ResponseEntity<>("Username changed successfully", HttpStatus.ACCEPTED);
        }
        if(usernameForm.getUserType().equalsIgnoreCase("admin")){
            if(!token.equals(adminService.getAdminByEmail(email).getToken())){
                return new ResponseEntity<>("Not authorized user", HttpStatus.FORBIDDEN);
            }
            Admin admin = adminService.getAdminByEmail(email);
            admin.setFirstName(usernameForm.getFirstName());
            admin.setLastName(usernameForm.getLastName());
            adminService.updateAdmin(admin);
            return new ResponseEntity<>("Username changed successfully", HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>("Not a valid usertype", HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/password/{email}")
    public ResponseEntity<String> changePassword(@RequestHeader ("Authorization") String token, @PathVariable String email, @RequestBody PasswordForm passwordForm){
        token = token.replace("Bearer ", "");
        if(passwordForm.getUsertype().equalsIgnoreCase("buyer")){
            if(!token.equals(buyerService.getBuyerByEmail(email).getToken())){
                return new ResponseEntity<>("Not authorized user", HttpStatus.FORBIDDEN);
            }
            Buyer buyer = buyerService.getBuyerByEmail(email);
            if(!validation.verifyPassword(passwordForm.getOldPassword(), buyer.getPassword(), buyer.getSalt())){
                return new ResponseEntity<>("Wrong Password", HttpStatus.FORBIDDEN);
            }
            String salt = validation.getSalt();
            String newHashedPassword = validation.hashPassword(passwordForm.getNewPassword(), salt);
            buyer.setSalt(salt);
            buyer.setPassword(newHashedPassword);
            buyerService.updateBuyer(buyer);
            return new ResponseEntity<>("Password changed successfully", HttpStatus.ACCEPTED);
        }
        if(passwordForm.getUsertype().equalsIgnoreCase("admin")){
            if(!token.equals(adminService.getAdminByEmail(email).getToken())){
                return new ResponseEntity<>("Not authorized user", HttpStatus.FORBIDDEN);
            }
            Admin admin = adminService.getAdminByEmail(email);
            if(!validation.verifyPassword(passwordForm.getOldPassword(), admin.getPassword(), admin.getSalt())){
                return new ResponseEntity<>("Wrong Password", HttpStatus.FORBIDDEN);
            }
            String salt = validation.getSalt();
            String newHashedPassword = validation.hashPassword(passwordForm.getNewPassword(), salt);
            admin.setSalt(salt);
            admin.setPassword(newHashedPassword);
            adminService.updateAdmin(admin);
            return new ResponseEntity<>("Password changed successfully", HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>("Not a valid usertype", HttpStatus.BAD_REQUEST);
    }
}