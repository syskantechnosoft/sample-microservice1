package com.banking.loanservice.repository;

import com.banking.loanservice.entity.Loan;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface LoanRepository extends MongoRepository<Loan, String> {
    List<Loan> findByCustomerId(Long customerId);
}
