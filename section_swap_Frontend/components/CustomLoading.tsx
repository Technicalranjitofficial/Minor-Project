import React from 'react'

const CustomLoading = ({loadingMessage}:{loadingMessage:string}) => {
  return (
    <div className='  rounded-md justify-center items-center  h-screen flex '>
<div className='w-[30rem] flex justify-center items-center p-5 h-auto  rounded-md bg-transparent border border-gray-700'>
   <h1>Please wait, loading {loadingMessage}...</h1>
</div>
    </div>
  )
}

export default CustomLoading