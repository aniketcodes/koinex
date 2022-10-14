const cron = require("node-cron");
const priceController = require("../controllers/priceController");
module.exports = () => {
  cron.schedule("*/10 * * * *", async () => {
    await priceController.fetchEthPriceInInr();
  });
};
