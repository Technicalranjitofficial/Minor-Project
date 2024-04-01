import { PYQSData } from "@/interfaces/AcademicInterface";
import React from "react";

import Link from "next/link";
import { paragraph } from "@/lib/Fonts";
import { useSession } from "next-auth/react";
const secureId =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiMzQyMF9SQU5KSVQgS1VNQVIgREFTIiwiZW1haWwiOiIyMTA1MzQyMEBraWl0LmFjLmluIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xEYktTM0wyLTJodXprUkE2QTZRekVNNTJ2RUhrbXcwOXZFOHhyd0dUUGhZQT1zOTYtYyIsInN1YiI6IjEwOTgyNDUwNzgwNDY5MjI4NzI3NyIsImRhdGEiOnsiYWRkcmVzcyI6eyJhZGRyZXNzIjoiS2lpdCBSb2FkLFBhdGlhIEJodWJhbmVzaHdhciIsImNpdHkiOiJCaHViYW5lc3dhciIsInN0YXRlIjoiT2Rpc2hhIiwiY291bnRyeSI6IkluZGlhIiwicGluY29kZSI6Ijc1MTAyNCJ9LCJpZCI6IjY1YzNjZjZkNmE1MmNhZmQwNzMyYWNlMiIsInVzZXJuYW1lIjoiMjEwNTM0MjAiLCJGbmFtZSI6IlJhbmppdCIsIkxuYW1lIjoiRGFzIiwiZW1haWwiOiIyMTA1MzQyMEBraWl0LmFjLmluIiwiYWdlIjpudWxsLCJnZW5kZXIiOm51bGwsImRvYiI6IjIwMjQtMDItMTNUMTg6MzA6MDAuMDAwWiIsImJsb29kR3JvdXAiOm51bGwsImNvbnRhY3QiOiIwOTYzMTYyNzEwNCIsImlzQWN0aXZlIjp0cnVlLCJwcm9maWxlUGljIjpudWxsLCJyb2xlIjoiRE9DVE9SIiwidXNlcklkIjoiUFQtazl3eFgiLCJjcmVhdGVkQXQiOiIyMDI0LTAyLTA3VDE4OjQzOjU3LjcwMFoiLCJ1cGRhdGVkQXQiOiIyMDI0LTAyLTA3VDE4OjQ1OjEwLjgyNloiLCJkb2N0b3JQcm9maWxlIjp7ImlkIjoiNjVjM2NmNzk2YTUyY2FmZDA3MzJhY2UzIiwic3BlY2lhbGl6YXRpb25zIjpbInBvcCJdLCJkZXNjcmlwdGlvbiI6ImkgYW0gYSBkb2N0b3IiLCJmZWUiOm51bGx9fSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiZXhwIjoxNzA4ODU2MTUwLCJpYXQiOjE3MDc5OTIxNTB9.kO7rz-EWzb5yci7v5aD3GdPkFez7fJJvMe8XQSRNAHk";

export interface Notes {
  id: string;
  name: string;
  mimeType: string;
  Notes: string;
}

const NotesTable = ({ notes,subjectName }: { notes: Notes[],subjectName:string }) => {
  const session = useSession();
  return (
    <div className="overflow-x-auto  sm:-mx-6 lg:-mx-8 pb-5">
      <div className="inline-block  w-auto rounded-md py-2 sm:px-6 lg:px-8">
        {notes.map((v, i) => {
          return !v.id.includes("contribute") ? (
           
                <Link
                  target="_blank"
                  href={`${
                    `/academic/view/Kiitconnect-Ru6F3${i}${v.Notes}?secure=${
                          session?.data?.authToken
                            ? session.data?.authToken
                            : secureId
                        }&name=${v.name}&subject=${subjectName}&sid=${i}`
                  }`}
                  className="cursor-pointer py-3"
                >
                  <div
                    className={`${
                     "text-cyan-500"
                    }`}
                  >
                    <h1 style={paragraph.style}>
                      {v.name} 
                    </h1>
                  </div>
                </Link>
          
          ) : (
            <div className="w-full  bg-[#211E1E] text-cyan-300 text-base p-3 mt-5">
              <h1 style={paragraph.style} className="font-bold">
                Will be Updating Soon
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotesTable;
