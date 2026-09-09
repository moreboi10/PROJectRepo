package com.project.assignment.service;



import com.project.assignment.entity.Transaction;
import com.project.assignment.dto.TransactionRequest;
import com.project.assignment.dto.TransactionResponse;
import com.project.assignment.entity.Wallet;
import com.project.assignment.enums.TransactionStatus;
import com.project.assignment.enums.TransactionType;
import com.project.assignment.exception.DuplicateTransactionException;
import com.project.assignment.exception.InsufficientFundsException;
import com.project.assignment.exception.WalletNotFoundException;
import com.project.assignment.repository.TransactionRepository;
import com.project.assignment.repository.WalletRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service
public class TransactionService {

    private final WalletRepository walletRepository;
    private final TransactionRepository transactionRepository;

    public TransactionService(
            WalletRepository walletRepository,
            TransactionRepository transactionRepository
    ) {
        this.walletRepository = walletRepository;
        this.transactionRepository = transactionRepository;
    }

    @Transactional
    public TransactionResponse process(TransactionRequest request) {

        var existingTransaction =
                transactionRepository.findByTransactionId(
                        request.transactionId()
                );

        if (existingTransaction.isPresent()) {
            throw new DuplicateTransactionException(
                    "Transaction has already been processed: "
                            + request.transactionId()
            );
        }

        Wallet wallet = walletRepository
                .findByUserIdForUpdate(request.userId())
                .orElseThrow(() ->
                        new WalletNotFoundException(
                                "Wallet not found for user: "
                                        + request.userId()
                        )
                );

        if (request.type() == TransactionType.DEBIT) {

            if (wallet.getBalance().compareTo(request.amount()) < 0) {
                throw new InsufficientFundsException(
                        "Insufficient funds. Available: "
                                + wallet.getBalance()
                                + ", requested: "
                                + request.amount()
                );
            }

            wallet.setBalance(
                    wallet.getBalance().subtract(request.amount())
            );

        } else if (request.type() == TransactionType.CREDIT) {

            wallet.setBalance(
                    wallet.getBalance().add(request.amount())
            );
        }

        Transaction transaction = new Transaction(
                request.transactionId(),
                request.userId(),
                request.amount(),
                request.type(),
                TransactionStatus.SUCCESS
        );

        try {
            transactionRepository.saveAndFlush(transaction);
        } catch (DataIntegrityViolationException ex) {
            throw new DuplicateTransactionException(
                    "Transaction has already been processed: "
                            + request.transactionId()
            );
        }

        return new TransactionResponse(
                transaction.getTransactionId(),
                transaction.getStatus(),
                transaction.getAmount(),
                wallet.getBalance()
        );
    }
}