const express = require("express");
const transactionController = require("../controllers/transactionController");
const router = express.Router();

router.get("/", transactionController.home);
router.post("/fetch", transactionController.fetchAndStoreTransactions);
router.get("/balance", transactionController.getBalance);

module.exports = router;
