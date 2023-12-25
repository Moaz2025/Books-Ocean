package com.BooksOcean.Backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "cart")

public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "buyerEmail")
    private Buyer buyer;
    @ManyToOne
    @JoinColumn(name = "bookId")
    private Book book;
    private int amount;
}
