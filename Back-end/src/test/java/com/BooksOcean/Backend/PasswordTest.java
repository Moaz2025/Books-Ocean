package com.BooksOcean.Backend;

import com.BooksOcean.Backend.service.Validation;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class PasswordTest {
    @Test
    void test1(){
        Validation validation = new Validation();
        String passwordToHash = "moaz";
        String salt = validation.getSalt();
        String hashedPassword = validation.hashPassword(passwordToHash, salt);
        assertTrue(validation.verifyPassword("moaz",hashedPassword,salt));
    }

    @Test
    void test2(){
        Validation validation = new Validation();
        String passwordToHash = "14445";
        String salt = validation.getSalt();
        String hashedPassword = validation.hashPassword(passwordToHash, salt);
        assertFalse(validation.verifyPassword("14444",hashedPassword,salt));
    }

    @Test
    void test3(){
        Validation validation = new Validation();
        String passwordToHash = "k@#14445";
        String salt = validation.getSalt();
        String hashedPassword = validation.hashPassword(passwordToHash, salt);
        assertTrue(validation.verifyPassword("k@#14445",hashedPassword,salt));
    }

    @Test
    void test4(){
        Validation validation = new Validation();
        String passwordToHash = "@hhd14445";
        String salt = validation.getSalt();
        String hashedPassword = validation.hashPassword(passwordToHash, salt);
        assertFalse(validation.verifyPassword("#14444",hashedPassword,salt));
    }

    @Test
    void test5(){
        Validation validation = new Validation();
        String passwordToHash = "عامر";
        String salt = validation.getSalt();
        String hashedPassword = validation.hashPassword(passwordToHash, salt);
        assertTrue(validation.verifyPassword("عامر",hashedPassword,salt));
    }
}
