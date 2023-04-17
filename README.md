 In 100 words or less, provide an answer to this in your readme: What's a good reason why the pure Levenshtein Distance algorithm might be a more effective solution than the broader Damerau–Levenshtein Distance algorithm in this specific scenario.

## Answer
 The pure Levenshtein Distance algorithm is an effective solution in this context, since it factors in the 3 possible errors that could come through human input which includes insertion, deletion and substitution, and also less compute time to broader Damerau–Levenshtein Distance algorithm which additonally includes transpostion of adjacent symbols to its computation, which is more ideal for a spelling mistake error.
## Installation

```bash
$ npm install
```
## Environmental variable
  There is file named example.env that will guide you on the environmental variables that is required in the application

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
### sample graphql server on port 3000 will look like :: http://localhost:3000/graphql

# Assumptions
  upon starting the server, it populates the banks table with all the list of banks in nigeria.
  Run the getAllBank query to get all banks
  
  Run the verifyUser mutation to verify user account number / name. it takes the following input 
   user_account_number: "004979****";
   user_bank_name: "guaranty trust bank";
   user_account_name: "Adewole kazeem Adebayo";
  
## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

Nest is [MIT licensed](LICENSE).
