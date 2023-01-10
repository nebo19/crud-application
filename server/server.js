const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes.js");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/crudapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  app.use("/people", router);

  app.listen(3001, () => {
    console.log("Server listening on port 3001");
  });
});
