package com.anika.SimpleWebApplication.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import org.springframework.stereotype.Component;

@Component
@Entity
public class users {
    @Id
    private String username;
    private String password;


    public users( String username, String password) {
        this.username = username;
        this.password = password;
    }

    public users() {
    }



    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "users{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
