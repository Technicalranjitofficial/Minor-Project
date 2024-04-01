
"use client"
import { useAppDispatch, useAppSelector } from '@/Redux/hooks/index';
import React, { useEffect, useState } from 'react'

import { Bebas_Neue, Barlow_Condensed, Teko } from "next/font/google";
import { AcademicAction } from "@/ServerActions/Academic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { semesterList, streamList } from '@/lib/helper';
import Link from 'next/link';
import { setStream } from '@/Redux/reducers/academicReducer';


const headFont = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});
const paragraph = Barlow_Condensed({
  subsets: ["latin"],
  weight: "400",
});

const btn = Teko({
  subsets: ["latin"],
  weight: "400",
});


const GetButton = ({branches}:{branches:{
  id:string,
  name:string
}[]}) => {

  // const searchParams = useSearchParam();
  // console.log(searchParams);
  const searchParams = useSearchParams();
  console.log(searchParams.get("type"))
    ;


  const getStream = useAppSelector((state) => state.AcademicSlice.stream);
  const getSemes = useAppSelector((state) => state.AcademicSlice.semester);
  const loading = useAppSelector((state) => state.AcademicSlice.loading);
  const mainData = useAppSelector((state) => state.AcademicSlice.MainDataList);
  const type = useAppSelector((state) => state.AcademicSlice.materialType);
  const dispatch = useAppDispatch();
  // const [type, setType] = useState("Notes");

  useEffect(()=>{
    if(!getStream){
     dispatch(setStream({
        stream:branches[0].name.toLowerCase(),
        id:branches[0].id
      
     }))
    }
  },[branches])

  const pathname = usePathname();
  const router =
    console.log(pathname,getStream);
  return (
    <div className="flex flex-col  py-24 text-white">
      <div className="w-full    h-[30rem] bg-transparent rounded-md flex  flex-col ">
        <div className="p-3  basis-1/5">
          <span
            style={headFont.style}
            className="font-bold text-cyan-400 md:text-xl"
          >
            CHOOSE BRANCH
          </span>
          <div className="grid grid-cols-4 py-3 gap-2">
            {branches.map((st, sti) => {
              return (
                <Link
                  style={btn.style}
                  // onClick={() => {
                  //   handleOnStreamSelect(st);
                  // }}
                  href={`
                  /academic/PYQS/Content/${type}-${st.name.toLowerCase()}-${getSemes}?type=${searchParams.get("type") ?? 'notes'}&branchId=${st.id}`   
                 }
                  key={sti}
                  className={`border border-slate-700 py-3 text-center font-bold rounded-md text-sm md:text-lg
                    ${getStream?.stream == st.name.toLowerCase()
                      ? "bg-gradient-to-tl from-purple-500 via-indigo-700 to-slate-300"
                      : ""
                    }
                    hover:bg-gradient-to-bl hover:from-sky-100 hover:via-violet-900 hover:to-current`}
                >
                  {st.name}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="bg-transparent p-3 basis-2/5">
          <span
            style={headFont.style}
            className="font-bold text-cyan-400 md:text-xl"
          >
            CHOOSE PYQS
          </span>
          <div className="grid grid-cols-4 py-3 gap-2">
            {semesterList.map((sv, si) => {
              return (
                <Link
                  href={`/academic/PYQS/Content/PYQS-${getStream?.stream}-${sv}?type=pyqs&branchId=${getStream?.id}`}
                  style={btn.style}
                  // onClick={async () => {
                  //   handleOnNoteSelect(sv, "Notes");
                  // }}
                  key={si}
                  className={`border py-3
                    ${type == "PYQS" && pathname.includes(sv.toString()) ? "bg-gradient-to-tl from-purple-500 via-indigo-700 to-slate-300" : ""}
                    border-slate-700 font-bold text-center text-sm rounded-md md:text-lg
                    hover:bg-gradient-to-bl hover:from-sky-100 hover:via-violet-900 hover:to-current `}
                >
                  Semetser-{sv}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="bg-transparent rounded-md p-3 basis-2/5">
          <span
            style={headFont.style}
            className="font-bold text-cyan-400 md:text-xl"
          >
            CHOOSE NOTES
          </span>
          <div className="grid grid-cols-4 py-3 gap-2">
            {semesterList.map((sv, si) => {
              return (
                <Link
                  style={btn.style}
                  // onClick={() => handleOnNoteSelect(si, "Books")}
                  key={si}
                  href={`/academic/PYQS/Content/Notes-${getStream?.stream}-${sv}?type=notes&branchId=${getStream?.id}`}
                  className={`border py-3 rounded-md 
                    ${type == "Notes" && pathname.includes(sv.toString()) ? "bg-gradient-to-tl from-purple-500 via-indigo-700 to-slate-300" : ""}
                    border-slate-700 font-bold text-sm text-center md:text-lg
                    hover:bg-gradient-to-bl hover:from-sky-100 hover:via-violet-900 hover:to-current`}
                >
                  Semetser-{sv}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GetButton
