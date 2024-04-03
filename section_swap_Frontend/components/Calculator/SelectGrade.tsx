import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAppDispatch, useAppSelector } from "@/Redux/hooks/index";
import { setIndividualData } from "@/Redux/reducers/CalculatorSlice";
import { sgpa } from "@/utils/utils";

export function SelectGrade({index}:{index:number}) {
    const dispatch = useAppDispatch();
  return (
    <Select onValueChange={(v)=>{
       dispatch(setIndividualData({index,v}))
       console.log(v,index)
    }}>
      <SelectTrigger className="bg-body w-[100px] md:w-[200px]">
        <SelectValue placeholder="O" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Grade</SelectLabel>
          {/* <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem> */}

{Object.keys(sgpa).map((v,i)=>{
    return <SelectItem key={i} value={v}>{v}</SelectItem>

}       )}

        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
