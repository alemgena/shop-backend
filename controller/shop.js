const {shop}=require('../service')
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const SuccessResponse=require('../utils/successResponse')
exports.add = catchAsync(async (req, res) => {
    const data = await shop.add({ ...req.body });
    res
      .status(httpStatus.CREATED)
      .send(new SuccessResponse(httpStatus.CREATED, "", data));
  });