const express = require("express");
const router = express.Router();
const {deleteAccount, updateProfile, getAllUserDetails, updateDisplayPicture, getEnrolledCourses} 
        = require("../controllers/Profile");
        
const {auth} = require("../middlewares/auth");

//Profile routes
router.delete("/deleteprofile",auth, deleteAccount);
router.put("/updateprofile", auth, updateProfile);
router.get("/getuserdetails", auth, getAllUserDetails);
router.get("/getenrolledcourses", auth, getEnrolledCourses);
router.put("/updatedisplaypicture", auth, updateDisplayPicture);
module.exports = router;        
