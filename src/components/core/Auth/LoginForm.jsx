import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../../../services/operations/authAPI"

function LoginForm(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        email:"",
        password:""
    })

    const [showPassword, setShowPassword] = useState(false)

    const{email, password} = formData

    const changeHandler = (event) => {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value,
        }))
    }

    const submitHandler = (event) => {
        event.preventDefault()
        dispatch(login(email, password, navigate))
    }

    return(
        <form
            onSubmit={submitHandler}
            className="mt-6 flex w-full flex-col gap-y-4"
        >
            {/* email */}
            <label className=" w-full">
                <p className="mb-1 text-[0.875rem] text-richblack-5 leading-[1.375rem]">
                    Email Address <sup className=" text-pink-200">*</sup>
                </p>
                <input
                    required
                    type="text"
                    name="email"
                    value={email}
                    onChange={changeHandler}
                    placeholder="Enter email address"
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                />
            </label>
            {/* password */}
            <label className="relative">
                <p className="mb-1 text-[0.875rem] text-richblack-5 leading-[1.375rem]">
                    Password <sup className=" text-pink-200">*</sup>
                </p>
                <input
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={changeHandler}
                    placeholder="Enter password"
                    className=" w-full rounded-[0.5rem] text-richblack-5 bg-richblack-800 p-[12px] "
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                />
                <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-[38px] z-10 cursor-pointer"
                >
                    {showPassword ? 
                    (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>) 
                    : 
                    (<AiOutlineEye fontSize={24} fill="#AFB2BF"/>) }
                </span>
                <Link to="/forgot-password">
                    <p className=" mt-1 ml-auto max-w-max text-xs text-blue-100">
                        Forgot Password
                    </p>
                </Link>
            </label>
            <button 
                type="submit"
                className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
            >
                Sign In
            </button>
        </form>
    )
}

export default LoginForm