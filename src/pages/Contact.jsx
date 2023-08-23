import React from 'react'

import Footer from '../components/common/Footer'
import ContactingDetails from '../components/core/ContactPage/ContactingDetails'
import ContactPageForm from '../components/core/ContactPage/ContactPageForm'

const Contact = () => {
  return (
    <div className=' flex flex-col gap-10 text-white'>
        {/* 1st section */}
        <section className=' mx-auto w-11/12 max-w-maxContent flex gap-10 mt-20'>
            <div className='w-[40%] '>
                <ContactingDetails/>
            </div>
            
            <div className='w-[60%]'>
                <ContactPageForm/>
            </div>
        </section>

        {/* section 2 */}
        <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
            {/* Reviws from Other Learner */}
            <h1 className="text-center text-4xl font-semibold mt-8">
            Reviews from other learners
            </h1>
            {/* <ReviewSlider /> */}
      </div>

        {/* footer */}
        {/* for grey div */}
        <div className=' bg-richblack-800 text-richblack-100'>
            {/* FOR CONTENT */}
            <div className=' w-11/12 mx-auto max-w-maxContent flex flex-col gap-3 items-center '>
                <Footer/>
            </div>
        </div>
        
    </div>
  )
}

export default Contact