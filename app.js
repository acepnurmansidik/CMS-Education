const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const vary = require("vary");

const indexRouter = require("./routes/index");
const middlewareRoute = require("./resource/middleware/not-found");
const middlewarErrorHandler = require("./resource/middleware/handle-error");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// middleware
app.use(middlewareRoute);
app.use(middlewarErrorHandler);

module.exports = app;
