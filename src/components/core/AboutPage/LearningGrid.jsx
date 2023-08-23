import React from 'react'
import HighlightText from '../HomePage/HighlightText';
import CTAButton from '../HomePage/Button'

const LearningGridArray = [
    {
      order: -1,
      heading: "World-Class Learning for",
      highlightText: "Anyone, Anywhere",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
      BtnText: "Learn More",
      BtnLink: "/",
    },
    {
      order: 1,
      heading: "Curriculum Based on Industry Needs",
      description:
        "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
      order: 2,
      heading: "Our Learning Methods",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 3,
      heading: "Certification",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 4,
      heading: `Rating "Auto-grading"`,
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
      order: 5,
      heading: "Ready to Work",
      description:
        "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
  ]; 

const LearningGrid = () => {
  return (
    <div className=' grid mx-auto w-[350px]  xl:w-fit grid-cols-1 xl:grid-cols-4 mb-12grid grid-col-1 lg:grid-cols-4 mb-10 p-5 lg:w-fit'>
        {
            LearningGridArray.map( (card, index) => {
                return(
                    <div
                    key={index}
                    // stretching of 1st box, alternate colors for alternate box, 1st box of 2nd col is blank
                    className={`${index === 0 && "xl:col-span-2 xl:h-[294px]"}                    
                    ${
                        card.order % 2 === 1 
                        ? "bg-richblack-700 h-[294px]" 
                        : card.order % 2 === 0
                        ? "bg-richblack-800 h-[294px]"
                        : "bg-transparent"
                    }
                    ${card.order === 3 && "lg:col-start-2"}
                    `}
                    >
                    {
                        card.order < 0
                        ? (
                            //only for 1st box
                            <div className=' lg:w-[90%] flex flex-col pb-10 xl:pb-0 gap-3'>
                                <div className=' text-4xl font-semibold'>
                                    {card.heading}
                                    <HighlightText text={card.highlightText}/>
                                </div>
                                <p className=' text-richblack-300 font-medium'>
                                    {card.description}
                                </p>
                                <div className=' w-fit mt-4'>
                                    <CTAButton active={true} link={card.BtnLink}>
                                        {card.BtnText}
                                    </CTAButton>
                                </div>

                            </div>
                        )
                        : (
                            //for rest of the boxes
                            <div className=' flex flex-col gap-8 p-8 '>
                                <h2 className=' text-richblack-5 text-lg'>
                                    {card.heading}
                                </h2>
                                <p className=' text-richblack-300 font-medium'>
                                    {card.description}
                                </p>
                            </div>
                        )
                    }
                    </div>
                )
            })
        }
    </div>
  )
}

export default LearningGrid