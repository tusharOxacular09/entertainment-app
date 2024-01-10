const express = require("express");
require("dotenv").config();
const app = express();
const userRouter = require("./routes/userRouter");
const DatabaseConnector = require("./db-connection");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// DB connection
DatabaseConnector().catch((err) => console.log(err));

// credential
app.use(function (req, res, next) {
  res.header("Content-Type", "application/json;charset=UTF-8");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Just for checking the server is running or not
app.get("/", (req, res) => {
  res.status(200).send({msg: "Hello! Welcome to EntertainmentHub."});
});

app.use("/api/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log("Entertainment Server is runnong on PORT", process.env.PORT);
});