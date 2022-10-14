const mongoose = require("mongoose");

const TokenEnum = {
  ETH: "ethereum",
};

const FiatCurrencyEnum = {
  INR: "inr",
};

const tokenPriceSchema = new mongoose.Schema({
  token: {
    type: String,
    enum: TokenEnum,
    required: true,
  },
  fiat: {
    type: String,
    enum: FiatCurrencyEnum,
    required: true,
  },
  value: {
    type: Number,
    default: null,
    nullable: true,
  },
},{
    timestamps:true
});

module.exports = {
  TokenPriceModel: mongoose.model("TokenPrice", tokenPriceSchema),
  TokenEnum,
  FiatCurrencyEnum
};
