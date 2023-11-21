package com.BooksOcean.Backend.service.oauth2;

import com.BooksOcean.Backend.entity.Provider;
import com.BooksOcean.Backend.exception.BaseException;

import java.util.Map;

public class OAuth2BuyerDetailsFactory {

    public static OAuth2BuyerDetails getOAuth2BuyerDetails(String registrationId, Map<String, Object> attributes){
        if(registrationId.equals(Provider.google.name())){
            return new OAuthGoogleBuyer(attributes);
        }
        else
            throw new BaseException("400","sorry");
    }
}
