package com.BooksOcean.Backend.services;

import com.BooksOcean.Backend.entity.Admin;
import com.BooksOcean.Backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public Admin getAdminByEmail(String email){
        return adminRepository.findById(email).orElse(null);
    }

    public Admin updateAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

}
