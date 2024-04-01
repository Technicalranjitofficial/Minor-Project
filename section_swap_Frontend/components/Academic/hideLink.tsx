"use client"
import React from 'react'

import {ImGithub} from "react-icons/im"

const HideLink = () => {
  return (
    <div className="w-12 h-12 right-2 items-center flex justify-center mt-2 bg-[#202020] rounded-md absolute">
  <a href="#" className=''><ImGithub size={30}/></a>
 </div>
  )
}

export default HideLink
