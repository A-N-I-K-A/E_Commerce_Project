package com.anika.SimpleWebApplication.model;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import org.springframework.stereotype.Component;


//the product class represents our data
//so we moved product into model package
//as the id name and price are private we need to give getter setter for them
//we can do that by using lombok

@Component
//if we want to create table of a class then we need to use @Entity
@Entity
public class product {
    @Id
    //@Id is used to refer the primary key
    private Integer prodID;
    private String prodName;
    private Integer prodPrice;

    @Override
    public String toString() {
        return "product{" +
                "prodID=" + prodID +
                ", prodName='" + prodName + '\'' +
                ", prodPrice=" + prodPrice +
                '}';
    }

    public product() {

    }

    public product(int prodID, String prodName, int prodPrice) {
        this.prodID = prodID;
        this.prodName = prodName;
        this.prodPrice = prodPrice;
    }

    public int getProdID() {
        return prodID;
    }

    public void setProdID(int prodID) {
        this.prodID = prodID;
    }

    public String getProdName() {
        return prodName;
    }

    public void setProdName(String prodName) {
        this.prodName = prodName;
    }

    public int getProdPrice() {
        return prodPrice;
    }

    public void setProdPrice(int prodPrice) {
        this.prodPrice = prodPrice;
    }
}

