package com.BooksOcean.Backend.entity;

import java.util.List;
import lombok.Data;

@Data
public class RateResponse {
    private String message;
    private List<Rate> rates;
}
