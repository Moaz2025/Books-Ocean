package com.BooksOcean.Backend.service.security;


import com.BooksOcean.Backend.entity.Buyer;
import com.BooksOcean.Backend.exception.BaseException;
import com.BooksOcean.Backend.repository.BuyerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.util.ObjectUtils;



public class BuyerDetailsServiceCustom implements UserDetailsService {

    @Autowired
    private BuyerRepository buyerRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        BuyerDetailsCustom buyerDetailsCustom = getBuyerDetailsCustom(email);

        if(ObjectUtils.isEmpty(buyerDetailsCustom)){
            throw new UsernameNotFoundException("User not found");
        }
        return buyerDetailsCustom;
    }

    private BuyerDetailsCustom getBuyerDetailsCustom(String email){
        Buyer buyer = buyerRepository.findByEmail(email);

        if(ObjectUtils.isEmpty(buyer)){
            throw new BaseException(String.valueOf(HttpStatus.BAD_REQUEST), "User not found");
        }

        return new BuyerDetailsCustom(
                buyer.getEmail(),
                buyer.getPassword()
        );
    }
}
