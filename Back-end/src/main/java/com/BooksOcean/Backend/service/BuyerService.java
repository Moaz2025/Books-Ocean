package com.BooksOcean.Backend.service;

import com.BooksOcean.Backend.request.BuyerDTO;
import com.BooksOcean.Backend.response.BaseResponse;

public interface BuyerService {

    BaseResponse registerAccount(BuyerDTO buyerDTO);
}
