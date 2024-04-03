"use client"
import { useAppSelector } from '@/Redux/hooks/index'
import { CalculatorAlertBox } from '@/components/Calculator/CalculatorAlertBox'
import DisplayCalInput from '@/components/Calculator/DisplayCalInput'
import { Calculator } from '@/components/Calculator/calculator'
import React from 'react'

const page = () => {
    const allData = useAppSelector((state) => state.CalculatorSlice.AllData);
  return (
    <div className=' pt-24 flex flex-col gap-4 justify-center items-center w-full '>
        <div className='border border-gray-700 w-full p-4 rounded-md md:w-1/2 flex justify-center items-center '>
        <h1 className='font-bold text-cyan-500'>KIIT SGPA CALCULATOR</h1>
        </div>
        <div className=' border border-gray-700 w-full p-4 rounded-md md:w-1/2 flex justify-center items-center  '>

        <Calculator/>
        </div>
      {allData.length>0 &&   <div className=' border border-gray-700 w-full p-4 rounded-md md:w-1/2 flex justify-center items-center '>
        <DisplayCalInput/>
        </div>}
     
    </div>
  )
}

export default page