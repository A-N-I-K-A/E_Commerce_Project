package com.anika.SimpleWebApplication.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController //by saying controller we are saying that this class will handle the client requests and invoke different methods depending upon the request url
public class homeController {

    @RequestMapping("/") //this will handle the request for home page "/" and show welcome
    //if we just say controller then it will look for a file (layout+data) named "welcome"
    //but we just want to show the data "Welcome"
    //this is why we will use RestController instead of Controller as annotation
    //REST means representational state transfer where the state is the data
    //we can also use @ResponseBody annotation before this method
    //@ResponseBody
    public String greet(){
       return "Welcome to E_commerce Site";
    }
    
    @RequestMapping("/about")
    public String about(){
        return "This is the about page";
    }
}
