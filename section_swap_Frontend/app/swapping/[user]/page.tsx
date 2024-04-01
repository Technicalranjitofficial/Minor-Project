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

  const res = await fetch(`http://localhost:8000/swapping/swappingData?semester=${semester}&branch=${branch}&email=${session.user?.email}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },

    cache: 'no-cache',
    next:{
      tags:["swapping"]
    }

  });

  const data = await res.json();
  console.log(data);
  return (
    <div>
      <MainContent branchInfo={
        {
          branch: branch.toString(),
          semester: Number(semester)
        }
      } infoData={data.swappingInfo} user={data.getMyInfo} />
    </div>
  )
}

export default page