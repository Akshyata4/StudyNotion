import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../services/apiconnector';
import { contactusEndpoint } from '../../services/apis';
import CountryCode from "../../data/countrycode.json"

const ContactUsForm = () => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();

    const submitContactForm = async(data) => {
        console.log("Logged Data", data);
        try{
            setLoading(true);
            // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data)
            const response = {status: "OK"};
            console.log("Logging response", response);
            setLoading(false);
        }
        catch(error){
            console.log("Error", error.message);
            setLoading(false);
        }
    }
    
    //on submission of form reset it to prev value
    useEffect(() => {
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:"",

            })
        }
    },[reset,isSubmitSuccessful])


  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
        <div className=' flex flex-col gap-7'>
            <div className=' flex flex-col lg:flex-row gap-5'>
            {/* firstname */}  
            <div className=' flex flex-col gap-2 lg:w-[48%] '>          
                <label htmlFor='firstname' className='label-style'>
                    First Name
                </label>
                <input
                    type='text'
                    name='firstname'
                    id='firstname'
                    placeholder='Enter first name'
                    className='form-style'
                    {...register("firstname", {required:true})}
                />
                {
                    errors.firstname && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter your first name
                        </span>
                    )
                }
            </div>    

            {/* lastname */}
            <div className=' flex flex-col gap-2 lg:w-[48%]'>          
                <label htmlFor='lastname' className='label-style'>
                    Last Name
                </label>
                <input
                    type='text'
                    name='lastname'
                    id='lastname'
                    placeholder='Enter last name'
                    className='form-style'
                    {...register("lastname", {required:true})}
                />
                {
                    errors.firstname && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter your last name
                        </span>
                    )
                }
            </div>  
        </div>
        {/* email */}
        <div className=' flex flex-col gap-2'>          
            <label htmlFor='email' className='label-style'>
                Email Address
            </label>
            <input
                type='email'
                name='email'
                id='email'
                placeholder='Enter email address'
                className='form-style'
                {...register("email", {required:true})}
            />
                {
                    errors.firstname && (
                        <span>
                            Please enter your email address
                        </span>
                    )
                }
            </div> 
            {/* phoneno */}
            <div className='flex flex-col gap-2'>
                <label htmlFor='phonenumber' className='label-style'>
                    Phone Number
                </label>

                {/* for dropdown & phone no */}      
                <div className=' flex gap-5 items-center'>
                    {/* dropdown */}       
                    <div className='flex flex-col w-[12%] gap-1'>                                    
                        <select
                            name='dropdown'
                            id='dropdown'
                            placeholder='+91'
                            className='form-style'
                            {...register("countrycode",{required:true} )}
                        >
                            {
                                CountryCode.map((element, index ) => {
                                    return(
                                        <option key={index} value={element.code}>
                                            {element.code}-{element.country}
                                        </option>
                                    )
                                })
                            }
                        </select>  
                    </div>         
                    {/* phone no */}
                    <div className='flex w-[calc(100%-90px)] flex-col gap-2'>
                        <input
                            type='number'
                            name='phonenumber'
                            id='phonenumber'
                            placeholder='12345 67890'
                            className='form-style '
                            {...register("phoneno", 
                            {
                                required: {
                                    value: true,
                                    message: "Please enter your Phone Number.",
                                    },
                                    maxLength: { value: 12, message: "Invalid Phone Number" },
                                    minLength: { value: 10, message: "Invalid Phone Number" },
                            })}
                        />                    
                    </div>
                </div>
                {
                    errors.phoneNo && (
                        <span>
                            {errors.phoneNo.message}
                        </span>
                    )
                }
            </div>

            {/* message */}
            <div className=' flex flex-col gap-2'>
                <label htmlFor='message' className='label-style'>
                    Message
                </label>
                <textarea
                    name='message'
                    id='message'
                    cols="30"
                    rows="7"
                    placeholder='Enter your message here'
                    className='form-style'
                    {...register("message", {required:true})}
                />
                {
                    errors.message && (
                        <span className=' -mt-1 text-[12px] text-yellow-100'>
                            Please enter your message.
                        </span>
                    )
                }
            </div>

            <button type='submit'
                    className={`rounded-md bg-yellow-50 text-center px-6 py-3 text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]
                        ${
                            !loading && 
                            "transition-all duration-200 hover:scale-95 hover:shadow-none"} disabled:bg-richblack-500 sm:text-[16px] `}
            >
                Send Message
            </button>
        </div>
        
    </form>
  )
}

export default ContactUsForm