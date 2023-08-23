const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Profile = require("../models/Profile");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const mailSender = require("../utils/mailSender");
require ("dotenv").config();

//SEND OTP
exports.sendotp = async(req, res) => {
    try{
        //fetch email from request body
        const {email} = req.body;
        //check user existance
        const checkUserPresence = await User.findOne({email});
        //if exist then return response
        if(checkUserPresence){
            return res.status(401).json({
                success:false,
                message:'User is already registered',
            });
        }
        //if doesnt exist then generate otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        //check uniqueness
        const result = await OTP.findOne({otp: otp});
        console.log("OTP", otp);
		console.log("Result", result);
        while(result){
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });
        }
        //create object
        const otpPayload = {email, otp};
        //create entry in db
        const otpBody = await OTP.create(otpPayload);
        console.log("OTP body", otpBody);
        //return success response
        res.status(200).json({
            success:true,
            message:`OTP sent successfully`,
            otp,
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Couldnt send otp',
        });
    }
}
//SIGN UP
exports.signUp = async(req, res) => {
    try{
        //data fetching
        const {firstName,lastName,email,password,confirmPassword,accountType, contactNumber,otp} = req.body;
        //validation
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){     
                return res.status(403).json({
                    success:false,
                    message:'All fields are required',
                });
            }
        //match 2 passwords
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:'Passwords dont match please enter again',
            });
        }
        //check user existance
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User already exists. Please sign in to continue.',
            });
        }
        //find most recent OTP stored for the user
        const recentOTP = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log("OTP from DataBase" , recentOTP);    
       
        //validate OTP
        if(recentOTP.length === 0){
            //OTP not found for that email
            return res.status(400).json({
                success:false,
                message:'OTP not found for this email id',
            });
        }else if(otp !== recentOTP[0].otp){
            //Invalid OTP
            return res.status(400).json({
                success:false,
                message:'Invalid OTP or OTPs doesnt match',
            });
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        //create the user
        let approved = "";
        approved === "Instructor"? (approved = false):(approved = true);
        //enter creation ind DB
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });

        const user = await User.create({
            firstName,lastName,email,contactNumber,
            password:hashedPassword,
            confirmPassword,
            accountType:accountType,
            approved: approved,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });
        //return res
        return res.status(200).json({
            success:true,
            message:'User is signed up successfully',
            user,
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registered. Please try again",
        });
    }
        
};
//LOG IN
exports.logIn = async(req, res) => {
    try{
        //get data frm rq body
        const {email, password} = req.body;
        //valiadation of data
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:'All fields are required, please try again',
            })
        }
        //find user with given mail
        const user = await User.findOne({email}).populate("additionalDetails");
        //if user not found return response
        if(!user){
            return res.status(401).json({
                success:false,
                message:'User is not registered with us, please sign up first',
            });
        }     
          

        //generate JWT only after matching passwords
        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            }
            
            
            const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:"24h" });
            user.token = token;
            user.password = undefined;

            //create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true,
            }
            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user,
                message:'Logged in successfully',
            })
        }else{
            return res.status(500).json({
                success:false,
                message:'Passwords didnt match please try again',
            })
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login failed,please try again',
        });
    }
}

//CHANGE PASSWORD
exports.changePassword = async(req, res) => {
    try{
        //get data from req body
        const userDetails = await User.findById(req.user.id);
        //get oldpass newpass confirmnewpass
        const {oldPassword, newPassword, confirmNewPassword} = req.body;
        //validation
        const passwordMatch = await bcrypt.compare(
            oldPassword,
            userDetails.password
        );
        if(!passwordMatch){
            //if passwords doesn't match return 401(unauthorized) error
            return res.status(401).json({
                success: false,
                message:'The password is incorrect'
            });
        }
        if(newPassword !== confirmNewPassword){
            return res.status(400).json({
                success:false,
                message:'Passwords do not match',
            });
        }
        //update password in DB
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUserDetails = await User.findByIdAndUpdate(req.user.id,
            {password: encryptedPassword},
            {new: true}
        );
        //send mail regarding password update
        try{
            const mailResponse = await mailSender(
                updatedUserDetails.email,
                passwordUpdated(
                    updatedUserDetails.email,
                    `Password uodated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                )
            );
            console.log("Email sent successfully:", mailResponse.response);
        }catch(error){
            //if there's error changing the password log the error and return 500 (Internal Server Error) error
            console.log("Error occured while changing password:", error);
            return res.status(500).json({
                success:false,
                message:'Error occured while changing password',
                error: error.message,
            });
        }
        //return password
        return res.status(200).json({
            success:true,
            message:'Password updated successfully'
        });
    }catch(error){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:'CouldnT Change Password Please Try Again letter With Correct Email and Password',
        });
    }
};
