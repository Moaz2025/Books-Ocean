package com.BooksOcean.Backend.service.security;


import com.BooksOcean.Backend.entity.Buyer;
import com.BooksOcean.Backend.exception.BaseException;
import com.BooksOcean.Backend.repository.BuyerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.util.ObjectUtils;

import java.util.stream.Collectors;

public class BuyerDetailsServiceCustom implements UserDetailsService {

    @Autowired
    private BuyerRepository buyerRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        BuyerDetailsCustom buyerDetailsCustom = getBuyerDetailsCustom(username);

        if(ObjectUtils.isEmpty(buyerDetailsCustom)){
            throw new UsernameNotFoundException("User not found");
        }
        return buyerDetailsCustom;
    }

    private BuyerDetailsCustom getBuyerDetailsCustom(String email){
        Buyer buyer = buyerRepository.findByUsername(email);

        if(ObjectUtils.isEmpty(buyer)){
            throw new BaseException(String.valueOf(HttpStatus.BAD_REQUEST), "User not found");
        }

        return new BuyerDetailsCustom(
                buyer.getUsername(),
                buyer.getPassword(),
                buyer.getRoles().stream()
                        .map(r -> new SimpleGrantedAuthority(r.getName()))
                        .collect(Collectors.toList()),
                buyer.isEnabled(),
                buyer.isAccountNonExpired(),
                buyer.isAccountNonLocked(),
                buyer.isCredentialsNonExpired()
        );
    }
}
