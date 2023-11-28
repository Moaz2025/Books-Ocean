package com.BooksOcean.Backend.entity;

import lombok.Data;

@Data
public class LoginResponse {
    private String message;
    private String userType;
    private String email;
    private String token;
}