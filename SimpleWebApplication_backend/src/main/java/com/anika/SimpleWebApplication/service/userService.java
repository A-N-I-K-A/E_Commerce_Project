package com.anika.SimpleWebApplication.service;

import com.anika.SimpleWebApplication.model.users;
import com.anika.SimpleWebApplication.repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class userService {
    @Autowired
    private userRepository userRepository;
    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JWTService jwtService;
    public String verify(users user) {
        Authentication authentication=authManager.authenticate(new UsernamePasswordAuthenticationToken(
                user.getUsername(),user.getPassword()
        ));

        if(authentication.isAuthenticated()){
            return jwtService.generateToken(user.getUsername());
        }
        return "Fail";
    }

    public users register(users user) {
        return userRepository.save(user);
    }
}
