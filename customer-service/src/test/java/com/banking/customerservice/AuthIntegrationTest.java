package com.banking.customerservice;

import com.banking.customerservice.dto.AuthRequest;
import com.banking.customerservice.repository.CustomerRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AuthIntegrationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private CustomerRepository repository;

    @BeforeEach
    public void setUp() {
        repository.deleteAll();
    }

    @Test
    public void testRegisterAndLogin() {
        String baseUrl = "http://localhost:" + port + "/api/customers";

        // Register
        AuthRequest registerRequest = new AuthRequest("test@example.com", "password", "Test User");
        ResponseEntity<String> registerResponse = restTemplate.postForEntity(baseUrl + "/register", registerRequest,
                String.class);
        assertEquals(200, registerResponse.getStatusCodeValue());
        assertEquals("User added to system", registerResponse.getBody());

        // Login
        AuthRequest loginRequest = new AuthRequest("test@example.com", "password", null);
        ResponseEntity<String> loginResponse = restTemplate.postForEntity(baseUrl + "/login", loginRequest,
                String.class);
        assertEquals(200, loginResponse.getStatusCodeValue());
        assertNotNull(loginResponse.getBody());
    }
}
