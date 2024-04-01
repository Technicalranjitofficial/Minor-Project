import React from 'react'

const page = () => {
  return (
    <div className='w-screen h-screen max-w-screen-2xl p-5 flex-col flex justify-center items-center'>
      <h1 className='text-xl font-bold'>Thank you for using KIIT-CONNECT.Windows is closed now and it  will be open only at the time of Section Selection.You can give a feedback for better improvement <a target='_blank' className='text-blue-500' href="https://kiitconnect.live/feedback">Feedback</a></h1>
      <div className='mt-10'></div>

      <iframe className='md:w-1/2 w-full h-1/2' src="https://www.youtube.com/embed/ZubdnA0PssM" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
    </div>
  )
}

export default page
