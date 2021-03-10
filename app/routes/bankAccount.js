
"use strict";

const router = require("express").Router();

const accountValidator = require("../bankAccount/BankAccountValidator");
const accountController = require("../bankAccount/BankAccountController");



router.get("/banks", accountController.fetchAllBanks);
router.post("/resolve", accountValidator.resolveAccount, accountController.resolveAccountNumber);

// TEST ROUTE TO SIMULATE PERFORMANCE METRICS BASED ON CACHING OUR ROUTES
router.post("/resolve/perf/test", accountValidator.resolveAccount, accountController.resolveAccountPerfTest);

module.exports = router;