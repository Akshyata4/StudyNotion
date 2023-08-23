import React from 'react'
import IconBtn from './IconBtn'

export default function ConfirmationModal ({modalData})  {
  return (
    // for background
    <div className=' fixed inset-0 z-[1000] !mt-0 grid place-items-center bg-white bg-opacity-10 backdrop-blur-sm rounded-sm border border-richblack-300 p-5'>
        {/* for confirmation div */}
        <div className='w-11/12 max-w-[350px] border border-richblack-400 bg-richblack-800 p-6 rounded-lg'>
            <p className='text-2xl text-richblack-5 font-semibold'>
                {modalData.text1}
            </p>
            <p className=' mt-3 mb-5 leading-6 text-richblack-200'>
                {modalData.text2}
            </p>
            <div className='flex items-center gap-x-4'>
                <IconBtn
                    onClick={modalData?.btn1Handler}
                    text={modalData?.btn1Text}
                />
                <button className=' bg-richblack-200 font-semibold text-richblack-900 p-2 px-5 rounded-md'
                onClick={modalData?.btn2Handler}>
                    {modalData?.btn2Text}
                </button>
            </div>
        </div>
    </div>
  )
}
