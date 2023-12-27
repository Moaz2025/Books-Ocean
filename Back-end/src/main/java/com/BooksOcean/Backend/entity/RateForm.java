package com.BooksOcean.Backend.entity;

import lombok.Data;

@Data

public class RateForm {
    private int rating;
    private String review;
    private int book_id;
}
