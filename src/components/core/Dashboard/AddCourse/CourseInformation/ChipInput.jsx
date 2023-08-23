import React, { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md'
import { useSelector } from 'react-redux'

export default function ChipInput({
    //props
    label,
    name,
    placeholder,
    register,
    errors,
    setValue,
    getValues,
})  {
    const {editCourse, course} = useSelector((state) => state.course)

    //setting up state for managing chip's array
    const [chips, setChips] = useState([])

    useEffect(() => {
        if(editCourse){
            setChips(course?.tag)
        }
        register(name, {required: true, validate: (value) => value.length > 0 })
    }, [])

    useEffect(() => {
        setValue(name, chips)
    }, [chips])

    //function to handle user input when chips are added
    const handleKeyDown = (event) => {
        //check if user presses "Enter" or ","
        if(event.key === "Enter" || event.key === ","){
            //prevent the default behaviour of the event
            event.preventDefault()
            //get the input value and remove any leading/trailing spaces
            const chipValue = event.target.value.trim()
            //check if the input value exists and is not already in the chips array
            if(chipValue && !chips.includes(chipValue)){
                //add the chips to the array and clear the input
                const newChips = [...chips, chipValue]
                setChips(newChips)
                event.target.value = ""
            }
        }
    }

    //to handle deletion of a chip
    const handleDeleteChip = (chipIndex) => {
        //filter the chips array to remove the chip with the given index
        const newChips = chips.filter((_, index) => index !== chipIndex)
        setChips(newChips)
    }
  return (
    <div className='flex flex-col space-y-2'>
        {/* render the label for the input*/}
        <label className=' text-sm text-richblack-5'>
            {label}<sup className=' text-pink-200'>*</sup>
        </label>
        {/* render the chips and input */}
        <div className='flex w-full flex-wrap gap-y-2'>
            {/* map over chips array and render each chip */}
            {chips.map((chip, index) => (
                <div
                key={index}
                className='m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5'
                >
                    {chip}
                    {/* render the button to delete the chip */}
                    <button
                        type="button"
                        className='ml-2 focus:outline-none'
                    >
                        <MdClose className=' text-sm'/>
                    </button>
                </div>
            ))}
            {/* render the input for adding new chips */}
            <input
                id={name}
                name={name}
                type="text"
                placeholder={placeholder}
                onKeyDown={handleKeyDown}
                className="form-style w-full"
            />
        </div>
        {/* render an error message if the input is required and not filled */}
        {errors[name] && (
            <span className='ml-2 text-xs tracking-wide text-pink-200'>
                {label} is required
            </span>
        )}
    </div>
  )
}
