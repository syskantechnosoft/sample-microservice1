package com.banking.accountservice.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class AccountRequest {
    private Long customerId;
    private String accountType;
    private BigDecimal initialDeposit;
}
