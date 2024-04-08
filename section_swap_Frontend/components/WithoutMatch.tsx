import { useAppDispatch, useAppSelector } from '@/Redux/hooks';
import { setIsUpdate, setOpenCreate } from '@/Redux/reducers/sectionswap';
import { deleteSwapUser } from '@/ServerActions/actions';
import { loadToast, updateToast } from '@/utils/tostify';
import React, { use } from 'react';

interface MatchDetailsProps {
  currentUserName: string;
  currentUserEmail: string;
  currentUserContact: string;
  currentAllotedSection: number;
  currentLookingForSections: number[];
  editLeft: number;
}

const SingleUser: React.FC<MatchDetailsProps> = () => {
  const { alloted,branch,contact,editLeft,email,id,lookingFor,matched,name,remoteUser,Semester } = useAppSelector((state) => state.sectionSwap.mydata);

  const dispatch =useAppDispatch();
  return (
    <div className="font-sans bg-gray-800 p-8  border-2 border-gray-700 rounded-[5px]">
      <p className="text-lg mb-4">Your matching profile:</p>

      <div className="bg-gray-800 border rounded p-4 mt-4">
        <h2 className="text-xl font-semibold mb-2">Your Details:</h2>
        <h3 className="text-lg mb-1"><span className='font-bold text-cyan-500'>Name:</span> {name}</h3>
        <h3 className="text-lg mb-1"><span className='font-bold text-cyan-500'>Branch:</span> {branch}</h3>
        <h3 className="text-lg mb-1"><span className='font-bold text-cyan-500'>Semester:</span> {Semester}</h3>
        <h3 className="text-lg mb-1"><span className='font-bold text-cyan-500'>Email:</span> {email}</h3>
        <h3 className="text-lg mb-1"><span className='font-bold text-cyan-500'>Contact:</span> {contact}</h3>
        <h3 className="text-lg  mb-2"><span className='font-bold text-cyan-500'>Alloted Section:</span> {alloted}</h3>
        <p className="text-lg"><span className='font-bold text-cyan-500'>Looking For Sections:</span> {lookingFor.join(", ")}</p>
      </div>
      <div className='mt-2 flex gap-2'>
        <button disabled={editLeft<=0}  onClick={()=>{
          dispatch(setIsUpdate(true))
          dispatch(setOpenCreate({
            open:true,
            editData:{
            semester:Semester,
              branch:branch,
              phone:contact,
              alloted:alloted,
              lookingFor:lookingFor,
              
            },
            isEdit:true

          
          }))
        }} className='bg-green-800 disabled:bg-gray-600 px-3 py-1 font-bold rounded-sm'>{editLeft<=0?"Contact us for Limit Increase": <p> Edit ( <span className='text-red-400'>{editLeft} Left</span> )</p>}</button>

        <button className='bg-red-800 disabled:bg-gray-600 px-3 py-1 font-bold rounded-sm' onClick={async()=>{
          const toastId = loadToast("Deleting your profile,please wait");
          const res= await deleteSwapUser(email);
          if(res.status===200){
            return updateToast(toastId,"Profile Delete Successfully","success");
          }
          return updateToast(toastId,res.message,"error");
        }}>Delete Profile</button>
      </div>
    </div>
  );
};

export default SingleUser;
