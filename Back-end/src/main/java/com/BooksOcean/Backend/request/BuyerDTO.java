package com.BooksOcean.Backend.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.lang.reflect.Field;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BuyerDTO {

    private String email;

    private String password;

    public String checkProperties() throws IllegalAccessException {
        for(Field f : getClass().getDeclaredFields()){
            if(f.get(this) == null){
                String[] arr = f.toString().split("\\.");
                String t = arr[arr.length - 1];
                if(t.equalsIgnoreCase("username")
                        || t.equalsIgnoreCase("password")
                        || t.equalsIgnoreCase("role")
                ){
                    return t;
                }
            }
        }
        return null;
    }

}
