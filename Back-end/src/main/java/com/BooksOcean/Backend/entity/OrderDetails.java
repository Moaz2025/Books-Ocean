package com.BooksOcean.Backend.entity;

import lombok.Data;

import java.util.List;

@Data
public class OrderDetails {
    private List<CartItem> items;
    private String shippingAddress;
    private String phoneNumber;
}
