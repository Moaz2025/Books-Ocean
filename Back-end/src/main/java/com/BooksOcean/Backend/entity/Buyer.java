package com.BooksOcean.Backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Table(name = "buyers")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Buyer {

    @Id
    private String email;

    private String username;

    private String firstName;

    private String lastName;

    private String salt;

    private String password;

    private String providerId;


//    private boolean accountNonExpired;
//
//
//    private boolean isEnabled;
//
//
//    private boolean accountNonLocked;
//
//
//    private boolean credentialsNonExpired;


//    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.DETACH)
//    @JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "user_id"),
//            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "role_id"))
//    private Set<Role> roles;

}
