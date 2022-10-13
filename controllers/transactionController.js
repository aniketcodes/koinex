const Message = require("../config/message");
const Response = require("../config/response");

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
};
