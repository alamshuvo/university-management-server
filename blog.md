# Transaction and Rollback process

# ACID

- A - Atomicity -

  1. The entire transaction takes place at once or doesnt hapen at all.
  2. it involves the following two operations
     1. Abort- If a transaction aborts,changes made to the database are not visible
     2. Commit- If a transaction commits, changes made are visible.
  3. Atomicity is also known as the "All or nothing rule"

- C - Consistency
  1. Ensures that the database maintains its itegrity and keep its balance
     2.It guarantees that relationships between pieces of data
- I - Isolation
- D - Durability
