package com.BooksOcean.Backend.controller;

import com.BooksOcean.Backend.entity.*;
import com.BooksOcean.Backend.service.AdminService;
import com.BooksOcean.Backend.service.BuyerService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PromotionControllerTest {

    Admin admin = new Admin();
    Buyer buyer = new Buyer();
    LoginForm loginForm = new LoginForm();
    LoginResponse loginResponse = new LoginResponse();
    @Autowired
    BuyerService buyerService = new BuyerService();
    @Autowired
    AdminService adminService = new AdminService();
    @Autowired
    AuthController authController = new AuthController();
    @Autowired
    LoginController loginController = new LoginController();
    @Autowired
    LogoutController logoutController = new LogoutController();
    @Autowired
    PromotionController promotionController = new PromotionController();

    @Test
    void getAllBuyersNotAuthorized() {
        String token = "test";
        assertTrue("Not authorized admin".equalsIgnoreCase(promotionController.getAllBuyers(token).getBody().getMessage()));
    }

    @Test
    void getAllBuyersAuthorized() {
        loginForm.setEmail("admin@booksocean.com");
        loginForm.setPassword("admin");
        loginForm.setUserType("admin");
        loginResponse = loginController.login(loginForm).getBody();
        String token = loginResponse.getToken();
        assertTrue("List of buyers".equalsIgnoreCase(promotionController.getAllBuyers(token).getBody().getMessage()));
        logoutController.logout(loginResponse);
    }

    @Test
    void promoteAdminNotAuthorized() {
        String token = "test";
        assertTrue("Not authorized admin".equalsIgnoreCase(promotionController.promoteAdmin(token, "test@gmail.com").getBody()));
    }

    @Test
    void promoteAdminNotFound() {
        loginForm.setEmail("admin@booksocean.com");
        loginForm.setPassword("admin");
        loginForm.setUserType("admin");
        loginResponse = loginController.login(loginForm).getBody();
        String token = loginResponse.getToken();
        assertTrue("No buyer with this email".equalsIgnoreCase(promotionController.promoteAdmin(token,"test@gmail.com").getBody()));
        logoutController.logout(loginResponse);
    }

    @Test
    void promoteAdminAlreadyPromoted() {
        buyer.setEmail("test@gmail.com");
        buyer.setPassword("test");
        buyer.setFirstName("test");
        buyer.setLastName("1");
        authController.signUp(buyer);
        loginForm.setEmail("admin@booksocean.com");
        loginForm.setPassword("admin");
        loginForm.setUserType("admin");
        loginResponse = loginController.login(loginForm).getBody();
        String token = loginResponse.getToken();
        promotionController.promoteAdmin(token,"test@gmail.com");
        assertTrue("Already promoted".equalsIgnoreCase(promotionController.promoteAdmin(token,"test@gmail.com").getBody()));
        buyerService.deleteBuyer(buyer);
        admin.setEmail("test_admin@gmail.com");
        adminService.deleteAdmin(admin);
        logoutController.logout(loginResponse);
    }

    @Test
    void promoteAdminSuccessfully() {
        buyer.setEmail("test@gmail.com");
        buyer.setPassword("test");
        buyer.setFirstName("test");
        buyer.setLastName("1");
        authController.signUp(buyer);
        loginForm.setEmail("admin@booksocean.com");
        loginForm.setPassword("admin");
        loginForm.setUserType("admin");
        loginResponse = loginController.login(loginForm).getBody();
        String token = loginResponse.getToken();
        assertTrue("Buyer promoted successfully".equalsIgnoreCase(promotionController.promoteAdmin(token,"test@gmail.com").getBody()));
        buyerService.deleteBuyer(buyer);
        admin.setEmail("test_admin@gmail.com");
        adminService.deleteAdmin(admin);
        logoutController.logout(loginResponse);
    }
}