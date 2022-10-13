const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    blockNumber: {
      type: String,
      default: null,
    },
    timeStamp: {
      type: String,
      default: null,
    },
    hash: {
      type: String,
      default: null,
    },
    nonce: {
      type: String,
      default: null,
    },
    blockHash: {
      type: String,
      default: null,
    },
    transactionIndex: {
      type: String,
      default: null,
    },
    from: { type: String, default: null },
    to: { type: String, default: null },
    value: { type: String, default: null },
    gas: { type: String, default: null },
    gasPrice: { type: String, default: null },
    isError: { type: String, default: null },
    txreceipt_status: { type: String, default: null },
    input: { type: String, default: null },
    contractAddress: { type: String, default: null },
    cumulativeGasUsed: { type: String, default: null },
    gasUsed: { type: String, default: null },
    confirmations: { type: String, default: null },
    methodId: { type: String, default: null },
    functionName: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model( 'Transaction', transactionSchema )

