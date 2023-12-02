package com.BooksOcean.Backend.controller;

import com.BooksOcean.Backend.entity.Admin;
import com.BooksOcean.Backend.entity.Buyer;
import com.BooksOcean.Backend.entity.LoginForm;
import com.BooksOcean.Backend.service.AdminService;
import com.BooksOcean.Backend.service.BuyerService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class LoginControllerTest {
    Buyer buyer = new Buyer();
    Admin admin = new Admin();
    LoginForm loginForm = new LoginForm();
    @Autowired
    AuthController authController = new AuthController();
    @Autowired
    LoginController loginController = new LoginController();
    @Autowired
    BuyerService buyerService = new BuyerService();
    @Autowired
    AdminService adminService = new AdminService();


    @Test
    void login1() {
        buyer.setEmail("test@gmail.com");
        buyer.setPassword("test");
        buyer.setFirstName("test");
        buyer.setLastName("1");
        authController.signUp(buyer);
        loginForm.setEmail("test@gmail.com");
        loginForm.setPassword("test");
        loginForm.setUserType("buyer");
        assertTrue("Login successfully".equalsIgnoreCase(
                loginController.login(loginForm).getBody().getMessage()));
        buyerService.deleteBuyer(buyer);
    }

    @Test
    void login2() {
        loginForm.setEmail("admin@booksocean.com");
        loginForm.setPassword("admin");
        loginForm.setUserType("admin");
        assertTrue("Login successfully".equalsIgnoreCase(
                loginController.login(loginForm).getBody().getMessage()));
    }

    @Test
    void login3() {
        loginForm.setEmail("admin@booksocean.com");
        loginForm.setPassword("ad");
        loginForm.setUserType("admin");
        assertTrue("Wrong password".equalsIgnoreCase(
                loginController.login(loginForm).getBody().getMessage()));
    }

    @Test
    void login4() {
        loginForm.setEmail("admin@gmail.com");
        loginForm.setPassword("ad");
        loginForm.setUserType("admin");
        assertTrue("User is not exist".equalsIgnoreCase(
                loginController.login(loginForm).getBody().getMessage()));
    }
}