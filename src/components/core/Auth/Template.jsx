import React from 'react'
import {useSelector} from 'react-redux'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import frameImg from '../../../assets/Images/frame.png'


//template component for the common parts of both signpp and login form
function Template({title, desc1, desc2, image, formType}){
    const {loading} = useSelector ((state) => state.auth)
  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        {loading ? 
        (
            <div className='spinner'></div>
        ):
        (
            <div className='mx-auto flex w-11/12 max-w-maxContent justify-between gap-y-12 py-12'>
                {/* for title description and form */}
                <div className='mx-auto w-11/12 max-w-[450px]'>
                    <h1 className=' text-richblack-5 text-[1.875rem] font-semibold leading-[2.375rem] w-[90%]'>
                        {title}
                    </h1>
                    <p className=' mt-4 text-[1.125rem] leading-[1.625rem]'>
                        <span className='text-richblack-100'>{desc1}</span>{" "}
                        <span className=" font-edu-sa italic text-blue-100">{desc2}</span>
                    </p>
                    {formType === "signup" ? <SignupForm/> : <LoginForm/>}
                </div>
                {/* for 2 images */}
                <div className=' relative mx-auto w-11/12 max-w-[450px]'>
                    <img
                        src={frameImg}
                        alt='pattern'
                        width={558}
                        height={504}
                        loading='lazy'
                    />
                    <img
                        src={image}
                        alt='students'
                        width={558}
                        height={504}
                        loading='lazy'
                        className='absolute -top-4 right-4 z-10'
                    />
                </div>
            </div>
        )}
    </div>
  )
}

export default Template