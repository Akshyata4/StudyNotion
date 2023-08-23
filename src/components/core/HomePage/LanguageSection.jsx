import React from 'react'
import HighlightText from './HighlightText'
import knowYourProgress from "../../../assets/Images/Know_your_progress.png"
import compareWithOthers from "../../../assets/Images/Compare_with_others.png"
import planYourLessons from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "../HomePage/Button"

const LanguageSection = () => {
  return (
    <div>
        
        <div className='flex flex-col items-center gap-2 text-richblack-600 mt-28 mb-28'>
            <div className='text-4xl font-semibold text-center'>
                Your swiss knife for <HighlightText text={"learning any language"}/>
            </div>
            <div className='flex flex-col text-center font-inter text-base font-medium'>
                <p>Using spin making learning multiple languages easy. with 20+ languages realistic </p>
                <p>voice-over, progress tracking, custom schedule and more.</p>
            </div>
            {/* 3 images */}
            <div className='flex items-center justify-center mt-4'>
                <img
                    src={knowYourProgress} 
                    alt='knowYourProgressImg'
                    className=' object-contain -mr-32'
                />
                <img
                    src={compareWithOthers} 
                    alt='compareWithOthersImg'
                    className=' object-contain -mr-36'
                />
                <img
                    src={planYourLessons} 
                    alt='planYourLessonsImg'
                    className=' object-contain'
                />
            </div>
            <div>
                <CTAButton active={true} linkto={"/signup"}>
                    Learn More
                </CTAButton>
            </div>
        </div>

        
    </div>
  )
}

export default LanguageSection