
import { loadToast } from '@/utils/tostify'
import { revalidateTag } from 'next/cache'
import React from 'react'

const page = () => {

  revalidateTag("swapping");
  return (
    <div className='pt-28'>

    </div>
  )
}

export default page