package com.banking.loanservice.controller;

import com.banking.loanservice.dto.LoanRequest;
import com.banking.loanservice.entity.Loan;
import com.banking.loanservice.repository.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@RestController
@RequestMapping("/api/loans")
public class LoanController {

    @Autowired
    private LoanRepository loanRepository;

    @PostMapping("/apply")
    public Loan applyLoan(@RequestBody LoanRequest request) {
        Loan loan = new Loan();
        loan.setCustomerId(request.getCustomerId());
        loan.setAmount(request.getAmount());
        loan.setTenureMonths(request.getTenureMonths());
        loan.setStatus("APPROVED"); // Auto approve for demo

        // Simple EMI calc: (Amount + 10% interest) / months
        BigDecimal totalAmount = request.getAmount().multiply(new BigDecimal("1.10"));
        BigDecimal emi = totalAmount.divide(new BigDecimal(request.getTenureMonths()), 2, RoundingMode.HALF_UP);
        loan.setEmi(emi);

        return loanRepository.save(loan);
    }

    @GetMapping("/user/{customerId}")
    public List<Loan> getLoans(@PathVariable Long customerId) {
        return loanRepository.findByCustomerId(customerId);
    }

    @PostMapping("/{loanId}/pay-emi")
    public String payEmi(@PathVariable String loanId) {
        // Logic to deduct from account service would go here via Feign Client
        // For now just return success
        return "EMI Paid for loan " + loanId;
    }
}
