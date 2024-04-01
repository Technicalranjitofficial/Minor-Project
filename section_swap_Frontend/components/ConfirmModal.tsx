
"use client"
import { useAppDispatch, useAppSelector } from '@/Redux/hooks'
import { setConfirmOpen, setDisplayMessage, setMessage, setOpenCreate } from '@/Redux/reducers/sectionswap';
import { createUserProfile } from '@/ServerActions/actions';
import { handleOnConfirm } from '@/utils';
import { addUser, updateSections } from '@/utils/functions';
import { loadToast, updateToast } from '@/utils/tostify';
import { useSession } from 'next-auth/react';
import React, { use } from 'react'

const ConfirmModal = () => {
  const dispatch = useAppDispatch();
  const openConfirm = useAppSelector((state) => state.sectionSwap.confirmOpen);
  const openCreate = useAppSelector((state) => state.sectionSwap.openCreate);


  const session = useSession();
  const myData = useAppSelector((state) => state.sectionSwap.mydata);
  const isUpdate = useAppSelector((state) => state.sectionSwap.isUpdate);


  return (
    <div className={`w-screen ${!openConfirm && "hidden"}  flex items-center justify-center fixed flex-col left-0 right-0 top-0 h-screen bg-gray-900/90 p-2 md:p-3`}>
      <div className='w-full lg:w-2/5 h-auto  md:w-2/3 rounded-md bg-gray-800'>
        <div className='w-full flex items-center justify-center py-5'>
          <h1 className='text-base font-bold lg:text-2xl'>Are you sure want to continue?</h1>
        </div>
        <div className='p-5 justify-center lg:text-xl  text-sm md:text-base  flex flex-col gap-2'>
          <p><span className='font-bold text-cyan-400'>Branch</span> : {openCreate.data?.branch} </p>
          <p><span className='font-bold text-cyan-400'>Semester</span> : {openCreate.data?.semester} </p>
          <p><span className='font-bold text-cyan-400'>Alloted</span> : {myData?.alloted} </p>
          <p><span className='font-bold text-cyan-400'>looking For </span>: {myData?.lookingFor.join(",")}</p>
          <p><span className='font-bold text-cyan-400'>Requested by</span> :{session.data?.user?.name}</p>
          <p><span className='font-bold text-cyan-400'>Email</span> :{session.data?.user?.email}</p>
          <p><span className='font-bold text-cyan-400'>Contact</span> :{myData?.contact} (Don&apos;t worry your contact won&apos;t be available to others users, it is sent to the matched user)</p>
        </div>
        <div className='flex flex-row justify-around my-5'>
          <button onClick={() => dispatch(setConfirmOpen(false))} className='border font-bold text-red-400 hover:bg-red-700 hover:text-white border-gray-700 px-5 py-2 rounded-md'>Cancel</button>
          <button onClick={async () => {

            console.log("mydata", myData);

            if (!session.data?.user) {
              return;
            }

            // console.log("Response",res);


            if (isUpdate) {
              const res = await updateSections(session.data?.user?.email, myData.alloted, myData.lookingFor);
              if (res == true) {
                dispatch(setConfirmOpen(false))
                dispatch(setOpenCreate(false));
                dispatch(setMessage({ msg: "Updated Sucessfully! Please refresh the page", type: "success" }))
                dispatch(setDisplayMessage(true))
              } else {
                dispatch(setConfirmOpen(false))
                dispatch(setOpenCreate(false));
                dispatch(setMessage({ msg: "User might not available", type: "error" }))
                dispatch(setDisplayMessage(true))
              }
              return;
            } else {
              if (openCreate.data && session.data.user) {

                const toastId = loadToast("Creating Profile, Please wait");
                const res = await createUserProfile({
                  alloted: myData.alloted,
                  branch: openCreate.data.branch,
                  contact: myData.contact,
                  lookingFor: myData.lookingFor,
                  name: session.data.user.name!,
                  Semester: openCreate.data.semester,
                  email:session.data.user.email!
                });
                if(res===201){
                  dispatch(setConfirmOpen(false))
                  dispatch(setOpenCreate(false));
                  return updateToast(toastId,"Profile Created Successfully","success");
                }else if(res===409){
                  return updateToast(toastId,"Profile Already Exists","error");
                }
                return updateToast(toastId,"Error Occured","error");

              }
            }
            // if(res==true){
            //   dispatch(setConfirmOpen(false))
            //   dispatch(setOpenCreate(false));
            //   dispatch(setMessage({msg:"Created Sucessfully! Please refresh the page",type:"success"}))
            //   dispatch(setDisplayMessage(true))

            // }else{
            //   dispatch(setConfirmOpen(false))
            //   dispatch(setOpenCreate(false));
            //   dispatch(setMessage({msg:"User might not available",type:"error"}))
            //   dispatch(setDisplayMessage(true))
            // }
          }} className='border text-green-400
            font-bold border-gray-700 px-5 py-2 hover:bg-green-600 hover:text-white rounded-md'>Confirm</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
