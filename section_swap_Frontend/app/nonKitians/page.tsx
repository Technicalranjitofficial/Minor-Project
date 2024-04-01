"use client"
import { signOut } from "next-auth/react";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center">
      <h1>
        You are not allowed to use this website. Only login with kiit mail
      </h1>
      <button
        className="bg-green-700 py-2 px-10 mt-10 rounded-md"
        onClick={() => signOut()}
      >
        Singout
      </button>
    </div>
  );
};

export default page;
