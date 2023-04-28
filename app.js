require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const winston = require('winston');
const config = require("./config/config");
const routers=require('./routes')
const bodyParser = require("body-parser");
const { errorConverter, errorHandler } = require("./middlewares/error");
const logFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  );
const logger = winston.createLogger({
    level: 'info', // The minimum log level to log

    format: logFormat, // The log format, e.g. simple, json, etc.
    transports: [
      new winston.transports.Console() // The transport for logging, e.g. console, file, etc.
    ]
  });
  
const app = express();
const issue2options = {
  origin: "*",
  allowedHeaders:
    "x-access-token, Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Length,token",
  methods: ["GET", "PUT", "POST", "DELETE", "PATCH"],
  credentials: true,
};
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ ...issue2options }));
app.use('/api/shops',routers.shop)
app.use((req, res, next) => {
    next(new ApiError(res, httpStatus.NOT_FOUND, "Not found"));
  }); 
  // convert error to ApiError, if needed
  app.use(errorConverter);
  // handle error
  app.use(errorHandler);
app.listen(config.port, () => {
    logger.info(`Server started on port ${config.port}`);
});
