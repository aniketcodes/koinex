const ExternalHelper = require("../helpers/external");
const {
  TokenPriceModel,
  FiatCurrencyEnum,
  TokenEnum,
} = require("../models/tokenPrice");

module.exports = {
  
  /**
   * @description This function fetches the current Ethereum price in INR and stores in database
   * @returns null
   */

  fetchEthPriceInInr: async function () {
    try {
      const data = await ExternalHelper.fetchEtherumPriceInInr();
      const value = data?.ethereum?.inr;
      await TokenPriceModel.create({
        token: TokenEnum.ETH,
        fiat: FiatCurrencyEnum.INR,
        value,
      });
    } catch (error) {
      throw error;
    }
  },
};
