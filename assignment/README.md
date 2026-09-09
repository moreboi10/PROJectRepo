Idempotent Payment & Wallet Event Processor

A Spring Boot backend application that processes wallet transactions safely under concurrent requests.

The application supports debit and credit transactions while ensuring:

Duplicate transaction IDs are not processed more than once.

Concurrent debit requests cannot cause a negative wallet balance.

Wallet balance updates and transaction creation happen atomically.

Database-level locking is used for concurrent wallet updates.

H2 is used as an in-memory database for easy testing.

Tech Stack

Java 21

Spring Boot 4

Spring Web

Spring Data JPA

H2 Database

Maven

JUnit 5

MockMvc

Project Structure

src/
├── main/
│   ├── java/
│   │   └── com/project/assignment/
│   │       ├── controller/
│   │       ├── dto/
│   │       ├── entity/
│   │       ├── enums/
│   │       ├── exception/
│   │       ├── repository/
│   │       └── service/
│   └── resources/
│       └── application.yml
└── test/
└── java/
└── com/project/assignment/
└── TransactionIntegrationTest.java

API

Process Transaction

POST /api/v1/transactions/process

Request

{
"transactionId": "550e8400-e29b-41d4-a716-446655440000",
"userId": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
"amount": 250.00,
"type": "DEBIT"
}

Successful Response

{
"transactionId": "550e8400-e29b-41d4-a716-446655440000",
"status": "SUCCESS",
"amount": 250.00,
"balance": 750.00
}

Transaction Types

The application supports:

DEBIT — subtracts the requested amount from the wallet balance.

CREDIT — adds the requested amount to the wallet balance.

A debit is rejected when the wallet does not have sufficient funds.

Idempotency

transactionId acts as the idempotency key.

The transaction table contains a database-level unique constraint on transaction_id.

The service first checks whether the transaction already exists. The database unique constraint provides the final protection against duplicate transaction IDs when multiple identical requests arrive concurrently.

Concurrency Control

Wallet updates use a pessimistic database lock:

@Lock(LockModeType.PESSIMISTIC_WRITE)

Concurrent transactions modifying the same wallet therefore cannot simultaneously read and update its balance.

For a wallet with ₹500 and ten concurrent ₹100 debit requests, the expected result is:

Successful requests : 5
Failed requests     : 5
Final balance       : ₹0.00

Transaction Atomicity

Transaction processing uses:

@Transactional

The wallet update and transaction record are handled as one database transaction. If processing fails, the transaction is rolled back.

Money Representation

The application uses BigDecimal for monetary values instead of double or float to avoid floating-point precision issues.

Validation

Incoming requests are validated using Jakarta Bean Validation.

transactionId cannot be null.

userId cannot be null.

amount cannot be null.

amount must be greater than zero.

type cannot be null.

Invalid requests return 400 Bad Request.

Error Handling

Duplicate transaction → 409 Conflict

Insufficient funds → 409 Conflict

Wallet not found → 404 Not Found

Validation failure → 400 Bad Request

Database

H2 is configured as an in-memory database:

jdbc:h2:mem:walletdb

No external database setup is required.

Running the Application

Open the project in IntelliJ IDEA.

Allow Maven dependencies to download.

Run the Spring Boot application.

The application starts with the H2 in-memory database.

Running Tests

Run all tests with:

mvn test

Or run TransactionIntegrationTest directly from IntelliJ IDEA.

Test Scenarios

Test 1 — Single Debit

Initial balance : ₹1000
Debit           : ₹250
Expected        : ₹750

Test 2 — Duplicate Transaction ID

Three identical requests are sent concurrently:

Requests      : 3
Successful    : 1
Duplicates    : 2
Final balance : ₹750

Test 3 — Concurrent Debit With Limited Balance

Ten concurrent requests attempt to debit ₹100 from a ₹500 wallet:

Requests     : 10
Successful   : 5
Insufficient : 5
Final balance: ₹0

Design Decisions

The main architectural and concurrency decisions are documented in:

DECISIONS.md

The document explains the concurrency strategy and AI-assisted development decisions.

Future Improvements

For a larger production system, the application could later be extended with:

PostgreSQL

Redis caching

Message queues

Authentication and authorization

Distributed tracing

Structured logging

Metrics and monitoring

Rate limiting

Docker

CI/CD

These are intentionally outside the current implementation scope, which focuses on idempotency, concurrency control, and database consistency