import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div>
        &quot; We are passionate about revolutionizing the way we learn. Our<br/> innovation platform
        <HighlightText text={"combines technology"}/>.
        <span className=' text-brown-500'>
            {" "}
            expertise
        </span>
        , and community <br/> to create an
        <span className=' text-brown-500'>
        {" "}
            unparalleled educational experience.
        </span>
        &quot;
        <div className="h-[80%] "></div>
    </div>
  )
}

export default Quote