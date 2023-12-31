const { default: mongoose } = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,// The document will be automatically deleted after 5 minutes of its creation time
    },
});

//function to send verificn mail
async function sendVerificationEmail(email, otp){
    try{
        const mailResponse = await mailSender(
            email,
             "Verification email from studynotion",
              emailTemplate(otp) 
        );
        console.log("Email sent successfully", mailResponse);
    }catch(error){
        console.log("error occured while sending mail:", error);
        throw error;
    }
}
//define a pre-save hook to send mail after the doc has created
OTPSchema.pre("save", async function(next){
    console.log(`email: ${this.email}, otp: ${this.otp}`);
    //only send email when new doc is created
    if(this.isNew){
        await sendVerificationEmail(this.email, this.otp);
    }    
    next();  
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;