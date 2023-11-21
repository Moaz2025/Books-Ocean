package com.BooksOcean.Backend.controller;

import com.BooksOcean.Backend.request.BuyerDTO;
import com.BooksOcean.Backend.response.BaseResponse;
import com.BooksOcean.Backend.service.BuyerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountController {

    private final BuyerService buyerService;

    @PostMapping("/register-account")
    public ResponseEntity<BaseResponse> registerAccount(@RequestBody BuyerDTO buyerDTO) {
        return ResponseEntity.ok(buyerService.registerAccount(buyerDTO));
    }
}
