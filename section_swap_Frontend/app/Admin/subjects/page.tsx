
import { getAllSubjects } from '@/ServerActions/admin';
import { SubjectsTable } from '@/components/Admin/SubjectsTable';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: 'All Subjects',
  description: 'All Subjects kiit connect',
}

const page = async() => {
    const data = await getAllSubjects();
    if(!data) return <div>Something went wrong</div>
    console.log(data);

  return (
    <div>
       <SubjectsTable data={data} isSemesterData={null}/>
    </div>
  )
}

export default page