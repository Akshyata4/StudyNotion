import React, { useEffect, useState } from 'react'
import { Link, matchPath } from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import {NavbarLinks} from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import {  useSelector } from 'react-redux/es/hooks/useSelector'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import {IoIosArrowDropdownCircle} from "react-icons/io"

const subLinks = [
    {
        title: "python",
        link: "/catalog/python"
    },
    {
        title: "web dev",
        link: "/catalog/web-development"
    },

]

const Navbar = () => {
    //useSelector is used to fetch data from slice
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const {totalItems} = useSelector((state) => state.cart);

    const location = useLocation();

    // const [subLinks, setSubLinks] = useState([]);
     
    // const fetchSublinks = async() => {
    //     try{
    //         const result = await apiConnector("GET", categories.CATEGORIES_API);
    //         console.log("Printing Sublinks result:" , result)
    //         setSubLinks(result.data.data);
    //     }
    //     catch(error) {
    //         console.log("Could not fetch the category list");
    //     }
    // }
    // //for calling API
    // useEffect( () => {
    //     fetchSublinks();
    // }, [])

    //we are matching path for setting color of selected tab...yellow or white
    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname)
    }
  return ( 
    <div className='flex h-14 items-center justify-center border-b border-b-richblack-700'>
        {/* for content width */}
        <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
            {/* Logo */}
            <Link to="/">
                 <img src={logo}
                    alt='studynotionLogo' width={160} height={42} loading='lazy'
                 />
            </Link>
            {/* Nav links */}
            <nav>
                <ul className=' flex gap-x-6 text-richblack-25'>
                {
                    //to access data presnt in data folder 
                    NavbarLinks.map((link, index) => ( 
                        <li key = {index}>
                            {
                                //as catalog handles multiple pages so we've to write it's logic differently thats y we're checking whether the element is catalog or not
                                link.title === "Catalog" ? (
                                    <div className=' relative flex items-center gap-2 group'>
                                        <p>{link.title}</p>
                                        <IoIosArrowDropdownCircle/>

                                        {/* for dropdown box that appears when we hover over catalog */}
                                        <div className='invisible absolute left-[-100%] top-[160%] flex flex-col
                                        rounded-md bg-richblack-5 p-4 text-richblack-900 w-[300px] 
                                        transition-all duration-200 group-hover:visible '>
                                        <div className='absolute left-[46%] top-[-10%] bg-richblack-5 w-6 h-6 rotate-45 rounded-sm'></div>
                                            {
                                                subLinks.length ? (
                                                        //if non-empty 
                                                       subLinks.map( (subLink, index) =>(
                                                        <Link to={`${subLink.link}`} key={index}>
                                                            <p>{subLink.title}</p>
                                                        </Link>
                                                       ))       
                                                    //if empty (mtlb course just start hua hai admin ne categories add nhi kiya)
                                                ) : (<div> </div>)
                                            }
                                        </div>
                                    </div>
                                ) : 
                                    (
                                        <Link to={link?.path}> {/* here ? is used so that it'll not throw error instead it'll say undefined*/}
                                            <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                {link.title}
                                            </p>
                                        </Link>
                                    )
                            }
                        </li>
                    )) 
                }
                </ul>
            </nav>

            {/* login/signup/dashboard */} 
            <div className='flex gap-x-4 items-center'>
                {
                    //to check user login status and who(instructor/student) is the user
                    user && user?.accountType != "Instructor" && (
                        //for cart
                        <Link to="/dashboard/cart" className='relative '>
                            <AiOutlineShoppingCart/>
                            {
                                totalItems > 0 && (
                                    <span>
                                        {totalItems} {/*  items in cart */}
                                    </span>
                                )
                            }
                        </Link>
                    )
                }
                {
                    //to decide whether we want to show login/signup button or not
                    token === null && (
                        <Link to="/login">
                            <button className='border border-richblack-700 bg-richblack-800 rounded-md text-richblack-100 p-2 px-3 '>
                                Log in
                            </button>
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to="/signup">
                            <button className='border border-richblack-700 bg-richblack-800 rounded-md text-richblack-100 p-2 px-3 '>
                                Sign up
                            </button>
                        </Link>
                    )
                }
                {
                    token !== null && <ProfileDropDown/>
                }
            </div>

        </div>
    </div>
  )
}

export default Navbar