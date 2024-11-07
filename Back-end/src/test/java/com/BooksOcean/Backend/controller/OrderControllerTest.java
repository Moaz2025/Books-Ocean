package com.BooksOcean.Backend.controller;

import com.BooksOcean.Backend.entity.*;
import com.BooksOcean.Backend.service.BookPurchasedService;
import com.BooksOcean.Backend.service.BookService;
import com.BooksOcean.Backend.service.BuyerService;
import com.BooksOcean.Backend.service.OrderService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class OrderControllerTest {
    OrderDetails orderDetails = new OrderDetails();

    @Autowired
    OrderController orderController = new OrderController();

    @Test
    void commitOrderNotAuthorized() {
        String token = "test";
        assertTrue("Not authorized user".equalsIgnoreCase(orderController.commitOrder(token,orderDetails).getBody()));
    }

}