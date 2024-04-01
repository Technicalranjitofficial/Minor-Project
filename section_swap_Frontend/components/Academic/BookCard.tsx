"use client"
import { BOOKData, PYQSData } from "@/Interfaces/AcademicInterface";
import { btn, headFont, paragraph } from "@/lib/Fonts";
import { useSession } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";
import React from "react";



const secureId =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiMzQyMF9SQU5KSVQgS1VNQVIgREFTIiwiZW1haWwiOiIyMTA1MzQyMEBraWl0LmFjLmluIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xEYktTM0wyLTJodXprUkE2QTZRekVNNTJ2RUhrbXcwOXZFOHhyd0dUUGhZQT1zOTYtYyIsInN1YiI6IjEwOTgyNDUwNzgwNDY5MjI4NzI3NyIsImRhdGEiOnsiYWRkcmVzcyI6eyJhZGRyZXNzIjoiS2lpdCBSb2FkLFBhdGlhIEJodWJhbmVzaHdhciIsImNpdHkiOiJCaHViYW5lc3dhciIsInN0YXRlIjoiT2Rpc2hhIiwiY291bnRyeSI6IkluZGlhIiwicGluY29kZSI6Ijc1MTAyNCJ9LCJpZCI6IjY1YzNjZjZkNmE1MmNhZmQwNzMyYWNlMiIsInVzZXJuYW1lIjoiMjEwNTM0MjAiLCJGbmFtZSI6IlJhbmppdCIsIkxuYW1lIjoiRGFzIiwiZW1haWwiOiIyMTA1MzQyMEBraWl0LmFjLmluIiwiYWdlIjpudWxsLCJnZW5kZXIiOm51bGwsImRvYiI6IjIwMjQtMDItMTNUMTg6MzA6MDAuMDAwWiIsImJsb29kR3JvdXAiOm51bGwsImNvbnRhY3QiOiIwOTYzMTYyNzEwNCIsImlzQWN0aXZlIjp0cnVlLCJwcm9maWxlUGljIjpudWxsLCJyb2xlIjoiRE9DVE9SIiwidXNlcklkIjoiUFQtazl3eFgiLCJjcmVhdGVkQXQiOiIyMDI0LTAyLTA3VDE4OjQzOjU3LjcwMFoiLCJ1cGRhdGVkQXQiOiIyMDI0LTAyLTA3VDE4OjQ1OjEwLjgyNloiLCJkb2N0b3JQcm9maWxlIjp7ImlkIjoiNjVjM2NmNzk2YTUyY2FmZDA3MzJhY2UzIiwic3BlY2lhbGl6YXRpb25zIjpbInBvcCJdLCJkZXNjcmlwdGlvbiI6ImkgYW0gYSBkb2N0b3IiLCJmZWUiOm51bGx9fSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiZXhwIjoxNzA4ODU2MTUwLCJpYXQiOjE3MDc5OTIxNTB9.kO7rz-EWzb5yci7v5aD3GdPkFez7fJJvMe8XQSRNAHk";




const BookCard = ({ books,name }:{books:BOOKData,name:string}) => {
  const session = useSession();
  // console.log(books)
  return (
    <Link
    target="_blank"
      href={`/academic/view/Kiitconnect-Ru6F3${20}${
        books.id
      }?secure=${
        session?.data?.authToken
          ? session.data?.authToken
          : secureId
      }&sid=${20}`}
   
      className="hover:translate-y-1 cursor-pointer "
    >
      <div className="overflow-hidden group rounded-md min-h-full  bg-slate-900 justify-center">
        <div className=" md:h-96 h-64 relative">
          <Image
            src={books.img}
            layout="fill"
            loading="lazy"
            // quality={80}
            // objectFit="cover"
            alt="image"
            className="rounded-md opacity-80"
          />
          <div className="absolute text-green-400 px-2 py-2 rounded-sm font-bold bg-gray-900 w-auto ">
            <p className="text-lg" style={btn.style}>{name}</p>
          </div>
        </div>
        <h1 style={headFont.style} className=" text-slate-300 text-lg md:text-2xl line-clamp-2 mt-2 
        pl-2 font-bold pt-2 font-Roboto">
          {books.name}
        </h1>
        <p style={paragraph.style} className="items-center p-2  mt-1 text-sm text-slate-400 font-bold">
          {books.author}
        </p>
       
        <div className="mb-4"></div>
      </div>
    </Link>
  );
};

export default BookCard;
