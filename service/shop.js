const config=require('../config/config')
const ApiError=require('../utils/ApiError')
const {db}=require("../config/db")
exports.add = async (body) => {
    return new Promise(async(resolve, reject) => {
        const Shop = await db.ref(`${config.firebaseBranch}/Users/${body.shopId}`);
        Shop.set({
            blockCount:1,  
          },(err,data)=>{
            if (err) {
                return reject(
                  new ApiError(
                    httpStatus.NOT_FOUND,
                    "Error creating shop status",
                    err
                  )
                );
              }
              resolve(data);
          })
   
    });
  };