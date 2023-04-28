const Joi = require("joi");
class ApiError extends Error {
  constructor(statusCode, message, error, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.fieldError =
      error instanceof Joi.ValidationError
        ? error.details.map((details) => {
            return {
              name: details.context.label,
              message: details.message,
            };
          })
        : [];
    if (error) {
      this.stack = error.stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
module.exports = ApiError;
