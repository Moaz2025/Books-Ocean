package com.BooksOcean.Backend.service.impl;

import com.BooksOcean.Backend.entity.Buyer;

import com.BooksOcean.Backend.exception.BaseException;
import com.BooksOcean.Backend.repository.BuyerRepository;
import com.BooksOcean.Backend.request.BuyerDTO;
import com.BooksOcean.Backend.response.BaseResponse;
import com.BooksOcean.Backend.service.BuyerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;


@Service
@RequiredArgsConstructor
public class BuyerServiceImpl implements BuyerService {

    //private final com.BooksOcean.Backend.repository.RoleRepository roleRepository;

    private final BuyerRepository buyerRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public BaseResponse registerAccount(BuyerDTO buyerDTO) {
        BaseResponse response = new BaseResponse();

        //validate data from client
        validateAccount(buyerDTO);

        Buyer buyer = insertBuyer(buyerDTO);

        try {
            buyerRepository.save(buyer);
            response.setCode(String.valueOf(HttpStatus.CREATED.value()));
            response.setMessage("Register account successfully!!!");
        }catch (Exception e){
            response.setCode(String.valueOf(HttpStatus.SERVICE_UNAVAILABLE.value()));
            response.setMessage("Service Unavailable");
            //throw new BaseException(String.valueOf(HttpStatus.SERVICE_UNAVAILABLE.value()), "Service Unavailable");
        }
        return response;
    }

    private Buyer insertBuyer(BuyerDTO buyerDTO) {
        Buyer buyer = new Buyer();
        buyer.setEmail(buyerDTO.getEmail());
        buyer.setPassword(passwordEncoder.encode(buyerDTO.getPassword()));
        return buyer;
    }

    private void validateAccount(BuyerDTO buyerDTO){
        if(ObjectUtils.isEmpty(buyerDTO)){
            throw new BaseException(String.valueOf(HttpStatus.BAD_REQUEST.value()), "Request data not found!");
        }

        try {
            if(!ObjectUtils.isEmpty(buyerDTO.checkProperties())){
                throw new BaseException(String.valueOf(HttpStatus.BAD_REQUEST.value()), "Request data not found!");
            }
        }catch (IllegalAccessException e){
            throw new BaseException(String.valueOf(HttpStatus.SERVICE_UNAVAILABLE.value()), "Service Unavailable");
        }

        Buyer buyer = buyerRepository.findByEmail(buyerDTO.getEmail());

        if(!ObjectUtils.isEmpty(buyer)){
            throw new BaseException(String.valueOf(HttpStatus.BAD_REQUEST.value()), "User had existed!!!");
        }

    }
}
