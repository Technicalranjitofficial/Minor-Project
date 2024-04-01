import { PYQSData } from "@/interfaces/AcademicInterface";
import React, { useState } from "react";

import Link from "next/link";
import { paragraph } from "@/lib/Fonts";
import { useSession } from "next-auth/react";
import { AddSoultionDialog } from "../AddSolutionDialog";
import { useAppDispatch } from "@/Redux/hooks/index";
import {
  setAddSolutionDetails,
  setDeleteConfirm,
  setUpdatePYQSQuestion,
} from "@/Redux/reducers/academicReducer";
import { actionOnPyqsSolution } from "@/ServerActions/Notes/Notes";
import { DeleteConfirm } from "../DeleteConfiem";
import { UpdatePYQSQuestion } from "../UpdatePYQS";

export interface Pyq {
  id: string;
  name: string;
  year: string;
  type: string;
  mimeType: string;
  Question: string;
  solutionUploadedBy: string;
  status: string;
  solution?: string;
}

const Admins = ["21053420@kiit.ac.in", "connectkiit@gmail.com"];

// pyqs:{
//   id:string,
//   name:string,
//   year:string,
//   type:string
// }, upiId:string,subjectId:string
const secureId =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiMzQyMF9SQU5KSVQgS1VNQVIgREFTIiwiZW1haWwiOiIyMTA1MzQyMEBraWl0LmFjLmluIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xEYktTM0wyLTJodXprUkE2QTZRekVNNTJ2RUhrbXcwOXZFOHhyd0dUUGhZQT1zOTYtYyIsInN1YiI6IjEwOTgyNDUwNzgwNDY5MjI4NzI3NyIsImRhdGEiOnsiYWRkcmVzcyI6eyJhZGRyZXNzIjoiS2lpdCBSb2FkLFBhdGlhIEJodWJhbmVzaHdhciIsImNpdHkiOiJCaHViYW5lc3dhciIsInN0YXRlIjoiT2Rpc2hhIiwiY291bnRyeSI6IkluZGlhIiwicGluY29kZSI6Ijc1MTAyNCJ9LCJpZCI6IjY1YzNjZjZkNmE1MmNhZmQwNzMyYWNlMiIsInVzZXJuYW1lIjoiMjEwNTM0MjAiLCJGbmFtZSI6IlJhbmppdCIsIkxuYW1lIjoiRGFzIiwiZW1haWwiOiIyMTA1MzQyMEBraWl0LmFjLmluIiwiYWdlIjpudWxsLCJnZW5kZXIiOm51bGwsImRvYiI6IjIwMjQtMDItMTNUMTg6MzA6MDAuMDAwWiIsImJsb29kR3JvdXAiOm51bGwsImNvbnRhY3QiOiIwOTYzMTYyNzEwNCIsImlzQWN0aXZlIjp0cnVlLCJwcm9maWxlUGljIjpudWxsLCJyb2xlIjoiRE9DVE9SIiwidXNlcklkIjoiUFQtazl3eFgiLCJjcmVhdGVkQXQiOiIyMDI0LTAyLTA3VDE4OjQzOjU3LjcwMFoiLCJ1cGRhdGVkQXQiOiIyMDI0LTAyLTA3VDE4OjQ1OjEwLjgyNloiLCJkb2N0b3JQcm9maWxlIjp7ImlkIjoiNjVjM2NmNzk2YTUyY2FmZDA3MzJhY2UzIiwic3BlY2lhbGl6YXRpb25zIjpbInBvcCJdLCJkZXNjcmlwdGlvbiI6ImkgYW0gYSBkb2N0b3IiLCJmZWUiOm51bGx9fSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiZXhwIjoxNzA4ODU2MTUwLCJpYXQiOjE3MDc5OTIxNTB9.kO7rz-EWzb5yci7v5aD3GdPkFez7fJJvMe8XQSRNAHk";

