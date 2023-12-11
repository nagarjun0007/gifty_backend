const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cors = require("cors");
require("dotenv").config();
const app = express();

const port = 3002;
const url =
  "mongodb+srv://gifty_ale_nag:gifty@cluster0.oxzsh26.mongodb.net/Gifty_DB?retryWrites=true&w=majority";
// provide mondodb database_name:password

app.use(
  cors({
    origin: [""],
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured" });
});
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/orders", orderRoutes);

mongoose
  .connect(url)
  .then(() => {
    app.listen(port, () => {
      console.log(`App running on port ${port}`);
    });
    console.log("Connected to databaase!");
  })
  .catch((e) => {
    console.log("Connection failed!", e);
  });

exports.app = app;
