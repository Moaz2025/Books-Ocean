package com.BooksOcean.Backend.controller;

import com.BooksOcean.Backend.entity.Buyer;
import com.BooksOcean.Backend.entity.LoginForm;
import com.BooksOcean.Backend.entity.LoginResponse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class LogoutControllerTest {
    Buyer buyer = new Buyer();
    LoginForm loginForm = new LoginForm();
    LoginResponse loginResponse = new LoginResponse();
    @Autowired
    AuthController authController = new AuthController();
    @Autowired
    LoginController loginController = new LoginController();
    @Autowired
    LogoutController logoutController = new LogoutController();

    @Test
    void buyerLogout() {
        buyer.setEmail("test@gmail.com");
        buyer.setPassword("test");
        buyer.setFirstName("test");
        buyer.setLastName("1");
        authController.signUp(buyer);
        loginForm.setEmail("test@gmail.com");
        loginForm.setPassword("test");
        loginForm.setUserType("buyer");
        loginResponse = loginController.login(loginForm).getBody();
        String token = loginResponse.getToken();
        assertTrue("Logged out successfully ".equalsIgnoreCase(logoutController.logout(loginResponse).getBody()));
    }

    @Test
    void adminLogout() {
        loginForm.setEmail("admin@booksocean.com");
        loginForm.setPassword("admin");
        loginForm.setUserType("admin");
        loginResponse = loginController.login(loginForm).getBody();
        String token = loginResponse.getToken();
        assertTrue("Logged out successfully ".equalsIgnoreCase(logoutController.logout(loginResponse).getBody()));
    }
}