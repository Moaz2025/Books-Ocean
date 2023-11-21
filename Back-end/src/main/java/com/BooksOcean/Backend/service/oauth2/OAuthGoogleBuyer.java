package com.BooksOcean.Backend.service.oauth2;

import java.util.Map;

public class OAuthGoogleBuyer extends OAuth2BuyerDetails{

    public OAuthGoogleBuyer(Map<String, Object> attributes){
        super(attributes);
    }

    @Override
    public String getName() {
        return (String) attributes.get("name");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public String getFirstName() {
        return (String) attributes.get("given_name");
    }

    @Override
    public String getLastName() {
        return (String) attributes.get("family_name");
    }
}
