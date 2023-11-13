package com.BooksOcean.Backend;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class PasswordTest {
    @Test
    void test1(){
        User user = new User();
        String passwordToHash = "moaz";
        String salt = user.getSalt();
        String hashedPassword = user.hashPassword(passwordToHash, salt);
        assertTrue(user.verifyPassword("moaz",hashedPassword,salt));
    }
}
