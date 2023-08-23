const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth
exports.auth = async(req, res, next) => {
    try{
        //extract token in 3 ways
        const token = req.cookies.token 
                        || req.body.token 
                        || req.header("Authorization").replace("Bearer ", "");


        
        //if token is missing then return response
        if(!token){
            return res.status(401).json({
                success:false,
                message:'Token is missing',
            });
        }

        //verify the token
       
        try{          
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log("decoded token",decode);
            req.user = decode;
            
        }catch(err){
            //if verification issue occurs then return issue          
            return res.status(401).json({
                success:false,
                message:err.message,
            });
            
        }
        next(); //to go to the next middlewre
    }catch(error){
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        })
    }
}

//isStudent
exports.isStudent = async(req, res, next) => {
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:'This is a protected route only for students',
            });
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'Account type cannot be verified, please try again',
        })
    }
}

//isInstructor
exports.isInstructor = async(req, res, next) => {
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:'This is a protected route only for instructors',
            });
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'Account type cannot be verified, please try again',
        })
    }
}

//isAdmin
exports.isAdmin = async(req, res, next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:'This is a protected route only for admins',
            });
        }
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'Account type cannot be verified, please try again',
        })
    }
}