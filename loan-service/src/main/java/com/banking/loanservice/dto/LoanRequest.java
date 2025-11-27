package com.banking.loanservice.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class LoanRequest {
    private Long customerId;
    private BigDecimal amount;
    private int tenureMonths;
}
