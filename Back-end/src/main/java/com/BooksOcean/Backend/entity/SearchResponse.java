package com.BooksOcean.Backend.entity;

import lombok.Data;

import java.util.List;

@Data
public class SearchResponse {
    private String message;
    private List<Book> books;
}
