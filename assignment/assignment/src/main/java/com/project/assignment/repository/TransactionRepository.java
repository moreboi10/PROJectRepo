package com.project.assignment.repository;

import com.project.assignment.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface TransactionRepository extends JpaRepository<Transaction, UUID> {

    Optional<Transaction> findByTransactionId(UUID transactionId);

    boolean existsByTransactionId(UUID transactionId);
}