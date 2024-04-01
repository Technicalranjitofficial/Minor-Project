"use client"
import { signIn } from "next-auth/react";

export default function Page() {
  const handleSignIn = () => {
    signIn("google");
  };

  return (
    <div className="w-full h-full text-white min-h-screen flex items-center justify-center bg-[#111111]">
    Home Page
    </div>
  );
}
