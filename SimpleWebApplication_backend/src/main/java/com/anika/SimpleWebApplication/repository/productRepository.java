package com.anika.SimpleWebApplication.repository;

import com.anika.SimpleWebApplication.model.product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
//this repository annotation is also like @controller
//our repository will communicate with the database
//it extends JpaRepository which have a lot of methods so that we don't need to write the query
//here <product is the class, Integer is the type of primary key>
public interface productRepository extends JpaRepository<product,Integer>{

}
