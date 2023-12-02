package com.BooksOcean.Backend;

import com.BooksOcean.Backend.service.Validation;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class EmailTest {
    @Test
    void test1(){
        Validation validation = new Validation();
        assertTrue(validation.validateEmail("M@yahoo.com"));
    }

    @Test
    void test2(){
        Validation validation = new Validation();
        assertTrue(validation.validateEmail("ahmed.mohamed@gmail.com"));
    }

    @Test
    void test3(){
        Validation validation = new Validation();
        assertTrue(validation.validateEmail("ayman@alexu.edu.eg"));
    }

    @Test
    void test4(){
        Validation validation = new Validation();
        assertFalse(validation.validateEmail("khaled#@yahoo.corporate"));
    }

    @Test
    void test5(){
        Validation validation = new Validation();
        assertFalse(validation.validateEmail("M#yahoo.com"));
    }

}
