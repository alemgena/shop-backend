const {shop}=require('../service')
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const {db}=require("../config/db")
const config=require('../config/config')
const shopRef= db.ref(config.firebaseBranch)
const SuccessResponse=require('../utils/successResponse');
const ApiError = require('../utils/ApiError');
exports.add = catchAsync(async (req, res) => {
  console.log("tttt")
    const data = await shop.add(req.body);
    res
      .status(httpStatus.CREATED)
      .send(new SuccessResponse(httpStatus.CREATED, "", data));
  });

  exports.list=catchAsync(async(req,res)=>{
    try{
    await shopRef.once('value').then(snap => {
      const data = snap.val();
      const dataArray = Object.keys(data).map((key) => data[key]);
    res
    .status(httpStatus.CREATED)
    .send(new SuccessResponse(httpStatus.ok, "", dataArray));
    }).catch(err =>{  throw new ApiError(
      httpStatus.BAD_REQUEST,
      "error fetching the shops",
      err
    )})
  }catch(error){
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "error fetching the shops",
      error
    );
  }
  })
  exports.get=catchAsync(async(req,res)=>{
    try{
      const shopRef = await db.ref(`${config.firebaseBranch}/${req.params.shopId}`).get()

 const shopData=shopRef.val();
    res
    .status(httpStatus.CREATED)
    .send(new SuccessResponse(httpStatus.ok, "", shopData));
    
  }catch(error){
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "error fetching the shops",
      error
    );
  }
  })