const Axios = require("axios");

module.exports = {
  /**
   * @description It fetches transactions for an address from etherscan api
   * @param  address It is the address for which transactions are to be fetched
   * @returns An object transaction which is an array of transactions
   */
  fetchNormalTransactions: async function (address) {
    try {
      const { data } = await Axios.get(
        `${process.env.ETHERSCAN_API_URL}&address=${address}&apiKey=${process.env.ETHERSCAN_API_KEY}`
      );
      return { transactions: data?.result };
    } catch (error) {
      throw error;
    }
  },

  fetchEtherumPriceInInr: async function () {
    try {
      const { data } = await Axios.get(`${process.env.ETH_TO_INR_PRICE_API}`);
      return data;
    } catch (error) {
      throw error;
    }
  },
};
