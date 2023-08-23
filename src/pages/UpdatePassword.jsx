import React, { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { resetPassword } from "../services/operations/authAPI";
import { Link, useLocation } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";


const UpdatePassword = () => {
    const dispatch = useDispatch();
    const location = useLocation

    const [formData, setFormData] = useState({
        password:"",
        confirmPassword:"",
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {loading} = useSelector( (state) => state.auth);

    const {password, confirmPassword} = formData;

    const handleOnChange = (e) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name] : e.target.value,
            }
        ))
    }
    const submitHandler = (e) => {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password, confirmPassword, token));
    }
  return (
    <div className="text-white grid min-h-[calc(100vh-3.5rem)] place-items-center ">
        {
            loading ? (
                <div className="spinner">
                    Loading...
                </div>
            ) : (
                <div className=" max-w-[500px] p-4 lg:p-8">
                    <h1 className=" text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
                        Choose new password
                    </h1>
                    <p className=" my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
                        Almost done. Enter your new password and you are all set
                    </p>
                    <form onSubmit={submitHandler}>
                        <label className=" relative">
                            <p className=" text-richblack-25 mb-1 text-[0.875rem] leading-[1.625rem]">
                                New Password<sup className=" text-pink-200">*</sup>
                            </p>
                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                name='password'
                                value={password}
                                onChange={handleOnChange}
                                placeholder="Enter New Pasword"
                                style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className=" w-full p-[12px] rounded-[0.5rem] bg-richblack-800 text-richblack-5"
                            />         
                            <span
                            onClick={() => setShowPassword((prev) => !prev)}
                            className=" absolute right-4 top-10">
                                {
                                    showPassword ? 
                                    <AiFillEyeInvisible fontSize={24}/>
                                    :
                                    <AiFillEye fontSize={24}/>
                                }
                            </span>                  
                        </label>

                        <label className=" relative mt-3 block">
                            <p className=" text-richblack-25 mb-1 text-[0.875rem] leading-[1.625rem]">
                                Confirm New Password<sup className=" text-pink-200">*</sup>
                            </p>
                            <input
                                required
                                type={showConfirmPassword ? "text" : "password"}
                                name='confirmPassword'
                                value={confirmPassword}
                                onChange={handleOnChange}
                                placeholder="Confirm Password"
                                style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className=" w-full p-[12px] rounded-[0.5rem] bg-richblack-800 text-richblack-5"
                            />         
                            <span
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className=" absolute right-4 top-10">
                                {
                                    showConfirmPassword ? 
                                    <AiFillEyeInvisible fontSize={24}/>
                                    :
                                    <AiFillEye fontSize={24}/>
                                }
                            </span>                  
                        </label>

                        <button type="submit"
                                className=" w-full mt-6 bg-yellow-50 p-[12px] rounded-[8px] text-richblack-900 font-medium">
                            Reset Password
                        </button>                        
                    </form>
                    <div >
                        <Link to = "/login">
                            <p className=" flex items-center gap-2 mt-4">
                                <BiArrowBack/>
                                Back to login
                            </p>
                        </Link>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default UpdatePassword