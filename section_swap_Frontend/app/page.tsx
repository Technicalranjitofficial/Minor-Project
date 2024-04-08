"use client"
import Header from "@/components/Header";
import { MontSerrat, headFont, paragraph, play } from "@/lib/Fonts";
import { signIn } from "next-auth/react";

export default function Page() {
  const handleSignIn = () => {
    signIn("google");
  };

  return (
  
    <Header/>
 
  );
}
