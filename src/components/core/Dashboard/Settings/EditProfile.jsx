import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateProfile } from '../../../../services/operations/settingsAPI'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../common/IconBtn'

const gender = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

const EditProfile = () => {
    const {user} = useSelector((state) => state.profile)
    const {token} = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const{
        register,
        handleSubmit,
        formState: {errors},
    } = useForm()

    const submitProfileForm = async(data) => {
        try{
            dispatch(updateProfile(token, data))
        } catch(error){
            console.log("ERROR MESSAGE - ", error.message)
        }
    }
  return (
    <form onSubmit={handleSubmit(submitProfileForm)}>
        {/* box */}
        <div className='my-10 flex flex-col gap-y-6 rounded-md border border-richblack-700 bg-richblack-800 p-8 px-12'>
            <h2 className='text-richblack-5 font-semibold text-lg'>
                Profile Information
            </h2>
            {/* for first nd last */}
            <div className='flex flex-col gap-5 lg:flex-row'>
                {/* for first */}
                <div className='flex flex-col gap-2 w-full'>
                    <label htmlFor='firstName' className='label-style'>
                        First Name
                    </label>
                    <input
                        type='text'
                        name='firstName'
                        id='firstName'
                        placeholder='Enter first name'
                        className='form-style'
                        {...register("firstName", {required: true})}
                        defaultValue={user?.firstName}
                    />
                    {errors.firstName && (
                        <span className=''>
                            Please enter your first name
                        </span>
                    )}
                </div>
                {/* for last */}
                <div className='flex flex-col gap-2 w-full'>
                    <label className=' label-style'>
                        Last Name
                    </label>
                    <input
                        type='text'
                        name='lastName'
                        id='lastName'
                        placeholder='Enter last name'
                        className='form-style'
                        {...register("lastName", {required: true})}
                        defaultValue={user?.lastName}
                    />
                    {errors.firstName && (
                        <span className=''>
                            Please enter your last name
                        </span>
                    )}
                </div>
            </div>

            {/* DOB & gender */}
            <div className='flex flex-col gap-5 lg:flex-row '>
                {/* DOB */}
                <div className='flex flex-col gap-2 w-full'>
                    <label className='label-style'>
                        Date of Birth
                    </label>
                    <input
                        type='date'
                        name='dateOfBirth'
                        id='dateOfBirth'
                        className='form-style'
                        {...register("dateOfBirth",{
                            required: {
                                value: true,
                                message: "Please enter your date of birth.",
                            },
                            max: {
                                value: new Date().toISOString().split("T")[0],
                                message:"Date of birth cannot be a future date."
                            }
                        })}
                        defaultValue={user?.additionalDetails?.dateOfBirth}
                    />
                    {errors.dateOfBirth && (
                        <span>
                            {errors.dateOfBirth.message}
                        </span>
                    )}
                </div>
                {/* Gender */}
                <div className='flex flex-col gap-2 w-full'>
                    <label className='label-style'>
                        Gender
                    </label>
                    <select
                        typeof='text'
                        name='gender'
                        id='gender'
                        className='form-style'
                        {...register("gender", {required: true})}
                        defaultValue={user?.additionalDetails?.gender}
                    >
                        {gender.map((ele, i) => {
                            return(
                                <option key={i} value={ele}>
                                    {ele}
                                </option>
                            )
                        })}
                    </select>
                    {errors.gender && (
                        <span>
                            Please choose your gender
                        </span>
                    )}
                </div>
            </div>

            {/* contact no. & about */}
            <div className='flex flex-col gap-5 lg:flex-row '>
                {/* contact */}
                <div className='flex flex-col gap-2 w-full'>
                    <label className='label-style'>
                        Contact Number
                    </label>
                    <input
                        type='tel'
                        name='contactNumber'
                        id='contactNumber'
                        placeholder='Enter contact number'
                        className='form-style'
                        {...register("contactNumber",{
                            required: {
                                value: true,
                                message: "Please enter your contact number.",
                            },
                            maxLength: {value: 12, message: "Invalid contact number"},
                            minLength: {value: 10, message: "Invalid contact number"},
                        })}
                        defaultValue={user?.additionalDetails?.contactNumber}
                    />
                    {errors.contactNumber && (
                        <span>
                            {errors.contactNumber.message}
                        </span>
                    )}
                </div>
                {/* about */}
                <div className='flex flex-col gap-2 w-full'>
                    <label className=' label-style'>
                        About
                    </label>
                    <input
                        type='text'
                        name='about'
                        id='about'
                        placeholder='Enter bio '
                        className='form-style'
                        {...register("aboutt", {required: true})}
                        defaultValue={user?.additionalDetails?.about}
                    />
                    {errors.about && (
                        <span>
                            Please write about you.
                        </span>
                    )}
                </div>
            </div>
        </div>

        <div className=' flex justify-end gap-3'>
            <button
                onClick={() => {
                    navigate("/dashboard/my-profile")
                }}
                className=' cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50'
            >
                Cancel
            </button>
            <IconBtn type="submit" text="save"/>
        </div>
    </form>
  )
}

export default EditProfile