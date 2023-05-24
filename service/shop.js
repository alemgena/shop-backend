const config = require("../config/config");
const ApiError = require("../utils/ApiError");
const admin = require("firebase-admin");
const dayjs = require("dayjs");
const { db } = require("../config/db");
exports.add = async (body) => {
  return new Promise(async (resolve, reject) => {
    console.log(body)
    const Shop = await db.ref(`${config.firebaseBranch}/${body.shopId}`);
    const shopRef = await db
      .ref(`${config.firebaseBranch}/${body.shopId}`)
      .get();
    const shopData = shopRef.val();
    const date = dayjs(body.currentStopDate).format("DD/MM/YYYY");
    if (!shopData) {
      Shop.set(
        {
          currentStopDate: date,
          emailCount: 0,
          totalPaid: 0,
          currentBlock: 0,
          shopEmail: body.email,
          shopName: body.shopName,
          blockCount: 0,
          shopId: body.shopId,
        },
        (err) => {
          if (err) {
            return reject(
              new ApiError(
                httpStatus.NOT_FOUND,
                "Error creating shop status",
                err
              )
            );
          }
          const key = Shop.getKey();
          resolve({
            key: key,
            ...body,
          });
        }
      );
    } else {
      let totalPaid= await (await Shop.child('totalPaid').once('value')).val();
    
      await Shop.update({
        currentStopDate: date,
       totalPaid:totalPaid+body.totalPaid
      })
      resolve("done");
    }
  });
};
