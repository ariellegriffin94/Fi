const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const port = process.env.PORT || 3003;

const indexRouter = require("./routes/index");

app.use(bodyParser.json({ limit: "150mb" }));
app.use(bodyParser.urlencoded({ limit: "150mb", extended: true }));
app.use(express.json());

app.use("/", indexRouter);

app.listen(port, function () {
  console.log("Runnning on " + port);
});

module.exports = app;
