const message = {
  success: {
    transactionDetails: "Fetched transactions",
  },
  error: {
    internalServerError: "Internal Server Error",
    transactionDetails: "Error in fetching transaction",
    noTransactionFound:"No transaction found"
  },
  status: {
    badRequest: "Bad Request",
    internalServerError:"Internal Server Error"
  },
};

module.exports = message;
