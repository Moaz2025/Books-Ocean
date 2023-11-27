package com.BooksOcean.Backend.repository;

import com.BooksOcean.Backend.entity.Buyer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BuyerRepository extends JpaRepository<Buyer,String> {
    Buyer findByEmail(String email);
    Optional<Buyer> findByEmailAndProviderId(String email, String providerId);

}
