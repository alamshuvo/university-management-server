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

# Error Hndaling

1. Operational Error
   -- Errors that we can predict will happen in futute
1. invalid user inputs
   2.faild to run server
   3.failed to connect database
   4.invalid auth token
1. Programmatical Error
   -- Error that developers produce when developing
1. Using undefined Variables
1. using properties that do not exist
1. passing number insted of string
1. using req.params insted of req.queary
   3.Unhandled Rejection (async code )
   4.uncaught Exception (synchronous code )

# what is method chaining