function customSort(a: Pyq, b: Pyq): number {
  // First, sort by type
  if (
    a.type.toLowerCase().includes("mid") &&
    b.type.toLowerCase().includes("end")
  )
    return -1;
  if (
    a.type.toLowerCase().includes("end") &&
    b.type.toLowerCase().includes("mid")
  )
    return 1;

  // If types are equal or both are mid or end semester, sort by year
  const yearA: number = parseInt(a.year);
  const yearB: number = parseInt(b.year);
  return yearA - yearB;
}
const PYQSTable = ({
  pyqs,
  subjectId,
  subjectName,
  folderId,
}: {
  pyqs: Pyq[];
  subjectId: string;
  subjectName: string;
  folderId: string;
}) => {
  const dispatch = useAppDispatch();

  const session = useSession();

  return (
    <div className="overflow-x-auto  sm:-mx-6 lg:-mx-8 pb-5">
      <AddSoultionDialog />
      <UpdatePYQSQuestion />
      <DeleteConfirm />
      <div className="inline-block  min-w-full rounded-md py-2 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-md">
          <table className="min-w-full bg-[#131111] rounded-md  text-left text-sm font-light">
            <thead
              style={paragraph.style}
              className="border rounded-md   bg-gray-800  
                        
                        border-slate-700 font-base dark:border-neutral-500"
            >
              <tr>
                <th scope="col" className="px-6 py-4">
                  Year
                </th>
                <th scope="col" className="px-6 hidden md:block py-4">
                  Type
                </th>
                <th scope="col" className="px-6 py-4">
                  Question
                </th>
                <th scope="col" className="px-6 py-4">
                  Solution
                </th>
                {/* <th scope="col" className="px-6 py-4">
                  Status
                </th> */}


              </tr>
            </thead>
            {pyqs.sort(customSort).map((v, i) => {
              return (
                <tbody
                  key={i}
                  style={paragraph.style}
                  className="text-white text-base"
                >
                  <tr className="border border-slate-800 ">
                    <td className="whitespace-nowrap px-6 font-bold py-4 text-slate-300">
                      {v.year}
                    </td>
                    <td
                      className={`whitespace-nowrap px-6 text-gray-400 font-bold hidden md:block py-4`}
                    >
                      {v.type}
                    </td>
                    <td className={`whitespace-nowrap  px-6 py-4`}>


                      <Link
                        className={` font-bold ${"text-cyan-500"
                          }`}
                        href={`${`/academic/view/Kiitconnect-Ru6F3${i}${v.Question
                          }?secure=${session?.data?.authToken
                            ? session.data?.authToken
                            : secureId
                          }&year=${v.year}&name=${v.name}&subject=${subjectName}&sid=${i}`
                          }`}
                        target="_blank"
                      >

                        {v.name}
                      </Link>


                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-bold text-gray-400">
                      {v.solution == null ? (
                        "Not Available"
                      ) : (


                        <Link
                          href={`${`/academic/view/Kiitconnect-Ru6F3${i}${v.solution
                            }?secure=${session?.data?.authToken
                              ? session.data?.authToken
                              : secureId
                            }&year=${v.year}&name=${v.name}&subject=${subjectName}&sid=${i}`
                            } `}
                          target="_blank"
                          className={`${"text-cyan-500"
                            }`}
                        >
                          Solution{" "}

                        </Link>


                      )}
                    </td>

                    {/* <td className="whitespace-nowrap px-6 py-4 font-bold text-gray-400">
                      {v.status == "NO-SOLUTION" ? (
                        !session || !session?.data?.authToken ? (
                          <Link href="/auth/login">Login to Upload</Link>
                        ) : (
                          <span
                            className="border border-cyan-600 rounded-md cursor-pointer  px-2 py-1"
                            onClick={() =>
                              dispatch(
                                setAddSolutionDetails({
                                  pyqs: {
                                    id: v.id,
                                    name: v.name,
                                    year: v.year,
                                    type: v.type,
                                    Question: v.Question,
                                  },
                                  subjectId: subjectId,
                                  subjectName: subjectName,
                                  open: true,
                                  folderId: folderId
                                })
                              )
                            }
                          >
                            Add Solution
                          </span>
                        )
                      ) : v.status === "REVIEW" ? (
                        <span className=" font-bold text-sm py-1 rounded-sm text-yellow-500">
                          IN REVIEW
                        </span>
                      ) : (
                        // <button className='text-green-500'></button>
                        <span className="font-bold text-sm py-1 rounded-sm text-green-500">
                          APPROVED
                        </span>
                      )}
                    </td>

                    {session.data?.user.email &&
                      Admins.includes(session.data?.user.email) &&

                      <td>
                        {v.status === "VERIFIED" && "Update Sol"}
                      </td>

                    }

                    {session.data?.user.email &&
                      Admins.includes(session.data?.user.email) && (
                        <td>
                          <div className="flex flex-row gap-2">
                            <button
                              onClick={() =>
                                dispatch(
                                  setDeleteConfirm({
                                    open: true,
                                    questionId: v.id,
                                    subjectId: subjectId,
                                    event: "deletePYQS",
                                    pyqsName: `${subjectName}-${v.year}-${v.name}`,
                                  })
                                )
                              }
                              className="bg-red-700 text-white font-bold px-2"
                            >
                              Delete
                            </button>
                            {v.solution && (
                              <button
                                onClick={() =>
                                  dispatch(
                                    setDeleteConfirm({
                                      open: true,
                                      questionId: v.id,
                                      subjectId: subjectId,
                                      event: "deleteSolution",
                                      solutionId: v.solution,
                                      pyqsName: `${subjectName}-${v.year}-${v.name}`,
                                    })
                                  )
                                }
                                className="bg-yellow-700 text-white font-bold px-2"
                              >
                                Delete Sol
                              </button>
                            )}

                            {
                              (v.type.toUpperCase() !== v.type) && <button
                                className="border border-cyan-600 text-gray-200 font-bold px-2"
                                onClick={() =>
                                  dispatch(
                                    setUpdatePYQSQuestion({
                                      folderId: folderId,
                                      open: true,
                                      Type: v.type ? v.type.toUpperCase() : v.type,
                                      pyqsName: v.name,
                                      subjectId: subjectId,
                                      subjectName: subjectName,
                                      pyqId: v.id,
                                    })
                                  )
                                }
                              >
                                Update Question
                              </button>
                            }
                          </div>
                        </td> */}
                      {/* )} */}
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default PYQSTable;
