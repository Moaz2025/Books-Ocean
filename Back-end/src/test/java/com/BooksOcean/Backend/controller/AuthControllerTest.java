package com.BooksOcean.Backend.controller;

import com.BooksOcean.Backend.entity.Buyer;
import com.BooksOcean.Backend.service.BuyerService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AuthControllerTest {
    Buyer buyer = new Buyer();
    @Autowired
    AuthController authController = new AuthController();
    @Autowired
    BuyerService buyerService = new BuyerService();


    @Test
    void signUp1() {
        buyer.setEmail("test@gmail.com");
        buyer.setPassword("test");
        buyer.setFirstName("test");
        buyer.setLastName("1");
        assertTrue("Signed up successfully".equalsIgnoreCase(
                authController.signUp(buyer).getBody()));
        buyerService.deleteBuyer(buyer);

    }

    @Test
    void signUp2() {
        buyer.setEmail("test@gmail");
        buyer.setPassword("test");
        buyer.setFirstName("test");
        buyer.setLastName("1");
        assertTrue("Email is not valid".equalsIgnoreCase(
                authController.signUp(buyer).getBody()));
    }

    @Test
    void signUp3() {
        Buyer buyer1 = new Buyer();
        buyer.setEmail("test@gmail.com");
        buyer.setPassword("test");
        buyer.setFirstName("test");
        buyer.setLastName("1");
        authController.signUp(buyer);

        buyer1.setEmail("test@gmail.com");
        buyer1.setPassword("test");
        buyer1.setFirstName("test1");
        buyer1.setLastName("11");
        assertTrue("Email is already registered".equalsIgnoreCase(
                authController.signUp(buyer1).getBody()));
        buyerService.deleteBuyer(buyer);
        buyerService.deleteBuyer(buyer1);
    }

}