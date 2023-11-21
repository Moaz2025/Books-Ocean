package com.BooksOcean.Backend.repository;

import com.BooksOcean.Backend.entity.Buyer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BuyerRepository extends JpaRepository<Buyer,Long> {
    Buyer findByUsername(String username);
    Optional<Buyer> findByUsernameAndProviderId(String userName, String providerId);

}
