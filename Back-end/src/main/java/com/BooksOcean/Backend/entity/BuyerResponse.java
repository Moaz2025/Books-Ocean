package com.BooksOcean.Backend.entity;

import lombok.Data;

import java.util.List;

@Data
public class BuyerResponse {
    private String message;
    private List<BuyerAttributes> buyersList;
}
