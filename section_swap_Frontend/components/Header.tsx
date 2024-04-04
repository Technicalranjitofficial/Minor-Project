"use client"
import Link from 'next/link';
import React from 'react'

const Header2 = () => {


  return (
    <div className='w-full flex pt-20 md:pt-34 justify-evenly md:flex-row gap-3 flex-col px-2'>
        <div className='md:w-2/4 w-full flex items-start flex-col   justify-center'>
        <p className="text-2xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient py-6">WELCOME TO KIIT KAKSHA</p>

            <p className='text-base text-slate-300 font-bold'>Navigating B.Tech Success with Study Materials and Beyond.Navigating B.Tech Success with Study Materials and Beyond.</p>
            <div className="md:mt-16 flex mt-8 md:flex-row  gap-3 flex-col  w-full">
          

            <div className='flex gap-2'>
            <Link href="/academic/PYQS" className='bg-green-700 px-3 py-2 rounded-[5px]'>GET PYQS</Link>
             <Link href="/swapping" className='bg-cyan-700 px-3 py-2 rounded-[5px]'>Swapping</Link>

            </div>
              {/* {session.status=="authenticated" &&  
           <button disabled  style={btn.style} className="w-1/2 px-8 text-center btn-shadow py-3 md:py-3 md:text-lg rounded-lg font-bold text-base">You are Authenticated!!</button>} */}
            </div>
        </div>
        <div className=" w-full   duration-700 my-5 md:my-0 md:w-2/4">
          <img src="/kaksha.gif" className='cimage' alt="" />
        </div>
    </div>
  )
}

export default Header2