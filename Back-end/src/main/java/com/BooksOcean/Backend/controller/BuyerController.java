package com.BooksOcean.Backend.controller;

import com.BooksOcean.Backend.entity.Buyer;
import com.BooksOcean.Backend.service.BuyerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/buyer")
public class BuyerController {

    @Autowired
    BuyerService service;
    @PostMapping("/add")
    public Buyer addBuyer(@RequestBody Buyer buyer){
        return service.addBuyer(buyer);

    }
}
