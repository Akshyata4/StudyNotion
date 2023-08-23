import { useState } from "react";
import {toast} from "react-hot-toast"
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendotp } from "../../../services/operations/authAPI";
import { setSignupData } from "../../../slices/authSlice";
import {ACCOUNT_TYPE} from "../../utils/constants"
import Tab from "../../common/Tab"
function SignupForm(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // student or instructor
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

    const[formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        email: "",
        password: "",
        confirmPassword: "",
    })
    
    const[showPassword, setShowPassword] = useState(false)
    const[showConfirmPassword, setShowConfirmPassword] = useState(false)
    const {firstName, lastName, email, password, confirmPassword} = formData;
    
    //handler function to handle input fields when user inputs or changes value
    const changeHandler = (event) => {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value,
        }))
    }

    //handle form submission
    const submitHandler = (event) => {
        event.preventDefault()

        if(password !== confirmPassword){
            toast.error("Passwords do not match")
            return
        }
        const signupData = {
            ...formData,
            accountType,
        }

        // Setting signup data to state
        // To be used after otp verification
        dispatch(setSignupData(signupData))
        // Send OTP to user for verification
        dispatch(sendotp(formData.email, navigate))

        // Reset
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        })
        setAccountType(ACCOUNT_TYPE.STUDENT)
    }

    //data to pass to tab component
    const tabData = [
        {
            id: 1,
            tabName: "Student",
            type: ACCOUNT_TYPE.STUDENT,
        },
        {
            id: 2,
            tabName: "Instructor",
            type: ACCOUNT_TYPE.INSTRUCTOR,
        },
    ]

    return(
        <div>
            {/* For tab */}
            <Tab tabData={tabData} field={accountType} setField={setAccountType}/>
            {/* For form */}
            <form
                onSubmit={submitHandler}
                className="flex w-full flex-col gap-y-4"
            >
                {/* first and lastname */}
                <div className="flex gap-x-4">
                    <label>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            First Name <sup className=" text-pink-200 ">*</sup>
                        </p>
                        <input
                            required
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={changeHandler}
                            placeholder="Enter first name"
                            className=" w-full rounded-[0.5rem] bg-richblack-800 text-richblack-5 p-[12px]"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                        />
                    </label>
                    <label>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Last Name <sup className=" text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={changeHandler}
                            placeholder="Enter last name"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className=" w-full rounded-[0.5rem] bg-richblack-800 text-richblack-5 p-[12px]"
                        />
                    </label>
                </div>

                {/* email */}
                <label>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Email Address <sup className=" text-pink-200">*</sup>
                    </p>
                    <input
                        required
                        type="text"
                        name="email"
                        value={email}
                        onChange={changeHandler}
                        placeholder="Enter email address"
                        className=" w-full rounded-[0.5rem] bg-richblack-800 text-richblack-5 p-[12px]"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                    />
                </label>

                {/* for creating and confirming password */}
                <div className="flex gap-x-4">
                    <label className="relative">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Create password <sup className=" text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={changeHandler}
                            placeholder="Enter password"
                            className=" w-full rounded-[0.5rem] bg-richblack-800 text-richblack-5 p-[12px]"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                        />
                        <span onClick={() => setShowPassword((prev) => !prev)}
                        className=" absolute right-3 top-9 z-10 cursor-pointer ">
                            {showPassword ? 
                            (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>) 
                            : 
                            (<AiOutlineEye fontSize={24} fill="#AFB2BF"/>)}
                        </span>
                    </label>
                    <label className="relative">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Confirm Password <sup className=" text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={changeHandler}
                            placeholder="Confirm password"
                            className=" w-full rounded-[0.5rem] bg-richblack-800 text-richblack-5 p-[12px]"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                        />
                        <span onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-3 top-9 z-10 cursor-pointer ">
                            {showConfirmPassword ? 
                            (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>) : (<AiOutlineEye fontSize={24} fill="#AFB2BF"/>)}
                        </span>
                    </label>
                </div>
                <button
                type="submit"
                className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">
                    Create Account
                </button>
            </form>
        </div>
    )
}

export default SignupForm