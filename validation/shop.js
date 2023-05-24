const Joi = require("joi");
const add = {
  body: Joi.object().keys({
    shopId: Joi.string().min(4).required().messages({
      "string.base": "shopId  must be a string",
      "string.empty": "shopId  cannot be empty field",
      "string.min": "shopId  must be longer than 4 characters",
      "any.required": "shopId is a required field",
    }),
    email: Joi.string().email().required().messages({
      "string.base": "email  must be a string",
      "string.email": "must enter a valid email",
      "string.empty": "email  cannot be empty field",
      "any.required": "email is a required field",
    }),
    shopName: Joi.string().min(4).required().messages({
      "string.base": "shop name  must be a string",
      "string.empty": "email  cannot be empty field",
      "string.min": "shop name  must be longer than 4 characters",
      "any.required": "shop name is a required field",
    }),
    currentStopDate:Joi.date().required().messages({
        'date.base': 'currentStopDate must be a date',
        "string.empty": "currentStopDate  cannot be empty field",
        "any.required": "currentStopDate is a required field",
      }),
      //totalPaid
      totalPaid: Joi.number().required().messages({
        "string.base": "totalPaid must be a number",
        "string.empty": "totalPaid cannot be an empty field",
        "any.required": "totalPaid is a required field",
      }),
})}
module.exports={
    add
}