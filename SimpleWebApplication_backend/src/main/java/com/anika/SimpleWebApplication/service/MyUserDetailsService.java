package com.anika.SimpleWebApplication.service;

import com.anika.SimpleWebApplication.model.userPrincipal;
import com.anika.SimpleWebApplication.model.users;
import com.anika.SimpleWebApplication.repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.nio.file.attribute.UserPrincipal;
@Service
public class MyUserDetailsService implements UserDetailsService {
    @Autowired
    private userRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        users currUser=userRepository.findByUsername(username);
        if(currUser==null){
            System.out.println("User not found");
            throw new UsernameNotFoundException(username);
        }
        return new userPrincipal(currUser);
    }
}
