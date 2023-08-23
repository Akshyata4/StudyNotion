const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");

//capture the payment and inititate the razorpay order
exports.capturePayment = async(req, res) => {
    //get courseId userId
    const {course_id} = req.body; //we use curly braces to destructure (i.e to fetch a particular data from pool of datas)
    const userId = req.user.id;
    //validate courseId
    if(!course_id){
        return res.json({
            success:false,
            message: 'Please provide valid course Id',
        })
    };
    //validate courseDetail
    let course;
    try{
        course = await Course.findById(course_id);
        if(!course){
            return res.json({
                success:false,
                message: 'Could not find the course',
            }) ;
        }
        //if user already paid for the same course        
        //in course model userid is stored in string format so we are converting it to objectId
        const uid = new mongoose.Types.ObjectId(userId); 
        if(course.studentsEnrolled.includes(uid)){
            return res.status(200).json({
                success: false,
                message:'Student is already enrolled',
            });
        }
    }catch(error){
         console.error(error)
            return res.status(500).json({
                success:false,
                message:error.message,
            });
        }    
    //order create
    const amount = course.price;
    const currency = "INR";

    const options = {
        amount: amount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
        notes:{ //we have fetched these details because we'll need it in verifySignature controller
            courseId: course_id,
            userId,
        }
    };

    try{
        //initiate the payment using razorpay
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);
        //return response
        return res.status(200).json({
            success: true,
            courseName: course.courseName,
            courseDescription: course.courseDescription,
            thumbnail: course.thumbnail,
            orderId: paymentResponse.orderId,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount,
        });
    }catch(error){
        console.log(error);
        res.json({
            success:false,
            message:'Could not initiate order',
        })
    }
};

//abhi sirf create huyi hai authorization(verificn) is still left
exports.verifySignature = async(req, res) => {
    const webhookSecret = "12345678"; //present in server

    const signature = req.headers["x-razorpay-signature"];//from razorpay
    
    //as signature is already in encrypted format we have to encrypt weebhookSecret, so that we can compare both
    //3 steps for webhook encryption
    const shaSum = crypto.createHmac("sha256", webhookSecret);
    shaSum.update(JSON.stringify(req.body));
    const digest = shaSum.digest("hex");

    //match both
    if(signature === digest){
        console.log("Payment is authorised");
        
        //after authorization we ve to enroll student in the course
        const{courseId, userId} = req.body.payload.payment.entity.notes; //for this we hv used notes
        try{
            //find the course and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate(
                                            {_id: courseId},
                                            {$push: {studentsEnrolled: userId}},
                                            {new: true},
            );
            if(!enrolledCourse){
                return res.status(500).json({
                    success: false,
                    message:'Course not found',
                });
            }
            console.log(enrolledCourse);

            //find the student and add the course to their list of enrolled courses
            const enrolledStudent = await User.findByIdAndUpdate(
                                            {_id: courseId},
                                            {$push: {studentsEnrolled: userId}},
                                            {new: true},
            );
            //send confirmation mail
            const emailResponse = await mailSender(
                enrolledStudent.email,
                "Congrats from codehelp",
                "Congrats, you are onboarded into new codehelp course",
            );
            //return response
            console.log(emailResponse);
            return res.status(200).json({
                success:true,
                message:"Signature verified and course added",
            });
        }catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            });
        }
    }
    else{
        return res.status(400).json({
            success:false,
            message:'Invalid request',
        })
    }
};