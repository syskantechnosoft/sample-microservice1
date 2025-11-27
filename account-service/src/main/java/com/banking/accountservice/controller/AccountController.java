package com.banking.accountservice.controller;

import com.banking.accountservice.dto.AccountRequest;
import com.banking.accountservice.dto.TransactionRequest;
import com.banking.accountservice.entity.Account;
import com.banking.accountservice.entity.Transaction;
import com.banking.accountservice.repository.AccountRepository;
import com.banking.accountservice.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @PostMapping("/create")
    public Account createAccount(@RequestBody AccountRequest request) {
        Account account = new Account();
        account.setCustomerId(request.getCustomerId());
        account.setAccountType(request.getAccountType());
        account.setBalance(request.getInitialDeposit());
        return accountRepository.save(account);
    }

    @GetMapping("/user/{customerId}")
    public List<Account> getAccounts(@PathVariable Long customerId) {
        return accountRepository.findByCustomerId(customerId);
    }

    @PostMapping("/deposit")
    public Account deposit(@RequestBody TransactionRequest request) {
        Account account = accountRepository.findById(request.getAccountId())
                .orElseThrow(() -> new RuntimeException("Account not found"));
        account.setBalance(account.getBalance().add(request.getAmount()));

        Transaction transaction = new Transaction();
        transaction.setAccountId(account.getId());
        transaction.setAmount(request.getAmount());
        transaction.setType("DEPOSIT");
        transaction.setTimestamp(LocalDateTime.now());
        transactionRepository.save(transaction);

        return accountRepository.save(account);
    }

    @PostMapping("/withdraw")
    public Account withdraw(@RequestBody TransactionRequest request) {
        Account account = accountRepository.findById(request.getAccountId())
                .orElseThrow(() -> new RuntimeException("Account not found"));
        if (account.getBalance().compareTo(request.getAmount()) < 0) {
            throw new RuntimeException("Insufficient funds");
        }
        account.setBalance(account.getBalance().subtract(request.getAmount()));

        Transaction transaction = new Transaction();
        transaction.setAccountId(account.getId());
        transaction.setAmount(request.getAmount());
        transaction.setType("WITHDRAW");
        transaction.setTimestamp(LocalDateTime.now());
        transactionRepository.save(transaction);

        return accountRepository.save(account);
    }

    @PostMapping("/transfer")
    public String transfer(@RequestBody TransactionRequest request) {
        Account source = accountRepository.findById(request.getAccountId())
                .orElseThrow(() -> new RuntimeException("Source Account not found"));
        Account target = accountRepository.findById(request.getTargetAccountId())
                .orElseThrow(() -> new RuntimeException("Target Account not found"));

        if (source.getBalance().compareTo(request.getAmount()) < 0) {
            throw new RuntimeException("Insufficient funds");
        }

        source.setBalance(source.getBalance().subtract(request.getAmount()));
        target.setBalance(target.getBalance().add(request.getAmount()));

        Transaction t1 = new Transaction();
        t1.setAccountId(source.getId());
        t1.setAmount(request.getAmount());
        t1.setType("TRANSFER_OUT");
        t1.setTimestamp(LocalDateTime.now());
        transactionRepository.save(t1);

        Transaction t2 = new Transaction();
        t2.setAccountId(target.getId());
        t2.setAmount(request.getAmount());
        t2.setType("TRANSFER_IN");
        t2.setTimestamp(LocalDateTime.now());
        transactionRepository.save(t2);

        accountRepository.save(source);
        accountRepository.save(target);

        return "Transfer successful";
    }
}
