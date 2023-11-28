package com.BooksOcean.Backend.controller;

import com.BooksOcean.Backend.entity.Admin;
import com.BooksOcean.Backend.entity.Buyer;
import com.BooksOcean.Backend.entity.LoginForm;
import com.BooksOcean.Backend.entity.LoginResponse;
import com.BooksOcean.Backend.services.AdminService;
import com.BooksOcean.Backend.services.BuyerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {
    @Autowired
    private BuyerService buyerService;
    @Autowired
    private AdminService adminService;
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginForm loginForm){
        LoginResponse loginResponse = new LoginResponse();
        if(loginForm.getUserType().equalsIgnoreCase("buyer")){
            Buyer buyer = buyerService.getBuyerByEmail(loginForm.getEmail());
            if (buyer == null){
                loginResponse.setMessage("User is not exist");
                return new ResponseEntity<>(loginResponse, HttpStatus.BAD_REQUEST);
            }
            if(loginForm.getPassword().equals(buyer.getPassword())){
                loginResponse.setMessage("Login successfully");
                loginResponse.setUserType("buyer");
                loginResponse.setEmail(loginForm.getEmail());
                loginResponse.setToken("156666"); //need to change
                return new ResponseEntity<>(loginResponse, HttpStatus.ACCEPTED);
            }
            loginResponse.setMessage("Wrong password");
        }
        if(loginForm.getUserType().equalsIgnoreCase("admin")){
            Admin admin = adminService.getAdminByEmail(loginForm.getEmail());
            if (admin == null){
                loginResponse.setMessage("User is not exist");
                return new ResponseEntity<>(loginResponse, HttpStatus.BAD_REQUEST);
            }
            if(loginForm.getPassword().equals(admin.getPassword())){
                loginResponse.setMessage("Login successfully");
                loginResponse.setUserType("admin");
                loginResponse.setEmail(loginForm.getEmail());
                loginResponse.setToken("156666"); //need to change
                return new ResponseEntity<>(loginResponse, HttpStatus.ACCEPTED);
            }
            loginResponse.setMessage("Wrong password");
        }
        return new ResponseEntity<>(loginResponse, HttpStatus.BAD_REQUEST);
    }
}
