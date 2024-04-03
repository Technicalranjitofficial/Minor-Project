"use client"
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react'

const Login = () => {
    const handleSignIn = () => {
        signIn("google");
      };

      const session  = useSession();
      if(session.data?.user) return redirect("/")
    
  return (
    <div className="w-full h-full text-white min-h-screen flex items-center justify-center bg-[#111111]">
    <div className="bg-gray-900 text-white p-8 rounded-lg shadow-md max-w-md w-full">
      <h1 className="text-xl md:text-2xl  font-bold text-center mb-6">
        You are Not Logged In. Please login to continue.
      </h1>
      <button
        className="bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 py-3 px-6 rounded-md text-white w-full"
        onClick={handleSignIn}
      >
        Login with Google
      </button>
    </div>
  </div>
  )
}

export default Login