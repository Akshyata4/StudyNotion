//for API's
const BASE_URL = process.env.REACT_APP_BASE_URL

//AUTH ENDPOINTS/PATHNAME
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getenrolledcourses",
}

//STUDENTS ENDPOINTS
export const studentEndpoints = {
    COURSE_PAYMENT_API: BASE_URL + "/payment/capturepayment",
    COURSE_VERIFY_API: BASE_URL + "/payment/verifypayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendpaymentsuccessemail"
}

// COURSE ENDPOINTS
export const courseEndpoints = {
    GET_ALL_COURSE_API: BASE_URL + "/course/getallcourses",
    COURSE_DETAILS_API: BASE_URL + "/course/getcoursedetails",
    EDIT_COURSE_API: BASE_URL + "/course/editcourse",
    COURSE_CATEGORIES_API: BASE_URL + "/course/showallcategories",
    CREATE_COURSE_API: BASE_URL + "/course/createcourse",
    CREATE_SECTION_API: BASE_URL + "/course/addsection",
    CREATE_SUBSECTION_API: BASE_URL + "/course/addsubsection",
    UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
    UPDATE_SUBSECTION_API: BASE_URL + "/course/updatesubsection",
    GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getinstructorcourses",
    DELETE_SECTION_API: BASE_URL + "/course/deletesection",
    DELETE_SUBSECTION_API: BASE_URL + "/course/deletesubsection",
    DELETE_COURSE_API: BASE_URL + "/course/deletecourse",
    GET_FULL_COURSE_DETAILS_AUTHENTICATED:
      BASE_URL + "/course/getfullcoursedetails",
    LECTURE_COMPLETION_API: BASE_URL + "/course/updatecourseprogress",
    CREATE_RATING_API: BASE_URL + "/course/createrating",
  }

//RATINGS AND REVIEWS
export const ratingsEndpoints = {
    REVIEWS_DETAILS_API: BASE_URL + "/course/getreviews",
}

//CATEGORIES API
export const categories = {
    CATEGORIES_API : BASE_URL + "/course/showallcategories"
}

// CATALOG PAGE DATA
export const catalogData = {
    CATALOGPAGEDATA_API: BASE_URL + "/course/getcategorypagedetails",
}

//CONTACT-US API
export const contactusEndpoint = {
    CONTACT_US_API : BASE_URL + "/reach/contact"
}
//SETTINGS PAGE API
export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updatedisplaypicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateprofile",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
    DELETE_PROFILE_API: BASE_URL + "/profile/deleteprofile",
}