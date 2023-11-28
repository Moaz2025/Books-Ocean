package com.BooksOcean.Backend;

import com.BooksOcean.Backend.entity.Admin;
import com.BooksOcean.Backend.repository.AdminRepository;
import com.BooksOcean.Backend.service.AdminService;
import com.BooksOcean.Backend.service.Validation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackEndApplication {

	public static void main(String[] args) {
//		AdminService adminService = new AdminService();
//		Admin admin = adminService.getAdminByEmail("admin@booksocean.com");
//		if(admin == null){
//			Validation validation = new Validation();
//			String passwordToHash = "admin";
//			String salt = validation.getSalt();
//			String hashedPassword = validation.hashPassword(passwordToHash, salt);
//			admin.setPassword(hashedPassword);
//			admin.setSalt(salt);
//			admin.setEmail("admin@booksocean.com");
//			adminService.createAdmin(admin);
//		}

		SpringApplication.run(BackEndApplication.class, args);
	}

}
