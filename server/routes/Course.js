const express = require("express")
const router = express.Router()

//import course controllers
const{createCourse, getAllCourses, getCourseDetails} = require("../controllers/Course");

//import category controllers
const{showAllCategories, createCategory, categoryPageDetails} = require("../controllers/Category");

//import section controllers
const{createSection, updateSection, deleteSection} = require("../controllers/Section");

//import sub-section controllers
const{createSubsection, updateSubsection, deleteSubsection} = require("../controllers/Subsection");

//import rating_review controllers
const{createRating, getAverageRating, getAllRating} = require("../controllers/RatingAndReview");

//import middlewares
const{auth, isInstructor, isStudent, isAdmin} = require("../middlewares/auth");

//COURSE ROUTES(can only be created by instructors)
router.post("/createcourse", auth, isInstructor, createCourse)
//add a section to a course
router.post("/addsection", auth, isInstructor, createSection)
//update a section
router.post("/updatesection", auth, isInstructor, updateSection)
//delete a section
router.post("/deletesection", auth, isInstructor, deleteSection)
//edit a subsection
router.post("/updatesubsection", auth, isInstructor, updateSubsection)
//delete subsection
router.post("/deletesubsection", auth, isInstructor, deleteSubsection)
//add a subsection to a section
router.post("/addsubsection", auth, isInstructor, createSubsection)
//get all registered courses
router.get("/getallcourses", getAllCourses)
//get details for a specific course
router.post("/getcoursedetails",getCourseDetails)

//CATEGORY ROUTES(can only be created by admins)
router.post("/createcategory", auth, isAdmin, createCategory)
router.get("/showallcategories", showAllCategories)
router.get("/getcategorypagedetails", categoryPageDetails)

//RATING AND REVIEW
router.post("/createrating", auth, isStudent, createRating)
router.get("/getaveragerating", getAverageRating)

router.get("/getreviews", getAllRating)

module.exports = router;
