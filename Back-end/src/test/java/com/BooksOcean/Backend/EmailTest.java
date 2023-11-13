package com.BooksOcean.Backend;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class EmailTest {
    @Test
    void test1(){
        User user = new User();
        assertTrue(user.validateEmail("M@yahoo.com"));
    }

    @Test
    void test2(){
        User user = new User();
        assertTrue(user.validateEmail("ahmed.mohamed@gmail.com"));
    }

    @Test
    void test3(){
        User user = new User();
        assertTrue(user.validateEmail("ayman@alexu.edu.eg"));
    }

    @Test
    void test4(){
        User user = new User();
        assertTrue(user.validateEmail("khaled#@yahoo.corporate"));
    }

    @Test
    void test5(){
        User user = new User();
        assertFalse(user.validateEmail("M#yahoo.com"));
    }

}
