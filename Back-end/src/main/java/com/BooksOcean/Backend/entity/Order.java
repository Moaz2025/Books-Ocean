package com.BooksOcean.Backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Data
@Table(name = "orders")

public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "buyerEmail")
    private Buyer buyer;
    private double totalPrice;
    private Date date;
    private String shippingAddress;
    private String phoneNumber;
}
