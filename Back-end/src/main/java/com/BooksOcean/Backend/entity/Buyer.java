package com.BooksOcean.Backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Table(name = "buyers")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Buyer {

    @Id
    private String email;

    private String username;

    private String firstName;

    private String lastName;

    private String salt;

    private String password;

    private String providerId;
}
