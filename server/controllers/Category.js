const Category = require("../models/Category"); //this helps while searching for courses

//createCategory
exports.createCategory = async(req, res) => {
    try{
        //fetch data from body
        const{name, description} = req.body;
        //valiadtion
        if(!name || !description){
            return res.status.json({
                success:false,
                message:'All fields are required'
            });
        }
        //create entry in DB
        const categoryDetails = await Category.create({
            name: name,
            description: description,
        });
        console.log(categoryDetails);
        return res.status(200).json({
            success:true,
            message:'Category created successfully',
        });

    }catch(error){
        return res.status(500).json({
            success:true,
            message:error.message,
        })
    }
}

//getAllCategories
exports.showAllCategories = async(req, res) => {
    try{
        //find categories
        const allCategories = await Category.find(
            {},//no need of any conditions as we are fetching all categories
            {name:true, description:true}
        );
        //return response
        return res.status(200).json({
			success: true,
			message: 'Got all categories successfully',
            data: allCategories,
		});
    }catch(error){
        return res.status(500).json({
			success: false,
			message: error.message,
		});
    }
}

//categoryPageDetails
exports.categoryPageDetails = async(req, res) => {
    try{
        //get categoryId
        const {categoryId} = req.body;
        //get courses for specified categoryId (the category which the user selected)
        const selectedCategory = await Category.findById(categoryId)
                                        .populate("courses")
                                        .exec();
        //validation
        if(!selectedCategory){
            return res.status(404).json({
                success: false,
                message: 'Data not found',
            });
        }
        //get course for different categories (just for reference if the user is interested)
        const differentCategories = await Category.find({
                                    _id: {$ne: categoryId},//excluding this category
                                    })
                                    .populate("courses")
                                    .exec();
        //find top 10 selling courses 
        //return response
        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentCategories,
            }
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}