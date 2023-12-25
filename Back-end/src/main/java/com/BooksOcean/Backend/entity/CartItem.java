package com.BooksOcean.Backend.entity;

import lombok.Data;

@Data
public class CartItem {
    private int bookId;
    private int amount;
}
