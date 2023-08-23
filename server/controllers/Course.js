const Course = require ("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
const { categoryPageDetails } = require("./Category");

//createCourse handler function
exports.createCourse = async(req, res) => {
    try{
        //fetch user id
        const userId = req.user.id;
        //fetch data
        const {
            courseName, 
            courseDescription, 
            whatYouWillLearn, 
            price, 
            // tag, 
            category, 
            status, 
            instructions} = req.body;
        //fetch thumbnail
        // const thumbnail = req.files.thumbnailImage;
        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price||  !category  /*|| !tag || !thumbnail*/){
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }
        // if(!status || status === undefined){
        //     status = "Draft";
        // }

        //check for instructor(so that we can add instructor details in course)
        const instructorDetails = await User.findById(userId, {
            accountType: "Instructor",
        });
        if(!instructorDetails){
            return res.status(404).json({
                success:flase,
                message:'Could not found instructor details',
            });
        }
        //given category is valid or not (for postman)
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success:false,
                message:'Tag Details not found',
            });
        }
        //upload thumbnail to cloudinary
        // const thumbnailImage = await uploadImageToCloudinary(
        //     thumbnail,
        //     process.env.FOLDER_NAME
        // );
        // console.log(thumbnailImage);
        //create entry in the DB for the new course created
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,//to use here we fetched userid
            whatYouWillLearn: whatYouWillLearn,
            price,
            //tag: tag,
            category: categoryPageDetails._id,
           // thumbnail: thumbnailImage.secure_url,
            status: status,
            instructions: instructions,
            //in the above the ids are passed for those whoose reference is stored in models
        });
        //add the new creaated course to the user schema of instructor who created this course
        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {
                $push:{
                    course: newCourse._id,
                }
            },
            {new: true}
        );
        //add the new course to the categories
        await Category.findByIdAndUpdate(
            {_id: category},
            {
                $push: {
                    courses: newCourse._id,
                },
            },
            {new: true}
        );
        //return response
        return res.status(200).json({
            success:true,
            data: newCourse,
            message:"Course created successfully",
        });
        
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failed to create course',
            error: error.message,
        })
    } 
};

//getAllCourses
exports.getAllCourses = async(req, res) => {
    try{
        //find all courses
        const allCourses = await Course.find({},
            {courseName:true,
            price:true,
            thumbnail:true,
            instructor:true,
            ratingAndReviews:true,
            studentsEnrolled:true,}
        )
        .populate("instructor")
        .exec();
        //return response
        return res.status(200).json({
            success:true,
            message:'Data for all courses fetched successfully',
            data:allCourses,
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Could not fetch course data',
            error: error.message,
        })
    }

};

//getCourseDetails
exports.getCourseDetails = async(req, res) => { 
    try{
        //get id
        const {courseId} = req.body; 
        //find course details
        const courseDetails = await Course.find(
                                    {_id: courseId})
                                    .populate( //nested populate
                                        {
                                            path: "instructor",
                                            populate:{ //nested populate
                                                path:"additionalDetails",
                                            },
                                        }
                                    )
                                    .populate("category")
                                    //.populate("ratingAndReviews")
                                    .populate({
                                        path:"courseContent",
                                        populate:{
                                            path:"subSection",
                                        },
                                    })
                                    .exec();
    //validate
    if(!courseDetails){
        return res.status(400).json({
            success: false,
            message:`Could not find the course with ${courseId}`,           
        });
    }
    //return response
    return res.status(200).json({
        success: true,
        message:"course details fetched successfully",
        data: courseDetails,           
    }); 
    }catch(error){
       console.log(error);
       return res.status(500).json({
        success: false ,
        message:error.message,           
    }); 
    }
}