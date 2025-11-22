package com.anika.SimpleWebApplication.repository;

import com.anika.SimpleWebApplication.model.users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface userRepository extends JpaRepository<users,Integer> {
    users findByUsername(String username);
}
