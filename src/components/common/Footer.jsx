import React from 'react'
import logo from '../../assets/Logo/Logo-Small-Light.png'
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='flex flex-col bg-richblack-800 '>
        {/* 2 DIVISIONS */}
        <div className='flex gap-5 mt-14 border-b border-richblack-700 pb-7  '>
            {/* LEFT */}
            <div className='flex gap-20 border-r border-richblack-700 pr-14'>
                {/* FOR 1st col */}
                <div className='flex flex-col gap-4'>
                    {/* FOR LOGO & HEADING */}
                    <div className='flex flex-row gap-2 items-center h-[32px]'>
                        <img 
                            src={logo}
                            alt='logoImg'
                            className='h-[32px] w-[32px]'
                        />
                        <h1 className=' font-bold text-[19px] '>StudyNotion</h1>
                    </div>
                    <p className=' font-semibold text-[16px] font-inter'>Company</p>
                    <div className='flex flex-col text-sm text-richblack-400 font-inter gap-4'>
                        <p>About</p>
                        <p>Careers</p>
                        <p>Affiliates</p>
                    </div>
                    <div className='flex gap-3 text-richblack-400 text-[24px]'>
                        <FaFacebook/>
                        <FaGoogle/>
                        <FaTwitter/>
                        <FaYoutube/>
                    </div>
                </div>
                {/* 2nd col */}
                <div className='flex flex-col gap-4'>
                    <p className=' font-semibold text-[16px] font-inter'>Resources</p>
                    <div className='flex flex-col text-sm text-richblack-400 font-inter gap-3'>
                        <p>Articles</p>
                        <p>Blog</p>
                        <p>Chart Sheet</p>
                        <p>Code challenges</p>
                        <p>Docs</p>
                        <p>Projects</p>
                        <p>Videos</p>
                        <p>Workspaces</p>
                    </div>
                    <p className=' font-semibold text-[16px] font-inter mt-6'>Support</p>
                    <p className='text-sm text-richblack-400 font-inter'>Help Center</p>
                </div>
                {/* 3rd col */}
                <div className='flex flex-col gap-4'>
                    <p className=' font-semibold text-[16px] font-inter'>Plans</p>
                    <div className='flex flex-col text-sm text-richblack-400 font-inter gap-3'>
                        <p>Paid memberships</p>
                        <p>For students</p>
                        <p>Business solutions</p>
                    </div>
                    <p className=' font-semibold text-[16px] font-inter mt-6'>Community</p>
                    <div className='flex flex-col text-sm text-richblack-400 font-inter gap-3'>
                        <p>Forums</p>
                        <p>Chapters</p>
                        <p>Events</p>
                    </div>
                </div>    
            </div>
            {/* RIGHT */}
            <div className='flex gap-20 pl-2'>
                {/* 1st Col */}
                <div className='flex flex-col gap-4'>
                    <p className=' font-semibold text-[16px] font-inter'>Subjects</p>
                    <div className='flex flex-col text-sm text-richblack-400 font-inter gap-3'>
                        <p>AI</p>
                        <p>Cloud Computing</p>
                        <p>Code Fundamentals</p>
                        <p>Computer Science</p>
                        <p>Cybersecurity</p>
                        <p>Data Analytics</p>
                        <p>Data Science</p>
                        <p>Data Visualization</p>
                        <p>Developer Tools</p>
                        <p>DevOps</p>
                        <p>Game Development</p>
                        <p>IT</p>
                        <p>Machine Learning</p>
                        <p>Math</p>
                        <p>Mobile Development</p>
                        <p>Web Design</p>
                        <p>Web Development</p>
                    </div>
                </div>
                {/* 2nd col */}
                <div className='flex flex-col gap-4'>
                    <p className=' font-semibold text-[16px] font-inter'>Subjects</p>
                    <div className='flex flex-col text-sm text-richblack-400 font-inter gap-3'>
                        <p>Bash</p>
                        <p>C</p>
                        <p>C++</p>
                        <p>C#</p>
                        <p>Go</p>
                        <p>HTML & CSS</p>
                        <p>Java</p>
                        <p>JavaScript</p>
                        <p>Kotlin</p>
                        <p>PHP</p>
                        <p>Python</p>
                        <p>R</p>
                        <p>Ruby</p>
                        <p>SQL</p>
                        <p>Swift</p>
                    </div>
                </div>
                {/* 3rd */}
                <div className='flex flex-col gap-4'>
                    <p className=' font-semibold text-[16px] font-inter'>Subjects</p>
                    <div className='flex flex-col text-sm text-richblack-400 font-inter gap-3'>
                        <p>Career path</p>
                        <p>Career services</p>
                        <p>Interview prep</p>
                        <p>Professional certification#</p>
                        <p>-</p>
                        <p>Full Catalog</p>
                        <p>Beta Content</p>
                    </div>
                </div>
            </div>
        </div>

        <div className='flex justify-start gap-2 text-sm font-inter text-richblack-300 my-10 '>
            <p className='border-r border-richblack-700 pr-2'>Privacy policy</p>
            <p className='border-r border-richblack-700 pr-2'>Cookie Policy</p>
            <p>Terms</p>
        </div>
    </div>
  )
}

export default Footer