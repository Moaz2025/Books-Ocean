package com.BooksOcean.Backend.repository;

import com.BooksOcean.Backend.entity.Buyer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface BuyerRepository extends JpaRepository<Buyer, String> {

}
