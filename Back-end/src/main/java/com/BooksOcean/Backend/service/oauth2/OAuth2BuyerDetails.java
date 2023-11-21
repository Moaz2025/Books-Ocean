package com.BooksOcean.Backend.service.oauth2;

import java.util.Map;

public abstract class OAuth2BuyerDetails {
    protected Map<String, Object> attributes;

    public OAuth2BuyerDetails(Map<String, Object> attributes){
        this.attributes = attributes;
    }

    public abstract String getName();
    public abstract String getEmail();
    public abstract String getFirstName();
    public abstract String getLastName();

}
