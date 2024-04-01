"use client";
import React, { useEffect, useState } from "react";

import {
  setAddPYQSDetails,
  setLoading,
  setMaterialType,
  setSemester,
  setStream,
} from "@/Redux/reducers/academicReducer";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks/index";

import PYQSTable from "./PYQSTable";
import NotesTable from "./NotesTable";
import { headFont } from "@/lib/Fonts";
import { useSearchParams } from "next/navigation";
import { AddPYQS } from "../AddPYQS";
import { useSession } from "next-auth/react";

export interface Root {
  id: string;
  name: string;
  semesters: Semester[];
}

export interface Semester {
  id: string;
  number: number;
  subjectId: string[];
  branchId: string;
  subjects: Subject[];
}

export interface Subject {
  name: string;
  SUBCODE?: string;
  id: string;
  folderId:string
  pyqs: Pyq[];
  notes: Notes[];
}
export interface Notes {
  id: string;
  name: string;
  mimeType: string;
  Notes: string;
}

export interface Pyq {
  id: string;
  name: string;
  year: string;
  type: string;
  mimeType: string;
  status: string;
  solutionUploadedBy: string;
  Question: string;
  solution?: string;
}
const Admins = ["21053420@kiit.ac.in", "connectkiit@gmail.com","21053436@kiit.ac.in"];
const Academic = ({
  data,
  stream,
  semeseter,
  type,
  branchId
}: {
  data: Root;
  semeseter: number;
  stream: string;
  type: string;
  branchId:string
}) => {
  const dispatch = useAppDispatch();
  const dataList = useAppSelector(
    (state) => state.AcademicSlice.MaterialDataList
  );

  // const router = usePathname();
const session = useSession();
  const searchParams = useSearchParams();
  console.log(type)

  useEffect(() => {
    dispatch(setSemester(semeseter));
    dispatch(setMaterialType(type));
    dispatch(setStream({
      stream:stream,
      id:branchId
    }));
    dispatch(setLoading(false));
  }, [data, dispatch, semeseter, stream]);

  const getStream = useAppSelector((state) => state.AcademicSlice.stream);
  const getSemes = useAppSelector((state) => state.AcademicSlice.semester);

  return (
    <>
      <div className="flex flex-col   text-white">
        <AddPYQS />
        {/* {loading && (
          <div className="w-full fixed   max-w-screen-2xl h-screen z-50 flex justify-center items-center">
            <GiCircularSaw className="text-cyan-500 animate-spin" size={50} />
          </div>
        )}

        {loading && <h1>Loading........</h1> } */}

        <div className="flex w-full pt-10 md:pt-0 pb-6 text-base mt-5 md:py-10 md:my-0 font-bold md:text-2xl justify-center items-center">
          <h1 style={headFont.style}>
            Showing Result for :{" "}
            <span className="pl-2">
              {type.toUpperCase()}-{getStream?.stream.toUpperCase()}- SEMESTER-
              {getSemes}
            </span>
          </h1>
        </div>
        {data?.semesters[0]?.subjects?.length > 0 &&
          data?.semesters[0].subjects
            .sort((a, b) =>
              searchParams.get("type")
                ? searchParams.get("type") === "notes"
                  ? b.notes.length - a.notes.length
                  : b.pyqs.length - a.pyqs.length
                : b.pyqs.length - a.pyqs.length
            )
            .map((val, index) => {
              return (
                <div key={index}>
                  <div
                    style={headFont.style}
                    className="py-5 relative rounded-md text-2xl  font-bold text-center border border-slate-500 text-gray-300"
                  >
                    {val.name}
                  
                  </div>

                  {type == "PYQS" && (
                    <PYQSTable
                    folderId={val.folderId}
                      subjectName={val.name}
                      subjectId={val.id}
                      pyqs={val.pyqs}
                    />
                  )}
                  {type == "Notes" && <NotesTable subjectName={val.name} notes={val.notes} />}
                </div>
              );
            })}
      </div>
    </>
  );
};

export default Academic;
