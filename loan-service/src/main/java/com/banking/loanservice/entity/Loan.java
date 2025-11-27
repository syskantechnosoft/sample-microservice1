package com.banking.loanservice.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;

@Document(collection = "loans")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Loan {
    @Id
    private String id;
    private Long customerId;
    private BigDecimal amount;
    private BigDecimal emi;
    private int tenureMonths;
    private String status; // APPLIED, APPROVED, CLOSED
}
