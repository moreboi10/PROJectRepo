Design Decisions

1. Concurrency & Idempotency

The main issue is that duplicate requests can arrive at the same time.

I used two protections:

transactionId has a database UNIQUE constraint, so the same transaction cannot be inserted twice.

The wallet is fetched using PESSIMISTIC_WRITE, so only one transaction can update the same wallet balance at a time.

The important order is:

Lock wallet
↓
Read balance
↓
Check funds
↓
Update balance
↓
Save transaction

This prevents two requests from reading the same old balance and causing an incorrect result.

I also used @Transactional so the wallet update and transaction record are committed together.

2. AI Assistant — What I Changed

One AI suggestion was to simply catch DataIntegrityViolationException when a duplicate transactionId is inserted.

I questioned this because the exception happens during the current database transaction. Catching it does not necessarily mean the transaction is still usable.

So I kept the database UNIQUE constraint as the actual protection and treated the initial transaction lookup only as a fast duplicate check.

This was a useful reminder that catching an exception in Java does not automatically undo what happened inside the database transaction.