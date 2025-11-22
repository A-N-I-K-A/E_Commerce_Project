package com.anika.SimpleWebApplication.controller;

import com.anika.SimpleWebApplication.model.users;
import com.anika.SimpleWebApplication.repository.userRepository;
import com.anika.SimpleWebApplication.service.userService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class userController {

    @Autowired
    private userService userService;

    BCryptPasswordEncoder encoder=new BCryptPasswordEncoder(12);

    @PostMapping("/register")
    public users register(@RequestBody users user){
        user.setPassword(encoder.encode(user.getPassword()));
        return userService.register(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody users user){
        return userService.verify(user);
    }
}
