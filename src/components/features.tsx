"use client"
import { motion } from "framer-motion"
interface FeatureProps {
    name: string
    text: string
}

function Features({name, text}: FeatureProps) {

  return (
    <motion.div 
    className="bg-black bg-opacity-80 p-10 rounded-3xl hover:translate-y-4 transition-all duration-300 ease-in-out"

>
      <h3 className="text-2xl text-[#00bfff] font-bold mb-4">{name}</h3>
      <p className="text-lg text-gray-300">{text}</p>
    </motion.div>
  )
}

export default Features
