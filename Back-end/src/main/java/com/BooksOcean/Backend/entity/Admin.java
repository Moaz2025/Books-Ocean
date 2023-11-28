package com.BooksOcean.Backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "admins")

public class Admin {

    @Id
    private String email;
    private String firstName;
    private String lastName;
    private String salt;
    private String password;

}
