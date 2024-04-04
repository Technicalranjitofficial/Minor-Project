import { useAppSelector } from '@/Redux/hooks/index';
import React, { use } from 'react'
import { SelectGrade } from './SelectGrade';
import { CalculatorAlertBox } from './CalculatorAlertBox';

const DisplayCalInput = () => {

    const allData = useAppSelector((state) => state.CalculatorSlice.AllData);
  return (
    <div className=' w-full'>
        {allData.length>0 &&
        allData.map((v,i)=>{
            return <div key={i} className=' rounded-[5px] border border-gray-700 p-3 mt-3 flex flex-col gap-2'>
                <div className='flex items-center gap-5 flex-col  md:flex-row'>
                  <div className='w-full'>
                  <h1 className='text-sm font-semibold'>{v.name}</h1>
                  <h1 className='text-sm'>Credit: {v.Credit}</h1>

                  {v.SUBCODE==="EX20003" && <p className='text-red-500'>Note: Leave Blank if you don&apos;t have this subject.</p>}
                 
                    {/* <h1 className='text-lg font-semibold'>Subject Code: {v.SUBCODE}</h1>
                    <h1 className='text-lg font-semibold'>Subject Type: {v.Grade}</h1> */}
                   
                  </div>

                  <div className='w-full md:w-2/4'>
                   <SelectGrade index={i}/>
                  </div>
             
            </div>
            
            </div>

          }
        )}

        {/* {JSON.stringify(allData)} */}
      <div className='w-full mt-4 flex justify-center'>
      <CalculatorAlertBox/>
      </div>
    </div>
  )
}

export default DisplayCalInput