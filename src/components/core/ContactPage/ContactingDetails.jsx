import React from 'react'
import * as Icon1 from 'react-icons/bi'
import * as Icon3 from 'react-icons/hi2'
import * as  Icon2 from 'react-icons/io5'

const contactingDetailsData = [
    {
        icon: "HiChatBubbleLeftRight",
        heading: "Chat with us",
        description: "Our friendly team is here to help.",
        details: "info@studynotion.com",
      },
      {
        icon: "BiWorld",
        heading: "Visit us",
        description: "Come and say hello at our office HQ.",
        details:
          "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
      },
      {
        icon: "IoCall",
        heading: "Call us",
        description: "Mon - Fri From 8am to 5pm",
        details: "+123 456 7869",
      },
]

const ContactingDetails = () => {
    return (
        <div className='flex flex-col gap-6 rounded-xl bg-richblack-800 p-4 lg:p-6 text-white'>
            {contactingDetailsData.map((element, index) => {
                let Icon = Icon1[element.icon] ||  Icon2[element.icon] || Icon3[element.icon]
                return(
                    //for whole 
                    <div className='flex flex-col text-richblack-200 gap-[4px] p-3 '
                        key={index}
                    >
                        {/* icon and heading */}
                        <div className=' flex items-center gap-2 '>
                            <Icon size={28} />
                            <h1 className='  text-richblack-5 font-semibold text-lg '>
                                {element?.heading}
                            </h1>
                        </div>
                        <p className='text-sm '>
                            {element?.description}
                        </p>
                        <p className='font-semibold'>
                            {element?.details}
                        </p>
                        
                    </div>
                )
            })}
        </div>
      )
    }

export default ContactingDetails