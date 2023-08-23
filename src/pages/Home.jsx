import React from 'react'
import { Link } from 'react-router-dom'
import {FaArrowRight} from 'react-icons/fa'
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from '../components/core/HomePage/Button'
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/HomePage/CodeBlocks'
import TimelineSection from '../components/core/HomePage/TimelineSection'
import LanguageSection from '../components/core/HomePage/LanguageSection'
import InstructorSection from '../components/core/HomePage/InstructorSection'
import Footer from '../components/common/Footer'
import ExploreMore from '../components/core/HomePage/ExploreMore'

const Home = () => {
  return (
    <div>
        {/* SECTION 1 */}
        <div className='relative mx-auto flex flex-col w-11/12 items-center text-white justify-between max-w-maxContent'>

            <Link to={"/signup"}>
                {/*for button*/}
                <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
                transition-all duration-200 hover:scale-95 w-fit' 
                    style={{
                    boxShadow: " 0px 1px 0px rgba(255, 255, 255, 0.18)"
                        }}
                    > 
                    {/*for content*/} 
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                    transition-all duration-200 group-hover:bg-richblack-900 '> 
                   
                        <p>Become an Instructor</p>
                        <FaArrowRight/>
                    </div>
                </div>
            </Link>

            <div className='text-center text-4xl font-semibold mt-8 '>
                Empower Your Future With 
                <HighlightText text={"Coding Skills"}/>
            </div>

            <div className='text-center w-[90%] text-lg font-bold text-richblack-300 mt-4'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </div>
            <div className='flex flex-row gap-7 mt-16'>
                <CTAButton active={true} linkto={"/signup"}>
                    Learn More
                </CTAButton>
                <CTAButton active={false} linkto={"/login"}>
                    Book a Demo
                </CTAButton>
            </div>

            <div className='mx-3 my-14 shadow-blue-200'>
                <video
                muted
                loop
                autoPlay
                >
                <source src={Banner} type='video/mp4'/>
                </video>
            </div>
            {/* code section 1*/}
            <div>
                <CodeBlocks
                    position={"lg:flex-row"}
                    heading={
                        <div className='text-4xl font-semibold'>
                            Unlock your <HighlightText text={"coding potential"}/> <br/>
                            with our online courses
                        </div>
                    }
                    subheading={
                        <div className='w-[85%]'>
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        </div>                        
                    }
                    ctabtn1={
                        {
                            children: "Try it yourself",
                            linkto: "/signup",
                            active: true,
                        }
                    }
                    ctabtn2={
                        {
                            children: "Learn More" ,
                            linkto: "/login",
                            active: false,
                        }
                    }
                    codeblock={`<!DOCTYPE html>\n<html>\n<head><>Example</\ntitle><link rel="stylesheet" href="style.css">\n</head>\n<body>\n<h1><a href="/">Header</a>\n</h1>\n<nav><a href="one/">One</a>\n</nav>\n</body>`}
                    codecolor ={" text-yellow-25"}
                />
            </div>

            {/* code section 2 */}
            <div >
                <CodeBlocks
                    position={"lg:flex-row-reverse"}
                    heading={
                        <div className=' text-4xl font-semibold'>
                            Start
                            <HighlightText text={"coding in"}/> <br/>
                            <HighlightText text={"seconds"}/>
                        </div>
                    }
                    subheading={
                        <div className=' w-[85%]'>
                            "Go ahead, give it a try. Our hands-on learning environment  means you'll be writing real code from your very first lesson."
                        </div>
                    }
                    ctabtn1={
                        {
                            children: "Continue Lesson",
                            linkto: "/signup",
                            active: true,
                        }
                    }
                    ctabtn2={
                        {
                            children: "Learn More",
                            linkto: "/login",
                            active: false,
                        }
                    }
                    codeblock={`<!DOCTYPE html>\n<html>\nhead><>Example</\ntitle><linkrel="stylesheet"href="styles.css">\n</head>\n<body>\nh1><ahref="/">Header</a>\n</h1>\nnav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n</nav>`}
                    codecolor ={" text-yellow-25"}
                />
            </div>

            <ExploreMore/>
        </div>

        {/* SECTION 2 */}        
        {/* FOR WHITE BG */}
        <div className=' bg-pure-greys-5 text-richblack-700'>
            {/* FOR CHECKED BACKGROUND */}
            <div className='homepage_bg h-[320px]'>
                {/* FOR 11/12 CONTENT */}
                <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto'>
                    {/* FOR BUTTONS */}
                    <div className='flex gap-7 text-white mx-auto mt-52'>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className='flex items-center gap-3'>
                                Explore Full Catalog
                                <FaArrowRight/>
                            </div>
                        </CTAButton>
                        <CTAButton active={false} linkto={"/login"}>
                            <div className='flex items-center gap-3'>
                                Learn more
                                <FaArrowRight/>
                            </div>
                        </CTAButton>
                    </div>
                </div>               
            </div>
            {/* FOR WHITE BG */}
            <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto'>
                {/* FOR HEADING, DESC & BUTTON */}
                <div className='flex justify-evenly mt-32'>
                        {/*LEFT */}
                        <div className='text-4xl font-semibold w-[45%]'>
                            Get the skills you need for a <HighlightText text={"job"}/> <br/>
                            <HighlightText text={"that is in demand."}/>
                        </div>
                        {/* RIGHT */}
                        <div className='flex flex-col w-[40%] items-start gap-10'>
                            <p className='text-[16px]'>
                            The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                            <CTAButton active={true} linkto={"/signup"}>
                                Learn More
                            </CTAButton>
                        </div>
                    </div>
                    <TimelineSection/>
                    <LanguageSection/>
            </div>                  
        </div>

        {/* SECTION 3 */}
        {/* FOR DARK BG */}
        <div className='mt-16 bg-richblack-900 text-white'>
            {/* FOR CONTENT */}
            <div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8'>
                <InstructorSection/>
                <h2 className='text-center text-4xl font-semibold mt-10'>Review from Other Learners</h2>
            </div>
        </div>

        {/* FOOTER */}
        {/* FOR GREEYISH BG */}
        <div className=' bg-richblack-800 text-richblack-100'>
            {/* FOR CONTENT */}
            <div className=' w-11/12 mx-auto max-w-maxContent flex flex-col gap-3 items-center '>
                <Footer/>
            </div>
        </div>
    </div>
  )
}

export default Home