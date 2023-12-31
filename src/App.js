import "./App.css";
import { Route, Routes} from "react-router-dom";
import Error from './pages/Error'
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import OpenRoute from "./components/core/Auth/OpenRoute";

import Login from "./pages/Login"
import Signup from "./pages/Signup"
import UpdatePassword from "./pages/UpdatePassword";
import { VerifyEmail } from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Settings from "./components/core/Dashboard/Settings";
import { ACCOUNT_TYPE } from "./utils/constants";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { useSelector } from "react-redux";
import AddCourse from "./components/core/Dashboard/AddCourse";

function App() {
  const {user} = useSelector((state) => state.profile)
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>

        <Route path="*" element={<Error/>}/>

        <Route path="/" element={<Home/>}/>

        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup/>
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login/>
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword/>
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword/>
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail/>
            </OpenRoute>
          }
        />
        <Route
          path="about"
          element={
            <OpenRoute>
              <About/>
            </OpenRoute>
          }
        />
        <Route path="contact" element={<OpenRoute> <Contact/></OpenRoute>}/>

        
        <Route 
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }>     
          <Route path="dashboard/my-profile" element={<MyProfile/>}/> 
          <Route path="dashboard/settings" element={<Settings/>}/>     
          
          {/* protected route for student */}
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
              <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>}/>  
              <Route path="dashboard/cart" element={<Cart/>}/>  
              </>
            )
          } 

          {/* protected route for instructor */}
          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
              <Route path="dashboard/add-course" element={<AddCourse/>}/>  
              </>
            )
          }           
        </Route> 
         
               
           
      </Routes>    
    </div>
  );
}

export default App;
