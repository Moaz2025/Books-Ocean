package com.BooksOcean.Backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "books")

public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    @Column(length = 150)
    private String description;
    private String isbn;
    private double price;
    private String author;
    private String category;
    private Date publishDate;
    private String publisher;
    private int pagesNumber;
    private String coverImageLink;
    private int amount;
    @Column(columnDefinition = "INT DEFAULT 0")
    int rate;
    @Column(columnDefinition = "INT DEFAULT 0")
    int numOfRates;


}
