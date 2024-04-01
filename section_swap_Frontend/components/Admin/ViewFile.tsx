"use client"
import React, { useEffect, useRef } from 'react'

const ViewFile = ({id}:{id:string}) => {
    useEffect(()=>{
        document.body.style.overflowY="hidden"
    },[id])
   

  
  return (
    <div className="absolute top-0 left-0 w-screen h-screen z-50 overflow-y-hidden  ">
            <iframe sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation"
             src= {`https://drive.google.com/file/d/${id}/preview`} 
            // src={`/api/drive?url=`}
             className='w-full h-full min-h-screen' allow="autoplay"></iframe>
        </div>
  )
}

export default ViewFile