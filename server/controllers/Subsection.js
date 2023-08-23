const Subsection = require("../models/Subsection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

//createSubsection
exports.createSubsection = async(req, res) => {
    try{
        //get data
        //section id is fetched because we'll use it while adding subsection in section
        const {sectionId, title, description, timeDuration} = req.body;
        //extract file/video
        const video = req.files.videoFile;
        //validate
        if(!sectionId || !title || !description || !video){
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            })
        }
        //upload video to cloudinary
        const uploadVideo = await uploadImageToCloudinary(video, process.env.FOLDER_NAME); 
        //create subsection
        const newSubsection = await Subsection.create({
            title: title,
            timeDuration: `${uploadVideo.duration}`,
            description: description,
            videoUrl: uploadVideo.secure_url,
        })
        //update section by adding this subsection id
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
                                                    {$push:{
                                                        subSection: newSubsection._id,
                                                    }},
                                                    {new: true})
                                                    .populate("subSection")
        //return response
        return res.status(200).json({
            success: true,
            message:'Sub section created successfully',
            updatedSection,
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Could not create subsection, please try again',
            error: error.message,
        });
    }
};

//updateSubsection
exports.updateSubsection = async(req, res) => {
    try{
        //data fetch
        const {subSectionId, title, description} = req.body;
        const subSection = await Subsection.findById(subSectionId);

        //validation
        if (!subSection) {
            return res.status(404).json({
              success: false,
              message: "SubSection not found",
            })
        }

        if (title !== undefined) {
            subSection.title = title
        };
      
        if (description !== undefined) {
            subSection.description = description
        };
        
        if(req.files && req.files.videoFile !== undefined){
            const video = req.files.videoFile;
            const uploadVideo = await uploadImageToCloudinary(video, process.env.FOLDER_NAME)

            subSection.videoUrl = uploadVideo.secure_url
            subSection.timeDuration = `${uploadVideo.duration}`
        };

        await subSection.save()

        return res.status(200).json({
            success: true,
            message: "sub section updated successfully",
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: 'Could not update subsection, please try again',
            error: error.message,
        });
    }
};

//deleteSubsection
exports.deleteSubsection = async(req, res) => {
    try{
        //get id
        const {subSectionId, sectionId} = req.body;
        //use findByIdAndDelete
        await Section.findByIdAndDelete(
            {_id:sectionId},
            {
                $pull: {
                    subSection: subSectionId,
                },
            }
        )
        const subSection = await Subsection.findByIdAndDelete({_id: subSectionId});

        if (!subSection) {
            return res
              .status(404)
              .json({ success: false, message: "SubSection not found" })
        }

        //return response
        res.status(200).json({
            success:true,
            message:'Sub-Section Deleted SuccessFully'
        });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};