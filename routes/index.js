const express = require("express");
const router = express.Router();

router.use('/transaction',require("./transactions"));

module.exports = router;