"use client"
import { useState } from "react"
import { motion } from "framer-motion"
interface FeatureProps {
    name: string
    text: string
}

function Features({name, text}: FeatureProps) {

  const [hovered, sethovered]=useState(false)
  return (
    <motion.div 
    className={`w-96 h-60 px-2 py-2 rounded-md flex-col items-center bg-gradient-to-r 
        ${
            hovered? "from-red-500 to-yellow-500 via-orange-500"
            :"from-purple-700 to-blue-500 via-blue-700"
        } shadow-lg`}
    onMouseEnter={()=>sethovered(true)}
    onMouseLeave={()=>sethovered(false)}
    transition={{ duration: 3, delay:1, damping: 20}}
>
      <h3 className={`h-1/2 text-4xl fond-bold text-center ${
        hovered? "text-black bg-white":"text-white bg-black"
      } rounded px-2 py-2 shadow-zinc-200`}>{name}</h3>
      <p className="h-1/2 text-xl text-gray-100 text-center">{text}</p>
    </motion.div>
  )
}

export default Features
