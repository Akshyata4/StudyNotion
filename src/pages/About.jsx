import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Quote from '../components/core/AboutPage/Quote'
import FoundingStory from '../assets/Images/FoundingStory.png'
import StatsComponent from '../components/core/AboutPage/StatsComponent'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import Footer from '../components/common/Footer'

const About = () => {
  return (
    <div className='text-white'>
        {/* SECTION 1 */}
        <section className=' bg-richblack-800'>
            <div className=' relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between text-center text-white'>
                <header className=' pt-40 text-4xl font-semibold lg:w-[70%] mx-auto'>
                    Driving Innovation in Online Education for a
                    <HighlightText text={"Brighter Future"}/>
                    <p className=' mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]'>
                    Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a <br/>brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a <br/>vibrant learning community.
                    </p>
                </header>
                {/* For 3 images */}
                <div className="sm:h-[70px] lg:h-[280px]"></div>
                <div className='absolute top-[60%] flex flex-col lg:flex-row gap-5 mx-auto'>
                    <img src={BannerImage1}/>
                    <img src={BannerImage2}/>
                    <img src={BannerImage3}/>
                </div>
            </div>
        </section>

        {/* SECTION 2 */}
        <section className=' mt-36'>
            <div className='w-11/12 text-4xl font-semibold text-richblack-100 text-center'>
                <Quote/>                
            </div>
        </section>

        {/* SECTION 3 */}
        <section className=' mt-20 border-t border-richblack-700'>
            {/* for whole section */}
            <div className=' flex flex-col gap-36 justify-between text-richblack-300 w-11/12 mx-auto mt-20 max-w-maxContent'>
                {/* for 1st sub section */}
                <div className=' flex flex-col items-center gap-10 lg:flex-row justify-between"  '>
                    {/* for left */}
                    <div className='flex lg:w-[50%] flex-col gap-6 ml-8'>
                        <h2 className='text-4xl font-semibold bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-transparent lg:w-[55%]'>
                            Our Founding Story
                        </h2>
                        <p className='lg:w-[72%]'>
                        Our e-learning platform was born out of a shared vision and passion for
                         transforming education. It all began with a group of educators, technologists, and
                          lifelong learners who recognized the need for accessible, flexible, 
                          and high-quality learning opportunities in a rapidly evolving digital world.
                        </p>
                        <p className='lg:w-[72%]'>
                        As experienced educators ourselves, we witnessed firsthand the limitations and 
                        challenges of traditional education systems. We believed that education should not 
                        be confined to the walls of a classroom or restricted by geographical boundaries. 
                        We envisioned a platform that could bridge these gaps and empower individuals from 
                        all walks of life to unlock their full potential.
                        </p>
                    </div>
                    {/* right img */}
                    <div>
                        <img src={FoundingStory}
                            alt="FoundingStory img"
                            className='shadow-[0_0_20px_0] shadow-[#FC6767]'
                        />
                    </div>
                </div>

                {/* 2nd sub section */}
                <div className=' flex flex-col items-center lg:gap-14 lg:flex-row justify-between'>
                    {/* left */}
                    <div className=' flex lg:w-[50%] flex-col gap-6 ml-8'>
                        <h2 className='bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] '>
                            Our Vision
                        </h2>
                        <p className=' lg:w-[78%]'>
                        With this vision in mind, we set out on a journey to create an e-learning platform that would 
                        revolutionize the way people learn. Our team of dedicated experts worked tirelessly to 
                        develop a robust and intuitive platform that combines cutting-edge technology with 
                        engaging content, fostering a dynamic and interactive learning experience.
                        </p>
                    </div>
                    {/* right */}
                    <div className=' flex flex-col gap-6 lg:w-[50%] ml-7'>
                        <h2 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
                            Our Mission
                        </h2>
                        <p className='lg:w-[78%]'>
                        Our mission goes beyond just delivering courses online. We wanted to create a vibrant 
                        community of learners, where individuals can connect, collaborate, and learn from one 
                        another. We believe that knowledge thrives in an environment of sharing and dialogue, and 
                        we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* SECTION 4 */}
        <StatsComponent/>

        {/* SECTION 5 */}
        <section className=' mx-auto w-11/12 max-w-maxContent mt-20 flex flex-col items-center justify-between gap-10 mb-[140px]'>
            <LearningGrid/>
            <ContactFormSection/>
        </section>

        <section>
            <div className=' text-4xl font-semibold text-center'>
                Reviews from other learners
            </div>
        </section>

        <div className=' bg-richblack-800 text-richblack-100 mt-8'>
            {/* FOR CONTENT */}
            <div className=' w-11/12 mx-auto max-w-maxContent flex flex-col gap-3 items-center '>
                <Footer/>
            </div>
        </div>
        
        
    </div>
  )
}

export default About