package com.BooksOcean.Backend.entity;

import lombok.Data;

@Data
public class PasswordForm {
    private String oldPassword;
    private String newPassword;
    private String usertype;
}
