package com.banking.accountservice.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class TransactionRequest {
    private Long accountId;
    private Long targetAccountId; // For transfer
    private BigDecimal amount;
}
