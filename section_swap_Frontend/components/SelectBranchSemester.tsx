"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"


const branchList =[
    "CSE",
    "CSSE",
    "CSCE",
    "IT",

]

const semesterList =[
    1,2,3,4,5,6,7,8
]

export function SelectBranchSemester() {
    const [branch,setBranch]= React.useState("CSE");
    const [semester,setSemester]= React.useState("1");
  return (
    <Card className="w-[450px] rounded-[5px] bg-[#111111]">
      <CardHeader>
        <CardTitle>Choose Your Branch and Semester</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
         
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Branch</Label>
              <Select defaultValue={branch} onValueChange={(v)=>setBranch(v)}>
                <SelectTrigger  className="bg-[#111111]" id="branch">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-[#111111]" position="popper">
                 {
                        branchList.map((item,index)=>(
                            <SelectItem key={index} value={item}>{item}</SelectItem>
                        ))
                 }
                </SelectContent>
              </Select>
              
            </div>  <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Semester</Label>
              <Select defaultValue={semester} onValueChange={(v)=>setSemester(v)}>
              <SelectTrigger className="bg-[#111111]" id="semester">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-[#111111]" position="popper">
               {
                        semesterList.map((item,index)=>(
                            <SelectItem key={index} value={item.toString()}>{item}</SelectItem>
                        ))
               }
                </SelectContent>
              </Select>
              
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        {/* <Button variant="outline">Cancel</Button> */}
        <Link className="bg-green-700 px-2 py-1 rounded-[4px] hover:bg-green-800" href={`/swapping/user?branch=${branch}&semester=${semester}`}>Select</Link>
      </CardFooter>
    </Card>
  )
}
