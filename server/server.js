const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { errorHandler } = require("./Middlewares/error");
require("dotenv").config();
require("./db");

const app = express();

// Cors Policy
const corsOptions = {
  origin: "http://localhost:5173",// client
  credentials: true,
  optionSuccessStatus: 200,
};

// Middlewares
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/images' , express.static("uploads"))


// ROUTES
app.use("/USER", require("./routes/user"));
app.use("/BOOK", require("./routes/book"));

// app.use(notFound)
// Error Handler Middleware
app.use(errorHandler);

const portConnection = process.env.PORT || 5002;
app.listen(portConnection, () => {
  console.log(`Example app listening on port ${portConnection}`);
});
