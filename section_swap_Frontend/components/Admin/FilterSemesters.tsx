"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { AssignSubject } from "./AssignSubject";

const subj = ["Eng", "Sci", "phy", "Maths"];

export type Root = Root2

export interface Root2 {
  branch: B[],
  allSubjects?: {
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
const mapBranchToNumber = {
  "CSE": 0,
  "CSCE": 1,
  "CSSE": 2,
  "IT": 3,

}




const FilterSemesters = ({
  data,
  event
}: {
  data: {
    semester?: number | string;
    semesterId?: string;
    branch?: string;
    branchId?: string;
    branchAndSemesterId?: Root
  };
  event:string
}) => {
  const router = useRouter();

  // const router = useRouter();

  const [page, setPage] = useState(1);
  const [subject, setSubject] = useState("Maths");

  const [semester, setSemester] = useState(data.semester?.toString());

  const [branch, setBranch] = useState(data.branch);

  console.log(data.branchAndSemesterId);

  const getIndex = ()=>{

    const findIdx = data.branchAndSemesterId?.branch.findIndex((f)=>f.name===branch);
    return findIdx;
  }

  return (
    <div>

      <Select
        defaultValue="PYQS"
        value={branch}
        onValueChange={(val) => {
          setBranch(val);

          router.push(`?branch=${val}&semester=${semester}`);
        }}
      >
        <SelectTrigger className="w-[180px] bg-body outline-none !ring-gray-900">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent className="bg-body">
          <SelectGroup>
            <SelectLabel>SELECT</SelectLabel>
            {data?.branchAndSemesterId?.branch.map((b) => {
              return <SelectItem key={b.id} value={b.name}>{b.name}</SelectItem>
            })}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select
        defaultValue="PYQS"
        value={semester}
        onValueChange={(val) => {
          setSemester(val);
          router.push(`?branch=${branch}&semester=${val}`);
        }}
      >
        <SelectTrigger className="w-[180px] bg-body outline-none !ring-gray-900">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent className="bg-body">
          <SelectGroup>
            <SelectLabel>SELECT</SelectLabel>
            {data?.branchAndSemesterId?.branch[getIndex()as number]?.semesters?.map((b) => {
              return <SelectItem key={b.id} value={event==="section"?b.id.toString():b.number.toString()}>Sem-{b.number}</SelectItem>
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
      {data && data.branchAndSemesterId && data.branchAndSemesterId.allSubjects && data.branchId && data.semesterId && <AssignSubject allSubjects={data.branchAndSemesterId.allSubjects} branchId={data.branchId} semesterId={data.semesterId} />
      }
    </div>
  );
};

export default FilterSemesters;
