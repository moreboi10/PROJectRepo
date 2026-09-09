package com.project.assignment;

import com.project.assignment.entity.Wallet;
import com.project.assignment.repository.TransactionRepository;
import com.project.assignment.repository.WalletRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class TransactionIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    private UUID userId;

    @BeforeEach
    void setUp() {

        transactionRepository.deleteAll();
        walletRepository.deleteAll();

        userId = UUID.randomUUID();

        Wallet wallet = new Wallet(
                userId,
                new BigDecimal("1000.00")
        );

        walletRepository.save(wallet);
    }

    @Test
    @DisplayName("Processes a single valid debit transaction successfully.")
    void processesSingleValidDebitSuccessfully() throws Exception {

        UUID transactionId = UUID.randomUUID();

        String requestBody = """
                {
                    "transactionId": "%s",
                    "userId": "%s",
                    "amount": 250.00,
                    "type": "DEBIT"
                }
                """.formatted(transactionId, userId);

        System.out.println();
        System.out.println("============================================================");
        System.out.println(
                "TEST: Processes a single valid debit transaction successfully."
        );

        mockMvc.perform(
                        post("/api/v1/transactions/process")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(requestBody)
                )
                .andExpect(status().isOk());

        Wallet updatedWallet = walletRepository
                .findByUserId(userId)
                .orElseThrow();

        BigDecimal expectedBalance =
                new BigDecimal("750.00");

        assertEquals(
                0,
                expectedBalance.compareTo(updatedWallet.getBalance())
        );

        System.out.println("Initial Balance : ₹1000.00");
        System.out.println("Debit           : ₹250.00");
        System.out.println(
                "Final Balance   : ₹" + updatedWallet.getBalance()
        );
        System.out.println("RESULT          : PASS");
        System.out.println("============================================================");
        System.out.println();
    }

    @Test
    @DisplayName("Sends 3 identical transactionIDs simultaneously. Ensures the balance is only deducted once.")
    void sendsThreeIdenticalTransactionsSimultaneously()
            throws Exception {

        UUID transactionId = UUID.randomUUID();

        String requestBody = """
                {
                    "transactionId": "%s",
                    "userId": "%s",
                    "amount": 250.00,
                    "type": "DEBIT"
                }
                """.formatted(transactionId, userId);

        System.out.println();
        System.out.println("============================================================");
        System.out.println(
                "TEST: Sends 3 identical transactionIDs simultaneously."
        );
        System.out.println(
                "      Ensures the balance is only deducted once."
        );

        int numberOfRequests = 3;

        ExecutorService executor =
                Executors.newFixedThreadPool(numberOfRequests);

        CountDownLatch ready =
                new CountDownLatch(numberOfRequests);

        CountDownLatch start =
                new CountDownLatch(1);

        List<Future<Integer>> results =
                new ArrayList<>();

        for (int i = 0; i < numberOfRequests; i++) {

            results.add(
                    executor.submit(() -> {

                        ready.countDown();

                        start.await();

                        return mockMvc.perform(
                                        post(
                                                "/api/v1/transactions/process"
                                        )
                                                .contentType(
                                                        MediaType.APPLICATION_JSON
                                                )
                                                .content(requestBody)
                                )
                                .andReturn()
                                .getResponse()
                                .getStatus();
                    })
            );
        }

        ready.await();

        start.countDown();

        int successfulRequests = 0;
        int duplicateRequests = 0;

        for (Future<Integer> result : results) {

            int status = result.get();

            if (status == 200) {
                successfulRequests++;
            } else if (status == 409) {
                duplicateRequests++;
            }
        }

        executor.shutdown();

        Wallet updatedWallet = walletRepository
                .findByUserId(userId)
                .orElseThrow();

        BigDecimal expectedBalance =
                new BigDecimal("750.00");

        assertEquals(
                1,
                successfulRequests,
                "Exactly one request should succeed"
        );

        assertEquals(
                2,
                duplicateRequests,
                "Exactly two requests should be rejected as duplicates"
        );

        assertEquals(
                0,
                expectedBalance.compareTo(
                        updatedWallet.getBalance()
                ),
                "Balance must be deducted only once"
        );

        System.out.println("Total Requests  : " + numberOfRequests);
        System.out.println("Successful      : " + successfulRequests);
        System.out.println("Duplicates      : " + duplicateRequests);
        System.out.println(
                "Final Balance   : ₹" + updatedWallet.getBalance()
        );
        System.out.println("RESULT          : PASS");
        System.out.println("============================================================");
        System.out.println();
    }

    @Test
    @DisplayName("Sends 10 concurrent debit requests of ₹100 for a wallet with a ₹500 balance. Ensures the final balance is exactly ₹0 and 5 requests fail with insufficient funds.")
    void sendsTenConcurrentDebitsWithLimitedBalance()
            throws Exception {

        walletRepository.deleteAll();

        userId = UUID.randomUUID();

        Wallet wallet = new Wallet(
                userId,
                new BigDecimal("500.00")
        );

        walletRepository.save(wallet);

        System.out.println();
        System.out.println("============================================================");
        System.out.println(
                "TEST: Sends 10 concurrent debit requests of ₹100."
        );
        System.out.println(
                "      Wallet balance: ₹500.00"
        );

        int numberOfRequests = 10;

        ExecutorService executor =
                Executors.newFixedThreadPool(numberOfRequests);

        CountDownLatch ready =
                new CountDownLatch(numberOfRequests);

        CountDownLatch start =
                new CountDownLatch(1);

        List<Future<Integer>> results =
                new ArrayList<>();

        for (int i = 0; i < numberOfRequests; i++) {

            results.add(
                    executor.submit(() -> {

                        ready.countDown();

                        start.await();

                        UUID transactionId = UUID.randomUUID();

                        String requestBody = """
                                {
                                    "transactionId": "%s",
                                    "userId": "%s",
                                    "amount": 100.00,
                                    "type": "DEBIT"
                                }
                                """.formatted(
                                transactionId,
                                userId
                        );

                        return mockMvc.perform(
                                        post(
                                                "/api/v1/transactions/process"
                                        )
                                                .contentType(
                                                        MediaType.APPLICATION_JSON
                                                )
                                                .content(requestBody)
                                )
                                .andReturn()
                                .getResponse()
                                .getStatus();
                    })
            );
        }

        ready.await();

        start.countDown();

        int successfulRequests = 0;
        int insufficientFundsRequests = 0;

        for (Future<Integer> result : results) {

            int status = result.get();

            if (status == 200) {
                successfulRequests++;
            } else if (status == 409) {
                insufficientFundsRequests++;
            }
        }

        executor.shutdown();

        Wallet updatedWallet = walletRepository
                .findByUserId(userId)
                .orElseThrow();

        BigDecimal expectedBalance =
                new BigDecimal("0.00");

        assertEquals(
                5,
                successfulRequests,
                "Exactly 5 requests should succeed"
        );

        assertEquals(
                5,
                insufficientFundsRequests,
                "Exactly 5 requests should fail with insufficient funds"
        );

        assertEquals(
                0,
                expectedBalance.compareTo(
                        updatedWallet.getBalance()
                ),
                "Final balance must be exactly ₹0.00"
        );

        System.out.println("Total Requests  : " + numberOfRequests);
        System.out.println("Successful      : " + successfulRequests);
        System.out.println(
                "Insufficient    : " + insufficientFundsRequests
        );
        System.out.println(
                "Final Balance   : ₹" + updatedWallet.getBalance()
        );
        System.out.println("RESULT          : PASS");
        System.out.println("============================================================");
        System.out.println();
    }
}