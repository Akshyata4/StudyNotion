import React from 'react'
import instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAButton from '../HomePage/Button'
import {FaArrowRight} from 'react-icons/fa'

const InstructorSection = () => {
  return (
    <div>
        <div className='flex gap-20 items-center'>
            {/* LEFT */}
            <div className=' w-[50%] '>
                <img
                    src={instructor}
                    alt='instructorImg'
                    className=' shadow-white'
                />
            </div>
            {/* RIGHT */}
            <div className=' w-[50%] flex flex-col gap-4'>
                <div className='text-4xl font-semibold'>
                  Become an <br/>
                  <HighlightText text={"instructor"}/>
                </div>
                <p className='text-[16px] text-richblack-300 font-inter font-medium w-[80%] '>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                
                <div className='w-fit mt-10'>
                  <CTAButton active={true} linkto={"/signup"}>
                      <div className=' flex items-center gap-3 '>
                          Start Teaching Today
                          <FaArrowRight/>
                      </div>    
                  </CTAButton>
                </div>
                  
                
            </div>
        </div>
    </div>
  )
}

export default InstructorSection