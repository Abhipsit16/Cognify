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
    className={`w-96 h-48 rounded-md flex-col items-center bg-gradient-to-r 
        ${
            hovered? "from-red-500 to-yellow-500 via-orange-500"
            :"from-purple-700 to-blue-500 via-blue-700"
        } shadow-lg`}
    onMouseEnter={()=>sethovered(true)}
    onMouseLeave={()=>sethovered(false)}
    transition={{ duration: 3, delay:1, damping: 20}}
>
      <h3 className="text-4xl fond-bold text-center">{name}</h3>
      <p className="h-3/4 text-xl text-gray-100 text-center">{text}</p>
    </motion.div>
  )
}

export default Features
