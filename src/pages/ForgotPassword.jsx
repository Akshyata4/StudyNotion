import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';
import {BiArrowBack} from "react-icons/bi"
const ForgotPassword = () => {
  //as loader depends on mail sent or not to decide which page to show
  const [emailSent, setEmailSent] = useState(false);
  //as we r displaying mail on the UI we have to store that data(mail) to use it
  const [email, setEmail] = useState(""); 
  const {loading} = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent)); //this will create unique link for resetting password and the "setEmailSent" will change the UI from reset password to check ur mail page
  }
  return (
    <div className='text-white grid min-h-[calc(100vh-3.5rem)] place-items-center '>
        {
          loading ? (
            <div>Loading...</div>
          ) : (
            <div className=' max-w-[500px] p-4 lg:p-8'>
              <h1 className=' text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>
                {
                  !emailSent ? "Reset your password" : "Check email"
                } 
              </h1>

              <p className=' my-4 text-[1.275rem] leading-[1.625rem] text-richblack-100'>
                {
                  !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" 
                  : `We have sent the reset email to ${email}`
                }
              </p>

              <form onSubmit={submitHandler}>
                {
                  !emailSent && (
                    <label className='w-full'>
                      <p className=' mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                        Email Address <sup className=' text-pink-200'>*</sup>
                      </p>
                      <input
                        required
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Enter email address'
                        style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className='w-full bg-richblack-800 text-richblack-5 rounded-[0.5rem] p-[12px]'
                      />
                    </label>
                  )
                }
                <button
                type='submit'
                className=' mt-6 w-full bg-yellow-50 rounded-[8px] py-[12px] px-[12px] font-medium text-richblack-900'
                >
                  {
                    !emailSent ? "Reset Password" : "Resend Email"
                  }
                </button> 
              </form>

              <div>
                <Link to="/login">
                  <p className=' flex items-center gap-x-2 text-richblack-5'>
                    <BiArrowBack/>Back to login
                  </p>
                </Link>
              </div>
            </div>
          )
        }
    </div>
  )
}

export default ForgotPassword