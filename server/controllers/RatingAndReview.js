const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

//createRating
exports.createRating = async(req, res) => {
    try{
        //get user id
        const userId = req.user.id;
        //fetch data from req body
        const {rating, review, courseId} = req.body;
        //check if user is enrolled or not (bina enrollment k kahe ka review)
        const courseDetails = await Course.findOne(
                                    {_id:courseId,
                                    studentsEnrolled:{$eleMatch: {$eq: userId}},
                                });
        if(!courseDetails){
            return res.status(404).json({
                success: false,
                message: 'Student is not enrolled in the course',
            });
        }
        //check if user already reviewd the course(only one review per course is allowed)
        const alreadyReviewed = await RatingAndReview.findOne({
                                                user: userId,
                                                course: courseId,
                                            });
        if(!alreadyReviewed){
            return res.status(403).json({
                success: false,
                message: 'Course is already reviewed by the user',
            });
        }                                    
        //create rating and review 
        const ratingReview = await RatingAndReview.create({
                                        rating, review,
                                        course: courseId,
                                        user: userId,
                                    });
        //update course with this new rating/review
        const updatedCourseDetails = Course.findByIdAndUpdate({_id:courseId},
                                    {
                                        $push: {
                                            ratingAndReviews: ratingReview._id, //because course model is storing it's id
                                        }
                                    },
                                    {new: true});
        console.log(updatedCourseDetails);
        //return response
        return res.status(200).json({
            success: true,
            message: 'Rated and reviewed successfully',
            ratingReview,
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message:'error.message',
        })
    }
}
//getAverageRating
exports.getAverageRating = async(req, res) => {
    try{
        //get course ID
        const courseId = req.body.courseId;
        //calculate average rating
        const result = await RatingAndReview.aggregate([
            {
                $match:{//saari entries jinki course me value yehi courseId hai 
                    course: new mongoose.Types.ObjectId(courseId),//converting string to objectId
                },
            },
            {
                $group:{//separates documents into groups accoording to a "group key"
                    _id: null,
                    averageRating: {$avg: "$rating"}
                }
            }
        ])
        //return rating
        if(result.length > 0){
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            })
        }
        //if no reviw rating presnt
        return res.status(200).json({
            success: true,
            message: 'Average rating is 0, no ratings given',
            averageRating: 0,
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
//getAllRatingAndReview (this isn't course specific i.e get all ratings and reviiews of all courses to show it in homepage)
exports.getAllRating = async(req, res) => {
    try{
        const allReviews = await RatingAndReview.find({})
                                .sort({rating: "desc"}) //so that highest rating will be displayed first
                                .populate({
                                    path:"user",
                                    select: "firstName lastName email image", //another way of selecting the fields that we want in the output of user
                                })
                                .populate({
                                    path:"course",
                                    select:"courseName",//course ki coursename wali field ko populate
                                })
                                .exec();
    return res.status(200).json({
        success:true,
        message:"All reviews fetched successfully",
        data: allReviews,
    })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}