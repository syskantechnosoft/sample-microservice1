package com.banking.customerservice.controller;

import com.banking.customerservice.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping("/health")
    public String health() {
        return "Customer Service is running!";
    }

    @GetMapping("/db")
    public String testDb() {
        try {
            long count = customerRepository.count();
            return "Database connection successful. Customer count: " + count;
        } catch (Exception e) {
            return "Database connection failed: " + e.getMessage();
        }
    }
}