var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productsRouter = require("./routes/products");
var orderRouter = require("./routes/order");
var categoryRouter = require("./routes/category");
var brandsRouter = require("./routes/brand");

const connectDB = require("./config/db");
const { errorHandle } = require("./middleWare/errorHandler");
require("dotenv").config();
connectDB();
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/order", orderRouter);
app.use("/api/category", categoryRouter);
app.use("/api/brands", brandsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
   next(createError(404));
});

// error handler
app.use(errorHandle);

module.exports = app;
