package com.banking.accountservice;

import com.banking.accountservice.dto.AccountRequest;
import com.banking.accountservice.entity.Account;
import com.banking.accountservice.repository.AccountRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AccountIntegrationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private AccountRepository repository;

    @BeforeEach
    public void setUp() {
        repository.deleteAll();
    }

    @Test
    public void testCreateAccount() {
        String baseUrl = "http://localhost:" + port + "/api/accounts";

        AccountRequest request = new AccountRequest();
        request.setCustomerId(1L);
        request.setAccountType("SAVINGS");
        request.setInitialDeposit(new BigDecimal("1000.00"));

        ResponseEntity<Account> response = restTemplate.postForEntity(baseUrl + "/create", request, Account.class);

        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        assertEquals("SAVINGS", response.getBody().getAccountType());
        assertEquals(0, new BigDecimal("1000.00").compareTo(response.getBody().getBalance()));
    }
}
