import React from 'react'

interface ReviewProps{
    text: string
    name: string
    designation: string
}

function Feedbacks(props : ReviewProps) {

  return (
    <div className="testimonial bg-[#022140] p-8 max-w-sm rounded-lg shadow-md text-left transition-transform duration-300 ease-in-out italic text-[#ecf0f1] hover:translate-y-[-10px] hover:shadow-lg">
        <p className="text-lg text-[#ecf0f1] mb-5">
            {props.text}
        </p>
        <h3 className="text-xl text-[#00BFFF] mb-1">- {props.name}</h3>
        <span className="text-base text-[#bdc3c7]">{props.designation}</span>
    </div>
  )
}

export default Feedbacks
