import { BranchTable } from '@/components/Admin/BranchTable';
import FilterSemesters from '@/components/Admin/FilterSemesters';
import { SubjectsTable } from '@/components/Admin/SubjectsTable';
import React from 'react'
type Props = {
  params: { id: string };
  searchParams: { branch: string, semester: string };
}




export interface Branch {
  id: string
  name: string
}


const page = async (props: Props) => {



  const res = await fetch(`http://localhost:8000/notes/getAllBranches`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
    next: {
      tags: ['getBranches']
    }
  });




  if (!res.ok) return <div>Something went wrong</div>
  console.log(res);
  const data = await res.json();
  console.log(data);
  return (
    <div>

      <BranchTable data={data}
     />
    </div>
  )
}

export default page