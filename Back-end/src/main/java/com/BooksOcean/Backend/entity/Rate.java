package com.BooksOcean.Backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "rates")

public class Rate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "buyer_email")
    private Buyer buyer;
    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;
    @Column(length = 100)
    private String review;
    private int rating;
}
