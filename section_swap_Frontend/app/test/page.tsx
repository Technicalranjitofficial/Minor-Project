
"use client"
import { loadToast } from '@/utils/tostify'
import { revalidateTag } from 'next/cache'
import React from 'react'

const page = () => {

  // revalidateTag("swapping");
  return (
    <div className='pt-28'>
      <button onClick={()=>loadToast("Show Message")}>Show Message</button>
    </div>
  )
}

export default page