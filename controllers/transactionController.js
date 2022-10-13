const Joi = require("joi");

const Message = require("../config/message");
const Response = require("../config/response");
const CommonHelper = require("../helpers/commons");
const ExternalHelper = require("../helpers/external");
const TransactionModel = require("../models/transaction");
module.exports = {
  home: async function (req, res) {
    try {
      return res.send(
        Response.successResponse({
          data: "Transaction APIs are up",
        })
      );
    } catch (error) {
      Response.errorResponse({
        status: Message.status.badRequest,
        error: Message.error.internalServerError,
        code: 500,
      });
    }
  },

  /**
   * @description This function fetches the transactions for an address and stores it in the database
   * @param {*} req It contains the address of the user
   * @returns It contains data object having transactions and the total count
   */

  fetchAndStoreTransactions: async function (req, res) {
    try {
      const { address } = req.body;
      let schema = Joi.object().keys({
        address: Joi.string().required(),
      });

      await CommonHelper.verifyJoiSchema({ address }, schema);

      const data = await ExternalHelper.fetchNormalTransactions(address);

      await Promise.all(
        data?.transactions.map(async (transaction) => {
          const tx = await TransactionModel.findOne({
            hash: transaction?.hash,
          });

          if (!tx) await TransactionModel.create(transaction);
        })
      );

      data.count = await TransactionModel.countDocuments();
      return res.send(
        Response.successResponse({
          message: Message.success.transactionDetails,
          data,
        })
      );
    } catch (error) {
      return res.json(
        Response.errorResponse({
          status: Message.status.internalServerError,
          error,
          code: 500,
        })
      );
    }
  },
};
