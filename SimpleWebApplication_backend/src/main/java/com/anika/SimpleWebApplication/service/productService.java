package com.anika.SimpleWebApplication.service;
import com.anika.SimpleWebApplication.model.product;
import com.anika.SimpleWebApplication.repository.productRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
//service and component are same but as we are in service layer we will use service
public class productService {
    //    List<product>products= new ArrayList<>(Arrays.asList(new product(1,"One plus phone",36000),
    //                            new product(2,"Macbook",90000)));

    @Autowired
    private productRepository repo;
    public List<product> getProducts(){
        //return products;
        return repo.findAll();
    }


    public product getProductById(int prodID) {
        //        for (product p : products) {
        //            if (p.getProdID() == prodID) {
        //                return p;
        //            }
        //        }
        //        return null;
        // we are using orElse so that it will use one new product object instead of error
        return repo.findById(prodID).orElse(null);
    }

    public void addProduct(product prod) {
        //products.add(prod);
        repo.save(prod);
    }

    public void updateProduct(product prod) {
            //        for(int i=0;i<products.size();i++){
            //            if(products.get(i).getProdID()==prod.getProdID()){
            //                products.set(i,prod);
            //            }
            //        }
            //for this we will also use save
            //if the object is not there it will create it or update it
            repo.save(prod);


    }

    public void deleteProduct(int prodID) {
        //        for (int i=0;i<products.size();i++){
        //            if(products.get(i).getProdID()==prodID){
        //                products.remove(i);
        //            }
        //        }
        repo.deleteById(prodID);
    }
}
