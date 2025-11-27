package com.banking.loanservice;

import com.banking.loanservice.dto.LoanRequest;
import com.banking.loanservice.entity.Loan;
import com.banking.loanservice.repository.LoanRepository;
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
public class LoanIntegrationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private LoanRepository repository;

    @BeforeEach
    public void setUp() {
        repository.deleteAll();
    }

    @Test
    public void testApplyLoan() {
        String baseUrl = "http://localhost:" + port + "/api/loans";

        LoanRequest request = new LoanRequest();
        request.setCustomerId(1L);
        request.setAmount(new BigDecimal("50000"));
        request.setTenureMonths(12);

        ResponseEntity<Loan> response = restTemplate.postForEntity(baseUrl + "/apply", request, Loan.class);

        assertEquals(200, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        assertEquals("APPROVED", response.getBody().getStatus());
        assertEquals(0, new BigDecimal("50000").compareTo(response.getBody().getAmount()));
    }
}
