import {toast} from "react-hot-toast"
import {profileEndpoints} from "../apis"
import {apiConnector} from "../apiconnector"
import {setLoading, setUser} from "../../slices/profileSlice"
import {logout} from "./authAPI"

const {GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API} = profileEndpoints

export function getUserDetails(token, navigate){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("GET", GET_USER_DETAILS_API, null,{
                Authorization : `Bearer ${token}`,
            })
            console.log("GET_USER_DETAILS_API RESPONSE......", response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            const userImage = response.data.data.userImage
                ? response.data.data.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
            dispatch(setUser({...response.data.data, image: userImage}))
        } catch (error){
            dispatch(logout(navigate))
            console.log("GET_USER_DETAILS_API ERROR.....", error)
            toast.error("Could not get user details")
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
}

export async function getUserEnrolledCourses(token){
  
    const toastId = toast.loading("Loading...")
    let result = []
    try{
        const response = await apiConnector(
            "GET",GET_USER_ENROLLED_COURSES_API,null,
            {
                Authorization: `Bearer ${token}`,
            }
        )        
        //console.log("GET_USER_ENROLLED_COURSES_API RESPONSE.....",response)
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        result = response.data.data
    } catch(error){
        console.log("GET_USER_ENROLLED_COURSES_API ERROR....", error)
        toast.error("Could not get enrolled courses")
    }
    toast.dismiss(toastId)
    return result
}