const Joi = require("joi");
const add = {
  body: Joi.object().keys({
    shopId: Joi.string().min(4).required().messages({
      "string.base": "shopId  must be a string",
      "string.empty": "shopId  cannot be empty field",
      "string.min": "shopId  must be longer than 4 characters",
      "any.required": "shopId is a required field",
    }),
    currentStopDate:Joi.date().required().messages({
        'date.base': 'currentStopDate must be a date',
        "string.empty": "currentStopDate  cannot be empty field",
        "any.required": "currentStopDate is a required field",
      }),
})}
module.exports={
    add
}