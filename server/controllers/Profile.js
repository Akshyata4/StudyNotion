const Profile = require("../models/Profile");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
require("dotenv").config();

//updating profile(here we are not creating a profile because a profile with null dtails is already been created while signing up)
exports.updateProfile = async(req, res) => {
    try{
        //get data
        const {dateOfBirth="", about="", contactNumber, gender} = req.body;
        //get userId
        const id = req.user.id;
        //validation
        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }
        //find profile
        const userDetails = await User.findById(id); //because profile id is present in additional details of user
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId)
        //update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        //save in DB
        await profileDetails.save();
        //return response
        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            profileDetails,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            error:error.message,
        });
    }
};

//deleteAccount (we can create handler for this separately but prefered creating here)
exports.deleteAccount = async(req, res) => {
    try{
        //get id
        const id = req.user.id; 
        //validation
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success: false,
                message: 'What to dlt when user not present',
            });
        }
        //delete profile (hume do baar dlt karni padegi ek profile(additional details) aur dusri user)
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});
        //delete user
        await User.findByIdAndDelete({_id:id});
        //return response
        return res.status(200).json({
            success: true,
            message: 'Account deleted successfully',
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'User cannot be deleted successfully',
        }); 
    } 
};

//getter for user details
exports.getAllUserDetails = async (req, res) => {
    try{
        //get id
        const id = req.user.id;
        //get user details and validate
        const userDetails = await User.findById(id)
        .populate("additionalDetails")
        .exec();
        //return response
        return res.status(200).json({
            success: true,
            message: 'User data fetched successfully',
            data: userDetails,
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'User cannot be deleted successfully',
        });
    }
};

exports.updateDisplayPicture = async(req, res) => {
    try{        
        const displayPicture = req.files.displayPicture;
        const userId = req.user.id;
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        console.log(image)
        const updateProfile = await User.findByIdAndUpdate(
            {_id: userId},
            {image: image.secure_url},
            {new: true}
        )
        res.send({
            success: true,
            message: 'Image updated successfully',
            data: updateProfile,
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

exports.getEnrolledCourses = async(req, res) => {
   
    try{
        const userId = req.user.id;
        const userDetails = await User.findOne({
            _id: userId,
        })
        .populate("courses")
        .exec()
        if(!userDetails){
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userDetails}`,
            })
        }
        // console.log("userdetail",userDetails);
        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};