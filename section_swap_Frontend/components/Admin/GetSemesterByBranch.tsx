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




const GetSemestersByBranch = ({
  branchesDetails,
  currentBranch
}: {
    branchesDetails: {
    id:string;
    name:string
  }[];
  currentBranch:string

}) => {
  const router = useRouter();

  // const router = useRouter();


  const [branch, setBranch] = useState(currentBranch??"CSE");

//   console.log(data.branchAndSemesterId);


  return (
    <div>

      <Select
        // defaultValue=""
        value={branch}
        onValueChange={(val) => {
          setBranch(val);

          router.push(`?branch=${val}`);
        }}
      >
        <SelectTrigger className="w-[180px] bg-body outline-none !ring-gray-900">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent className="bg-body">
          <SelectGroup>
            <SelectLabel>SELECT</SelectLabel>
            {branchesDetails?.map((b) => {
              return <SelectItem key={b.id} value={b.name}>{b.name}</SelectItem>
            })}
          </SelectGroup>
        </SelectContent>
      </Select>

    
      
    </div>
  );
};

export default GetSemestersByBranch;
