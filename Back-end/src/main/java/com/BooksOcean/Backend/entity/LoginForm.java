package com.BooksOcean.Backend.entity;

import lombok.Data;

@Data
public class LoginForm {
    private String email;
    private String password;
    private String userType;
}
