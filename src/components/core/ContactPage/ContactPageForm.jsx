import React from 'react'
import ContactUsForm from '../../common/ContactUsForm'

const ContactPageForm = () => {
  return (
    <div className=' border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex flex-col gap-3'>
      <h1 className="text-4xl leading-10 font-semibold text-richblack-5">
        Got a Idea? we&apos;ve got the skills. Let&apos;s team up
      </h1>
      <p className=' font-medium text-base'>
        Tell us more about yourself and what you&apos;re got in mind.
      </p>
      <div className='mt-4'>
        <ContactUsForm/>
      </div>
    </div>
  )
}

export default ContactPageForm