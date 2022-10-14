const dotenv = require("dotenv");
dotenv.config();
const express = require("express");

const swaggerUi = require("swagger-ui-express");
const db = require("./config/mongoose");
const cron = require("./controllers/cronController")();
const cors = require("cors");
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.get("/", (req, res) => {
  return res.sendFile(__dirname + "/index.html");
});

app.use("/api", require("./routes"));

app.listen(process.env.PORT, (err) => {
  if (err) {
    return console.log(`Error running on PORT ${process.env.PORT}`);
  }
  console.log(`Koinex assignment server running on PORT ${process.env.PORT}`);
});
