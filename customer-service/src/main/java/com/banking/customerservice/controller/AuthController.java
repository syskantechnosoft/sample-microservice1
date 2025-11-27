package com.banking.customerservice.controller;

import com.banking.customerservice.dto.AuthRequest;
import com.banking.customerservice.dto.LoginRequest;
import com.banking.customerservice.entity.Customer;
import com.banking.customerservice.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customers")
public class AuthController {

    @Autowired
    private AuthService service;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public String addNewUser(@RequestBody AuthRequest user) {
        try {
            System.out.println("Registration request received for: " + user.getEmail());
            return service.saveUser(user);
        } catch (Exception e) {
            System.err.println("Registration error: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Registration failed: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public String getToken(@RequestBody LoginRequest loginRequest) {
        try {
            System.out.println("Login request for: " + loginRequest.getEmail());
            Customer customer = service.getCustomer(loginRequest.getEmail());
            if (customer != null && passwordEncoder.matches(loginRequest.getPassword(), customer.getPassword())) {
                return service.generateToken(loginRequest.getEmail());
            } else {
                throw new RuntimeException("Invalid credentials");
            }
        } catch (Exception e) {
            System.err.println("Login error: " + e.getMessage());
            throw new RuntimeException("Login failed: " + e.getMessage());
        }
    }

    @GetMapping("/{email}")
    public Customer getCustomer(@PathVariable String email) {
        return service.getCustomer(email);
    }
}
