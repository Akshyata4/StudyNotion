const Razorpay = require("razorpay");

//configurations of razorpay should present config folder
exports.instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
});