import FilterSemesters from '@/components/Admin/FilterSemesters';
import { SubjectsTable } from '@/components/Admin/SubjectsTable';
import { SwappingControlTable } from '@/components/Admin/SwappingControlTable';
import React from 'react'
type Props = {
  params: { id: string };
  searchParams: { branch: string, branchId: string };
}


export type Root = Root2

export interface Root2 {
  branch: B[],
  allSubjects: {
    id: string
    name: string
  }[]
}

export interface Semester {
  number: number
  id: string
}


export interface B {
  id: string
  name: string
  semesters?: Semester[]
}

export interface Branch {
  id: string
  name: string
}


const page = async (props: Props) => {

  const { branch, branchId } = props.searchParams;


  if (!branch) return <div>Something went wrong</div>
  const res = await fetch(`${process.env.SERVER_URL}/swapping/getOnlyBranches`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
    next: {
      tags: ['geOnlytBranches']
    }
  });

  

const semesters = await fetch(`${process.env.SERVER_URL}/swapping/getSemestersByBranchId?&branch=${branch??"CSE"}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  cache: "force-cache",
  next: {
    tags: ['getAllSemestersByBranchId']
  }
});




if (!res.ok || !semesters.ok) return <div>Something went wrong</div>
console.log(res);
const branches = await res.json();
const d = await semesters.json();

console.log(branches,d)

 
  return (
    <div>

      <SwappingControlTable currentBranch={branch} branches={branches} data={d} />


    
    </div>
  )
}

export default page