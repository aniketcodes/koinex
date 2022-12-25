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

          if (!tx) {
            const { timeStamp } = transaction;
            let txDate = new Date(timeStamp * 1000);

            let txFormattedDate = `${txDate.getDate()}-${txDate.getMonth()}-${txDate.getFullYear()}`;
            const priceHistoryEther =
              await ExternalHelper.fetchEthereumPricInInrForADate(
                txFormattedDate
              );
            transaction.ethPriceInInr =
              priceHistoryEther?.market_data?.current_price?.inr;
            await TransactionModel.create(transaction);
          }
        })
      );

      data.count = await TransactionModel.countDocuments({
        $or: [
          {
            to: address,
          },
          {
            from: address,
          },
        ],
      });
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

  /**
   * @description This Function returns the balance of the user ans the current ethereum pric in INR
   * @param {*} req It contains the address of the user
   * @returns An object containing balance and current ethereum price in INR
   */

  getBalance: async function (req, res) {
    try {
      const address = req.query.address;
      let schema = Joi.object().keys({
        address: Joi.string().required(),
      });

      await CommonHelper.verifyJoiSchema({ address }, schema);

      const [balance] = await TransactionModel.aggregate([
        {
          $match: {
            $or: [
              {
                to: address,
              },
              {
                from: address,
              },
            ],
          },
        },
        {
          $addFields: {
            convertedValue: {
              $toDouble: "$value",
            },
          },
        },
        {
          $group: {
            _id: null,
            credit: {
              $sum: {
                $cond: [{ $eq: ["$to", address] }, "$convertedValue", 0],
              },
            },
            debit: {
              $sum: {
                $cond: [{ $eq: ["$from", address] }, "$convertedValue", 0],
              },
            },
          },
        },
        {
          $addFields: {
            balance: {
              $subtract: ["$credit", "$debit"],
            },
          },
        },

        {
          $project: {
            _id: 0,
            balance: 1,
          },
        },
      ]);

      if (!balance) {
        return res.send(
          Response.errorResponse({
            status: Message.error.noTransactionFound,
            code: 404,
          })
        );
      }

      const { ethereum } = await ExternalHelper.fetchEtherumPriceInInr();
      const currentEthPriceInInr = ethereum.inr;

      return res.send(
        Response.successResponse({
          message: Message.success.transactionDetails,
          data: { balance: balance.balance, currentEthPriceInInr },
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
