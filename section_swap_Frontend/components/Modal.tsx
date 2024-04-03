"use client"
import { useAppDispatch, useAppSelector } from '@/Redux/hooks'
import { pushLookingFor, setAllotedSection, setConfirmOpen, setDisplayMessage, setMessage, setOpenCreate, setUserContact } from '@/Redux/reducers/sectionswap'
import { section } from '@/utils'
import React, { useRef } from 'react'
import ConfirmModal from './ConfirmModal'



const Modal = () => {

  const open = useAppSelector((state) => state.sectionSwap.openCreate);
  const dispatch = useAppDispatch();

  const mydata = useAppSelector((state) => state.sectionSwap.mydata);
  const isUpdate = useAppSelector((state) => state.sectionSwap.isUpdate);


  const p = useRef<HTMLInputElement>(null);

  return (
    <div className={`w-screen ${open.open && !open.isEdit ? "" : "hidden"} z-50  flex items-center justify-center fixed flex-col left-0 right-0 top-0 h-screen bg-gray-900/90 p-2 md:p-3`}>
      <ConfirmModal />
      <div className='py-5'>
        <button onClick={() => dispatch(setOpenCreate(false))} className='px-4 bg-red-600 z-50  py-1 rounded-md'>Close</button>
      </div>
      <div className='w-full h-full scrollbar-thin scrollbar-thumb-cyan-600 overflow-y-auto bg-black/60 p-2 md:p-5 lg:w-4/5 md:w-3/4'>
        <div className='flex py-10 justify-center bg-transparent '>
          <input disabled={open.isEdit} value={mydata?.contact} onChange={(e) => dispatch(setUserContact(e.target.value))} ref={p} type="text" className={`${isUpdate ? "bg-gray-500" : "bg-transparent"}  border  border-gray-700 py-2 px-10 text-center text-white rounded-[5px] `} placeholder='WhatsApp No(Visible only in mail)' />
        </div>
        <h1 className={`mt-2 ml-2  `}>Select Alloted Section</h1>
        <div className='grid grid-cols-4 lg:grid-cols-8 p-2 mt-3 gap-1 grid-flow-row'>
          {Array(open.data?.sectionNumber).fill(0).map((val, index) => {
            return <button disabled={mydata.lookingFor.includes(index+1)} key={index} onClick={() => dispatch(setAllotedSection(index + 1))} className={`bg-gray-900 ${mydata?.alloted === index + 1 && "bg-green-700"}  rounded-md  p-2 disabled:bg-gray-500`}>{index + 1}</button>
          })}
        </div>
        <h1 className='mt-2 ml-2'>Select Needed Section(Multi Select Available)</h1>
        <div className='grid grid-cols-4 p-2 mt-3 lg:grid-cols-8 gap-1 grid-flow-row'>
          {Array(open.data?.sectionNumber).fill(0).map((val, index) => {
            return <button disabled={mydata?.alloted == index + 1} key={index} onClick={() => dispatch(pushLookingFor(index + 1))} className={`bg-gray-900 disabled:bg-gray-600 ${mydata?.lookingFor.includes(index + 1) ? "bg-green-600" : ""}  rounded-md p-2`}>{index + 1}</button>
          })}
        </div>
        <div className='w-full my-10 flex justify-center items-center'>
          <button onClick={() => {
            if (mydata?.alloted == 0 || mydata?.lookingFor.length < 1 || p.current && p.current.value.length < 10) {
              dispatch(setMessage({ msg: "Please fill your details corretly", type: "warning" }));
              dispatch(setDisplayMessage(true));
              return;
            }
            dispatch(setUserContact(p.current?.value.toString()))
            dispatch(setConfirmOpen(true));
          }} className='border border-slate-800 bg-cyan-700 px-10 py-2 rounded-[5px] hover:bg-cyan-800'>{isUpdate ? "Update" : "Create"} </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
