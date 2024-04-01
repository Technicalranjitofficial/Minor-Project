
"use client"
import { useAppSelector } from '@/Redux/hooks/index';
import React, { useState } from 'react'


import { AcademicAction } from "@/ServerActions/Academic";
import { usePathname } from "next/navigation";
import { semesterList, streamList } from '@/lib/helper';
import Link from 'next/link';
import { btn, headFont } from '@/lib/Fonts';



const BookButtonLayout = () => {


  const pathname = usePathname();

  return (
    <div className="flex flex-col    py-24 text-white">
    <div className="w-full    h-auto bg-transparent rounded-md flex  flex-col ">
          <div className="p-3  basis-1/5">
            <span
              style={headFont.style}
              className="font-bold text-cyan-400 md:text-xl"
            >
              CHOOSE BRANCH
            </span>
            <div className="grid grid-cols-4 py-3 font-bold gap-2 ">
              {streamList.map((st, sti) => {
                return (
                  <Link
                    style={btn.style}
                    // onClick={() => {
                    //   handleOnStreamSelect(st);
                    // }}
                    href={`/academic/Book/Content/${st.toLowerCase()}-${pathname.replace("academic/Book/Content/","").split("-")[1]}`}
                    key={sti}
                    className={`border py-3 text-center font-bold rounded-md text-sm md:text-lg
                    ${
                      pathname.includes(st.toLowerCase())
                        ? "bg-gradient-to-tl from-purple-500 via-indigo-700 to-slate-300"
                        : ""
                    }
                    hover:bg-gradient-to-bl hover:from-sky-100 hover:via-violet-900 hover:to-current`}
                  >
                    {st}
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
              CHOOSE BOOKS
            </span>
            <div className="grid grid-cols-4 py-3 font-bold gap-2">
              {semesterList.map((sv, si) => {
                return (
                  <Link
                  href={`/academic/Book/Content/${pathname.replace("academic/Book/Content/","").split("-")[0]}-${sv}`}
                    style={btn.style}
                    // onClick={async () => {
                    //   handleOnNoteSelect(sv, "Notes");
                    // }}
                    key={si}
                    className={`border py-3
                    ${pathname.includes(sv.toString()) ? "bg-gradient-to-tl from-purple-500 via-indigo-700 to-slate-300" : ""}
                    border-slate-700 font-bold text-center text-sm rounded-md md:text-lg
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

export default BookButtonLayout
