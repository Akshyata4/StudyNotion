const express = require("express")
const router = express.Router()

//import the required controllers  
const{logIn, signUp, sendotp, changePassword} = require("../controllers/Auth");
const{resetPasswordToken, resetPassword} = require("../controllers/ResetPassword");

//import the required middleware functions
const{auth} = require("../middlewares/auth");

//AUTHENTICATION ROUTES
//route for user login
router.post("/login", logIn)
//route for user signup
router.post("/signup", signUp)
//route for sending otp to the user's mail
router.post("/sendotp", sendotp)
//route for changing the password
router.post("/changepassword", auth, changePassword)

//RESET PASSWORD ROUTES
//route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)
//route for resetting user's password after verification
router.post("/reset-password", resetPassword)

//exporting so that we can use in main application
module.exports = router;