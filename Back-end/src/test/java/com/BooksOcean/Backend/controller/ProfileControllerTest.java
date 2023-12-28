package com.BooksOcean.Backend.controller;

import com.BooksOcean.Backend.entity.*;
import com.BooksOcean.Backend.service.AdminService;
import com.BooksOcean.Backend.service.BuyerService;
import com.BooksOcean.Backend.service.Validation;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest


class ProfileControllerTest {
    Buyer buyer = new Buyer();
    Admin admin = new Admin();
    @Autowired
    ProfileController profileController = new ProfileController();
    @Autowired
    BuyerService buyerService = new BuyerService();
    @Autowired
    AdminService adminService = new AdminService();
    @Autowired
    Validation validation = new Validation();
    @Autowired
    LoginController loginController = new LoginController();
    @Autowired
    AuthController authController = new AuthController();
    @Autowired
    LogoutController logoutController = new LogoutController();
    UsernameForm usernameForm = new UsernameForm();
    PasswordForm passwordForm = new PasswordForm();
    LoginForm loginForm = new LoginForm();

    @Test
    void usernameInvalidUsertype(){
        usernameForm.setUserType("dsfhhjkf");
        assertTrue("Not a valid usertype".equalsIgnoreCase(profileController.editUsername("0", "", usernameForm).getBody()));
    }
    @Test
    void usernameBuyerNotAuthorized(){
        usernameForm.setUserType("buyer");
        buyer.setEmail("test@gmail.com");
        buyer.setPassword("test");
        authController.signUp(buyer);
        loginForm.setEmail("test@gmail.com");
        loginForm.setPassword("test");
        loginForm.setUserType("buyer");
        loginController.login(loginForm);
        assertTrue("Not authorized user".equalsIgnoreCase(profileController.editUsername("", buyer.getEmail(), usernameForm).getBody()));
        buyerService.deleteBuyer(buyer);
    }
    @Test
    void usernameAdminNotAuthorized(){
        usernameForm.setUserType("admin");
        admin.setEmail("test@gmail.com");
        admin.setSalt(validation.getSalt());
        String password = validation.hashPassword("test", admin.getSalt());
        admin.setPassword(password);
        adminService.createAdmin(admin);
        loginForm.setEmail("test@gmail.com");
        loginForm.setPassword("test");
        loginForm.setUserType("admin");
        loginController.login(loginForm);
        assertTrue("Not authorized user".equalsIgnoreCase(profileController.editUsername("", admin.getEmail(), usernameForm).getBody()));
        adminService.deleteAdmin(admin);
    }
    @Test
    void usernameBuyerSucceeded(){
        usernameForm.setUserType("buyer");
        buyer.setEmail("test@gmail.com");
        buyer.setPassword("test");
        authController.signUp(buyer);
        loginForm.setEmail("test@gmail.com");
        loginForm.setPassword("test");
        loginForm.setUserType("buyer");
        loginController.login(loginForm);
        buyer = buyerService.getBuyerByEmail("test@gmail.com");
        String token = "Bearer " + buyer.getToken();
        assertTrue("Username changed successfully".equalsIgnoreCase(profileController.editUsername(token, buyer.getEmail(), usernameForm).getBody()));
        buyerService.deleteBuyer(buyer);
    }
    @Test
    void usernameAdminSucceeded(){
        usernameForm.setUserType("admin");
        admin.setEmail("test@gmail.com");
        String password = validation.hashPassword("test", "test");
        admin.setPassword(password);
        admin.setSalt("test");
        adminService.createAdmin(admin);
        loginForm.setEmail("test@gmail.com");
        loginForm.setPassword("test");
        loginForm.setUserType("admin");
        loginController.login(loginForm);
        admin = adminService.getAdminByEmail("test@gmail.com");
        String token = "Bearer " + admin.getToken();
        assertTrue("Username changed successfully".equalsIgnoreCase(profileController.editUsername(token, admin.getEmail(), usernameForm).getBody()));
        adminService.deleteAdmin(admin);
    }

}