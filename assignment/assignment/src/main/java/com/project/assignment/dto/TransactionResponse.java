package com.project.assignment.dto;

import com.project.assignment.enums.TransactionStatus;

import java.math.BigDecimal;
import java.util.UUID;

public record TransactionResponse(
        UUID transactionId,
        TransactionStatus status,
        BigDecimal amount,
        BigDecimal balance
) {
}