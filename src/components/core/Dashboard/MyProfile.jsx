import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'
import {RiEditBoxLine} from 'react-icons/ri'
const MyProfile = () => {
    const {user} = useSelector((state) => state.profile)
    const navigate = useNavigate();
  return (
    <div >
        {/* heading */}
        <h1 className='mb-12 font-medium text-3xl text-richblack-5'>
            My Profile
        </h1>

        {/* section  1 */}
        <div className='flex items-center justify-between border border-richblack-700  bg-richblack-800 rounded-md p-8 px-12 gap-5 '>
            {/* left */}
            <div className=' flex gap-x-4 items-center '> 
                <img 
                    src={user?.image}
                    alt={`profile-${user?.firstName}`}
                    className=' aspect-square w-[78px] rounded-full object-cover'
                />
                {/* for data */}
                <div className='space-y-1'> 
                    <p className='text-lg font-semibold text-richblack-5'>{user?.firstName + " " + user?.lastName}</p>
                    <p className='text-sm text-richblack-300'>{user?.email}</p>
                </div>
            </div>

            {/* right */}
            <IconBtn
                text="Edit"
                onClick={() => {
                    navigate("/dashboard/settings")
                }}
            >    
                <RiEditBoxLine/>            
            </IconBtn>
        </div>

        {/* section 2 */}
        <div className='my-10 flex flex-col gap-y-10 border border-richblack-700  bg-richblack-800 rounded-md p-8 px-12'>
            {/* left */}
            <div className=' flex w-full items-center justify-between'>
                <p className='text-lg font-semibold text-richblack-5'>About</p>
                <IconBtn 
                    text="Edit"
                    onClick={() => {
                        navigate("/dashboard/settings")
                    }}
                >
                    <RiEditBoxLine/>
                </IconBtn>
            </div>
            <p 
                className={`${
                    user?.additionalDetails?.about 
                    ? "text-richblack-5" 
                    : "text-richblack-400"
                } text-sm font-medium`}
            >
                {user?.additionalDetails?.about ?? "Write something about yourself"}
            </p> 
        </div>

        {/* section 3 */}
        <div className='my-10 flex flex-col gap-y-10 border border-richblack-700  bg-richblack-800 rounded-md p-8 px-12'>
            {/* left */}
            <div className='flex w-full items-center justify-between'>
                <p className='text-lg font-semibold text-richblack-5'>
                    Personal Details                    
                </p>
                <IconBtn
                        text="Edit"
                        onClick={() => {
                            navigate("/dasboard/settings")
                        }}
                    >
                        <RiEditBoxLine/>
                    </IconBtn>
            </div>

            <div className=' flex max-w-[500px] justify-between '>            
                    <div className=' flex flex-col gap-5'>
                        <div>
                            <p className='mb-2 text-sm text-richblack-600'>
                                First Name
                            </p>
                            <p className='text-sm font-medium text-richblack-5'>
                                {user?.firstName}
                            </p>
                        </div>
                        <div>
                            <p className='mb-2 text-sm text-richblack-600'>
                                Email
                            </p>
                            <p className='text-sm font-medium text-richblack-5'>
                                {user?.email}
                            </p>
                        </div>
                        <div>
                            <p className='mb-2 text-sm text-richblack-600'>
                                Gender
                            </p>
                            <p className='text-sm font-medium text-richblack-5'>
                                {user?.additionalDetails?.gender ?? "Add gender"}
                            </p>
                        </div>
                    </div>
                    
                    <div className='flex flex-col gap-5'>
                        <div>
                            <p className='mb-2 text-sm text-richblack-600'>
                                Last Name
                            </p>
                            <p className='text-sm font-medium text-richblack-5'>
                                {user?.lastName}
                            </p>
                        </div>
                        <div>
                            <p className='mb-2 text-sm text-richblack-600'>
                                Phone Number
                            </p>
                            <p className='text-sm font-medium text-richblack-5'>
                                {user?.additionalDetails?.contactNumber ?? "Add contact number"}
                            </p>
                        </div>
                        <div>
                            <p className='mb-2 text-sm text-richblack-600'>
                                Date of Birth
                            </p>
                            <p className='text-sm font-medium text-richblack-5'>
                                {user?.additionalDetails?.dateOfBirth ?? "Add date of birth"}
                            </p>
                        </div>
                    </div>                                
            </div>
        </div>

    </div>
  )
}

export default MyProfile