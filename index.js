const dotenv = require("dotenv");
dotenv.config();
const express = require("express");

const swaggerUi = require("swagger-ui-express");
const db = require("./config/mongoose");
const cron = require("./controllers/cronController")();

const app = express();
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  return res.sendFile(__dirname + "/index.html");
});

app.use("/api", require("./routes"));

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log(`Error running on PORT ${process.env.PORT}`);
  }
  console.log(`Exam App server running on PORT ${process.env.PORT}`);
});
