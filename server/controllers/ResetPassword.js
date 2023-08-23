const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

//resetPasswordToken-code to generate token so that we can use unique URL using it
exports.resetPasswordToken = async(req, res) => {
    try{
        //get email
        const {email} = req.body;
        const user= await User.findOne({email : email});
        //check user for this mail / email validation
        if(!user){
            return res.json({
                success:false,
                message:`Your Email ${email} is not registered with us`
            });
        }
        
        //generate token(will use for sending url)
        const token = crypto.randomBytes(20).toString("hex");
        
        //update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate(
            
                                    {email:email},
                                    {
                                        token:token,
                                        resetPasswordExpires :Date.now() + 3600000,
                                    },
                                    {new:true}
        );
        // console.log("first");
        console.log("Details", updatedDetails);
        
        //create URL using the token generated
        const url = `http://localhost:3000/update-password/${token}`
        //send mail containing the url
        await mailSender(email,"Password Reset Link",
                                `Password Reset Link: ${url}. Please click to reset your password.`);
        //return response
        res.status(500).json({
            success:true,
            message:'Email for password reset sent successfully, please check and change password',
        });
    }catch(error){
        // console.log(error);
        return res.status(500).json({
            error: error.message,
            success:false,
            message:`Something went wrong while sending reset pwd mail`
        });
    }
};

//resetPassword
exports.resetPassword = async(req, res) => {
    try{
        //get data
        const {password, confirmPassword, token} = req.body;
        //match the passwords
        if(password !== confirmPassword){
            return res.json({
                success:false,
                message:"Passwords does not match",
            });
        }
        //get userDetails from DB using token
        const userDetails = await User.findOne({token: token});
        //if no entry then token is invalid
        if(!userDetails){
            return res.json({
                success:false,
                message:'Token is invalid',
            });
        }
        //check token time
        if(!(userDetails.resetPasswordExpires > Date.now())){
            return res.status(403).json({
                success:false,
                message:'Token is expired, please regenerate your token',
            });
        }
        //hash pwd
        const hashedPassword = await bcrypt.hash(password, 10);
        //update the password
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true},
        );
        //return response
        res.status(200).json({
            success:true,
            message:'Password reset successful',
        });
    }
    catch(error){
        return res.json({
            error: error.message,
            success:false,
            message:'Something went wrong while updating the password',
        });
    }
    
};