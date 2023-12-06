package com.BooksOcean.Backend.repository;

import com.BooksOcean.Backend.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Integer> {
    Book findByTitle(String title);
    List<Book> findByAuthor(String author);
}