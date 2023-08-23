const Section = require("../models/Section");
const Course = require("../models/Course");

//createSection
exports.createSection = async(req, res) => {
    try{
        //fetch data
        const {sectionName, courseId} = req.body; //sectionName-to create entry in db & courseId-to update course
        //validate data
        
        if(!sectionName || !courseId){
            console.log("COURSE_ID", courseId, "SECTION NAME", sectionName)
            return res.status(400).json({
                success: false,
                message: 'Missing properties',
            })
        }
        //create section
        const newSection = await Section.create({sectionName});
        //update the course page by adding this section's objectid
        const updatedCourseSection = await Course.findByIdAndUpdate(
                                            courseId,
                                            {
                                                $push:{
                                                    courseContent:newSection._id,
                                                }
                                            },
                                            {new: true})
                                            //the above code will only display the ids so for displaying full info we need to populate                 
                                            .populate({
                                                path: "courseContent",
                                                populate: {
                                                    path:"subSection",
                                                },
                                            })
                                            .exec();
        //return response
        return res.status(200).json({
            success: true,
            message: 'Section created successfully',
            updatedCourseSection,
        })
    }catch(error){
        res.status(500).json({
            success: false,
            message: "Unable to create section, please try again",
            error: error.message,
        });
    }
}

//updateSection
exports.updateSection = async(req, res) => {
    try{
        //data input
        const {sectionName, sectionId} = req.body;

        //validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:'Missing data',
            });
        }
        //update data
        //yaha pe dobara jaake course update karne ki zarroart nhi kyu ki section ki id(jo same hi rahega) padi huyi hai data nhi
        const updatedSection = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true});
        console.log(updatedSection);
        //return response
        return res.status(200).json({
            success:true,
            message:'Section updated successfully',
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'Unable to update section, please try again',
            error:error.message,
        })
    }
}

//deleteSection
exports.deleteSection = async(req, res) => {
    try{
        //get id (assuming that we are sending ID in params)
        const {sectionId, courseId} = req.body; //(test using params)
        //validate
        if(!sectionId){
            return res.status(400).json({
                success: false,
                message: "Some fields are missing",
            })
        }

        //Now we need to same section
        const deletedSectionDetails = await Section.findByIdAndDelete(sectionId);
        console.log(deletedSectionDetails);       


         //Now we need to update the Course on the same section
         const updatedCouseDetails = await Course.findByIdAndUpdate(courseId, { $pull : { courseContent:sectionId} }, {new:true} ).populate("courseContent").exec();
         console.log(updatedCouseDetails);
            
        //return response
        return res.status(200).json({
            success:true,
            message:'Section deleted successfully', 
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}