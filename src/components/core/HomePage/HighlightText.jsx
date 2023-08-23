//we have created this component so that we can reuse it whenever highlighted text is required
import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className='font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] ' >
    {" "}
        {text}
    </span>
  )
}
// background: #999DAA;
// background: #F1F2FF;
// background: #161D29;
// background: linear-gradient(117.82deg, #9CECFB -9.12%, #65C7F7 48.59%, #0052D4 106.3%);
// background: linear-gradient(118.19deg, #1FA2FF -3.62%, #12D8FA 50.44%, #A6FFCB 104.51%);
// background: #838894;
// background: #000814;
// background: #FFD60A;


export default HighlightText