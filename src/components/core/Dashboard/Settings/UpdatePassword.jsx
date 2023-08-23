import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { changePassword } from '../../../../services/operations/settingsAPI'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import IconBtn from '../../../common/IconBtn'

const UpdatePassword = () => {
    const {token} = useSelector((state) => state.auth)
    const navigate = useNavigate()

    const[showOldPassword, setShowOldPassword] = useState(false)
    const[showNewPassword, setShowNewPassword] = useState(false)

    const{
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()

    const submitPasswordForm = async(data) => {
        try{
            await changePassword(token, data) 
        } catch(error){
            console.log("ERROR MESSAGE - ", error.message)
        }
    }
  return (
    <form onSubmit={handleSubmit(submitPasswordForm)}>
        {/* box */}
        <div className='my-10 flex flex-col gap-y-6 rounded-md border border-richblack-700 bg-richblack-800 p-8 px-12'>
            <h2 className='text-lg font-semibold text-richblack-5'>
                Password
            </h2>
            {/* current and new */}
            <div className=' flex flex-col gap-5 lg:flex-row'>
                {/* current */}
                <div className='relative flex flex-col gap-2 w-full'>
                    <label htmlFor='oldPassword' className='label-style'>
                        Current Password
                    </label>
                    <input
                        type={showOldPassword ? "text" : "password"}
                        name='oldPassword'
                        id='oldPassword'
                        placeholder='Enter current password'
                        className='form-style'
                        {...register("oldPassword", {required: true})}
                    />
                    <span
                        onClick={() => setShowOldPassword((prev) => !prev)}
                        className='absolute right-3 top-10'
                    >
                        {showOldPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>
                        ) : (
                            <AiOutlineEye fontSize={24} fill='#AFB2BF'/>
                        )}
                    </span>
                    {errors.oldPassword && (
                        <span >
                            Please enter your current password
                        </span>
                    )}
                </div>
                {/* new */}
                <div className='relative flex flex-col gap-2 w-full'>
                    <label htmlFor='newPassword' className='label-style'>
                        New Password
                    </label>
                    <input
                        type={showNewPassword ? "text" : "password"}
                        name="newPassword"
                        id="newPassword"
                        placeholder="Enter New Password"
                        className="form-style"
                        {...register("newPassword", { required: true })}
                    />
                    <span
                        onClick={() => setShowNewPassword((prev) => !prev)}
                        className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                    >
                        {showNewPassword ? (
                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                        ) : (
                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                        )}
                    </span>
                    {errors.newPassword && (
                        <span>
                            Please enter your new password.
                        </span>
                    )}
                </div>
            </div>
        </div>
        <div className='flex justify-end gap-3'>
            <button 
                onClick={() => {
                    navigate("/dashboard/profile")
                }}
                className='cursor-pointer text-richblack-50 font-semibold bg-richblack-700 py-2 px-5 rounded-md'
            >
                Cancel
            </button>
            <IconBtn type="submit" text="update"/>
        </div>
    </form>
  )
}

export default UpdatePassword