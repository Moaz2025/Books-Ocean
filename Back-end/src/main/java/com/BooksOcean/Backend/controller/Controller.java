package com.BooksOcean.Backend.controller;

import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class Controller {

    @GetMapping("/")
    public String home() {
        return "Hello, Home!";
    }

    @GetMapping("/secured")
    public Map<String, Object> buyer(OAuth2AuthenticationToken oAuth2AuthenticationToken){
        Map<String,Object> buyerAttributes;
        buyerAttributes = oAuth2AuthenticationToken.getPrincipal().getAttributes();
        //System.out.println(oAuth2AuthenticationToken.getPrincipal().getAttributes());
        System.out.println("Email:" + buyerAttributes.get("email"));
        System.out.println("First name: " + buyerAttributes.get("given_name"));
        System.out.println("Last name: " + buyerAttributes.get("family_name"));
        return oAuth2AuthenticationToken.getPrincipal().getAttributes();
    }
    public String secured() {
        return "Hello, Secured!";
    }
}
