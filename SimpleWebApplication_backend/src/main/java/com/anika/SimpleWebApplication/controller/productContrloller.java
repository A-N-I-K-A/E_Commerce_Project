package com.anika.SimpleWebApplication.controller;

import com.anika.SimpleWebApplication.model.product;
import com.anika.SimpleWebApplication.service.productService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class productContrloller {
    @Autowired
    private productService service;

    //GetMapping means we are using GET method, if we use RequestMapping then in the () we have
    //to specify the method
    @GetMapping("/products")
    public List<product> productController(){
        return service.getProducts();
    }

    //this time we want to return only one product
    //now we want to get one product using url like /product/101 but this 101 is our id and we want
    //to store it in the prodId so we will use /{prodId} so whatever we give in the url will be stored
    //in prodId and we will also use @PathVairable becuase we are giving the value in the url path

    @GetMapping("/products/{prodID}")
    public product getProdcutById(@PathVariable int prodID){
        return service.getProductById(prodID);
    }

    @PostMapping("/products")
    //as we are giving data from the client side to the server we will use
    //@RequestBody method to match the data and put it in the object
    public ResponseEntity<String> addProduct(@RequestBody product prod){
        System.out.println(prod);
        if(service.getProductById(prod.getProdID())==null) {
            service.addProduct(prod);
            return ResponseEntity.status(HttpStatus.CREATED).body(prod.toString());
        }
        return ResponseEntity.badRequest().body("Invalid data");
    }

    @PutMapping("/products")
    public ResponseEntity<String> updateProduct(@RequestBody product prod){
        service.updateProduct(prod);
        return ResponseEntity.status(HttpStatus.CREATED).body(prod.toString());
    }

    @DeleteMapping("/products/{prodID}")
    public ResponseEntity<String> deleteProduct(@PathVariable int prodID){
        if(service.getProductById(prodID)==null){
            return ResponseEntity.badRequest().body("Invalid data");
        }
        service.deleteProduct(prodID);
        return  ResponseEntity.ok().body("Product deleted");
    }


}
