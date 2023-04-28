const express = require("express");
const validate = require("../middlewares/validate");
const shopValidation = require("../validation/shop");
const shopController = require("../controller/shop");
const router = express.Router();
router.post(
    "",
    validate(shopValidation.add),
    shopController.add
  );
  module.exports=router