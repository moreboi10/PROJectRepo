package com.project.assignment.entity;

import com.project.assignment.enums.TransactionStatus;
import com.project.assignment.enums.TransactionType;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(
        name = "transactions",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_transaction_transaction_id",
                        columnNames = "transaction_id"
                )
        }
)
public class Transaction {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(
            name = "transaction_id",
            nullable = false,
            updatable = false
    )
    private UUID transactionId;

    @Column(
            name = "user_id",
            nullable = false,
            updatable = false
    )
    private UUID userId;

    @Column(
            nullable = false,
            precision = 19,
            scale = 2
    )
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransactionType type;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransactionStatus status;

    @Column(
            nullable = false,
            updatable = false
    )
    private LocalDateTime createdAt;

    protected Transaction() {
    }

    public Transaction(
            UUID transactionId,
            UUID userId,
            BigDecimal amount,
            TransactionType type,
            TransactionStatus status
    ) {
        this.transactionId = transactionId;
        this.userId = userId;
        this.amount = amount;
        this.type = type;
        this.status = status;
        this.createdAt = LocalDateTime.now();
    }

    public UUID getId() {
        return id;
    }

    public UUID getTransactionId() {
        return transactionId;
    }

    public UUID getUserId() {
        return userId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public TransactionType getType() {
        return type;
    }

    public TransactionStatus getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}