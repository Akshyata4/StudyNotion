import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
    {
        Logo: Logo1,
        Heading: "Leadership",
        Description: "Fully committed to the success company",
    },
    {
        Logo: Logo2,
        Heading: "Responsibility",
        Description: "Students will always be our top priority",
    },
    {
        Logo: Logo3,
        Heading: "Flexibility",
        Description: "The ability to switch is an important skills",
    },
    {
        Logo: Logo4,
        Heading: "Solve the problem",
        Description: "Code your way to a solution",
    },
]
const TimelineSection = () => {
  return (
    <div>
        <div className='flex mx-auto gap-32'>
            {/* left */}
            <div className='flex flex-col gap-5 '>
                {
                    timeline.map((element, index) => {
                        return(                            
                            <div className='flex gap-3 w-[140%]' key={index}> {/*whenever we use map funcn we must have to pass key so that it doesn't face any problem during production */}
                                {/* for logo */}
                                <div className='w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center'>
                                    <img src={element.Logo} alt='Logo'/>
                                </div>
                                {/* for left side data */}
                                <div className=' text-richblack-800'> 
                                    <h2 className='font-semibold text-[18px] '>{element.Heading}</h2>
                                    <p className='text-base'>{element.Description}</p>
                                </div>
                            </div>
                        )
                    })

                }
            </div>
            {/* right */}
            <div className='relative shadow-blue-200 ml'>
                <img src={timelineImage}
                    alt='timelineImage'
                    className='relative shadow-white h-fit'
                />
                {/* green box */}
                <div className='absolute bg-caribbeangreen-700 flex text-white uppercase py-10
                                left-[13%] translate-y-[-50%] w-[75%]'>
                    <div className='flex gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                        <p className=' text-3xl font-bold '>10</p>
                        <p className=' text-caribbeangreen-300 text-sm '>Years of Experience</p>
                    </div>
                    <div className='flex gap-5 items-center px-7'>
                        <p className=' text-3xl font-bold '>250</p>
                        <p className=' text-caribbeangreen-300 text-sm '>Type of Courses</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TimelineSection