package com.BooksOcean.Backend.repository;

import com.BooksOcean.Backend.entity.Admin;
import com.BooksOcean.Backend.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AdminRepository extends JpaRepository<Admin, String> {
    Admin findByToken(String token);
}
