package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {
    @GetMapping("/")
    public String sayHello(){
        return "Hello this is , Vijay what an day\n First web application";
    }
}
