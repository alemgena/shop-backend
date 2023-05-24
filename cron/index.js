const {db}=require("../config/db")
const config=require('../config/config');
const nodemailer = require("nodemailer");
const ApiError = require("../utils/ApiError");
const shopRef= db.ref(config.firebaseBranch)
const httpStatus = require("http-status");
const dayjs = require("dayjs");
const transporter = nodemailer.createTransport({
  service: "Gmail",
  secure: true,
  port: 465,
  ignoreTLS: true,
  secureConnection: false,
  auth: {
    user: process.env.GMAIL,
    pass: process.env.PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
  requireTLS: true,
});
const updateEmailCount=async(shopId)=>{
  const Shop = await db.ref(`${config.firebaseBranch}/${shopId}`);
 let emailCount= await (await Shop.child('emailCount').once('value')).val();
 console.log("email",emailCount)
emailCount+=1
await Shop.update({
  emailCount:emailCount})
}
const sendEmail = async () => {
  return new Promise(async (resolve) => {
    try{
        await shopRef.once('value').then(snap => {
          if(snap.exists()){
          const data = snap.val();
          const dataArray = Object.keys(data).map((key) => data[key]);
          dataArray.forEach(async (item)=>{
            let targetDate=dayjs(item.currentStopDate, "DD/MM/YYYY").subtract(4, "day")
            //dayjs(originalDate, "DD/MM/YYYY").add(4, "day").format("DD/MM/YYYY");
            const futureDate =dayjs(item.currentStopDate,"DD/MM/YYYY").add(4, 'day')
            const currentDatee = dayjs();
          console.log(currentDatee)
         console.log(targetDate)
           if( targetDate.isBefore(currentDatee)&&currentDatee.isBefore(futureDate)){
            console.log("fff")
            let mailOptions = {
              from: process.env.GMAIL, // sender address
              to: item.shopEmail, // list of receivers
              subject: " Payment Request ", // Subject line
              text: `Wellcome, This is the Activation code:44444`, // plain text body
              html: `<style>@import url('https://fonts.googleapis.com/css2?family=Cabin&display=swap');</style>
                    <div style="border: 1px solid green; border-radius: 5px; padding: 30px;">&nbsp; &nbsp;&nbsp; &nbsp;
                    <div style="text-align: center; font-family: 'Cabin', sans-serif; margin: auto;">
                        <div style="color: green; font-size: 14px; margin: 5px;">
                    <strong>
                        <span style="letter-spacing: 4px;">Payment Request!</span>
                    </strong>
                    </div>
                    <div style="margin: 0px 60px 20px; height: 0.2px; background-color: rgba(244,151,3,.8);">&nbsp;</div>
                    <p>Dear [Recipient Name],</p>
                    <p>I hope this email finds you well. I am writing to request payment for <strong> Description</strong>. The total amount due is <strong>Amount Due</strong> and the payment is now past due.</p>
                    <p>To ensure that we can continue to work together and avoid any further delays, I kindly request that you make the payment as soon as possible. You can make the payment by Payment Method and Instructions.</p>
                    <p>If you have any questions or concerns, please do not hesitate to contact me. I appreciate your prompt attention to this matter.</p>
                    <div style="color: #143d59; font-size: 20px; margin: 20px 0px 30px;">.</div>
                        <span style="color: #143d59;">
                        <span style="font-size: 20px;">Thank you and best regards,.</span>
                        </span>
                    </div>
                    </div>`,
            };
           await transporter.sendMail(mailOptions);
await updateEmailCount(item.shopId)

           }
          })
        }}).catch(err =>{  throw new ApiError(
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
    resolve('done')
  });
}
module.exports = {
    sendEmail
  }