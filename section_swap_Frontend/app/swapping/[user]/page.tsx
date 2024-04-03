import MainContent from '@/components/Content';
import { authOption } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import React from 'react'

import {redirect} from "next/navigation"


type Props = {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

const page = async (props: Props) => {

  console.log(props.searchParams.branch, props.searchParams.semester)

  const { branch, semester } = props.searchParams;
  const session = await getServerSession(authOption);
  if(!session) return redirect("/");
  console.log(branch,semester)
  if (!branch || !semester){
    console.log(branch,semester,"herre")
    throw new Error("Bad Request");
  }

  const res = await fetch(`${process.env.SERVER_URL}/swapping/swappingData?semester=${semester}&branch=${branch}&email=${session.user?.email}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },

    cache: 'force-cache',
    next:{
      tags:["swapping"]
    }

  });

  const data = await res.json();
  console.log(data);

  if(!data.semesterDetails.isSwappingEnabled) return <div className='pt-28'>
    <div className='w-full bg-cyan-700 text-white py-2 px-2 text-center font-bold text-xl'>
      <h1>Currently Section Swapping is Disabled for this Section</h1>
    </div>
  </div>
  return (
    <div>
      <MainContent semesterDetails={data.semesterDetails} branchInfo={
        {
          branch: branch.toString(),
          semester: Number(semester)
        }
      } infoData={data.swappingInfo} user={data.getMyInfo} />
    </div>
  )
}

export default page