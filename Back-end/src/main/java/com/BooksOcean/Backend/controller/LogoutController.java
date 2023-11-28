package com.BooksOcean.Backend.controller;

import com.BooksOcean.Backend.entity.LoginResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class LogoutController {
    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestBody LoginResponse loginResponse){
        return new ResponseEntity<>("Logged out successfully ", HttpStatus.ACCEPTED);

    }
}

