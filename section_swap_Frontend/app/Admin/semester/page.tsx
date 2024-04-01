import FilterSemesters from '@/components/Admin/FilterSemesters';
import { SubjectsTable } from '@/components/Admin/SubjectsTable';
import React from 'react'
type Props = {
  params: { id: string };
  searchParams: { branch: string, semester: string };
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

  const { branch, semester } = props.searchParams;

  console.log(branch, semester)

  if (!branch || !semester) return <div>Something went wrong</div>

  const semesterBranch = await fetch(`${process.env.SERVER_URL}/notes/getAllBranchesWithSemesters`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
    next: {
      tags: ['allBranchesWithSemesters']
    }
  });

  const res = await fetch(`${process.env.SERVER_URL}/notes/getSubjectsByBranchNameAndSemesterNumber?branchName=${branch}&semesterNumber=${semester}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache:"force-cache",
    next: {
      tags: ['getSubjectsByBranchNameAndSemesterNumber']

    }
  });

  if (!semesterBranch.ok) return <div>Something went wrong</div>
  const d: Root = await semesterBranch.json();



  if (!res.ok) return <div>Something went wrong</div>
  const data = await res.json();
  return (
    <div>

      <SubjectsTable data={data.semesters[0].subjects} isSemesterData={{
        branch: data.name,
        semester: data.semesters[0].number,
        branchId: data.id,
        semesterId: data.semesters[0].id,
        branchAndSemesterId: d

      }} />
    </div>
  )
}

export default page