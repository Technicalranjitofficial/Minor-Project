"use client";
import { headFont, paragraph } from "@/lib/Fonts";
import { cn } from "@/lib/utils";
// import { ListItem } from "@mui/material";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@radix-ui/react-navigation-menu";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Router } from "next/router";
import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "./ui/menubar";



const emails = [
  "21053420@kiit.ac.in",
  "21053421@kiit.ac.in",
  "21053436@kiit.ac.in",
  "21053448@kiit.ac.in",
  "21053474@kiit.ac.in",
  "dranjitkumar16@gmail.com"
]

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default function Navbar() {
  const router = usePathname();
  const session = useSession();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleOnCloseMenu = () => {
    setMenuOpen(false);
    document.body.classList.remove("disable-scrollBar");
  };


  const [open, setOpen] = useState(false);

  const targetDate = '2024-02-24T21:00:00';

  return (
    <div
      style={paragraph.style}
      className="w-screen  text-lg md:text-base bg-[#121212] bg-main_body z-40  fixed left-0 top-0 h-auto"
    > 
    <div
    className={`w-full bg-gradient-to-r from-fuchsia-700 to-purple-800 flex md:justify-center  px-2 items-center relative py-3 ${
      !open && "hidden"
    } `}
  >
   
    <IoMdClose
      onClick={() => setOpen(false)}
      className={`absolute right-5 md:right-10 text-black font-bold cursor-pointer  outline-dotted`}
    />
  </div>
      <div className="bg-main_body px-3 lg:px-2  w-full flex justify-between items-center  mx-auto max-w-screen-2xl   py-2">
        <div
          className={`h-full border overflow-y-auto md:hidden top-0 ${
            menuOpen ? "left-0" : "-left-full"
          } p-5 duration-200 shadow-lg shadow-gray-700 border-gray-700 pr-4 flex-col flex w-2/3 bg-[#202020] z-40 fixed`}
        >
          <h1 className="font-bold text-2xl">
            <Link onClick={handleOnCloseMenu} href="/">
              {/* <span className="text-cyan-400 ">KIIT-</span>CONNECT */}
              <p className=" font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.indigo.100),theme(colors.sky.400),theme(colors.fuchsia.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient mb-2">
                KIIT-KAKSHA
              </p>
            </Link>
          </h1>
          <div className="w-full bg-gray-700  mt-5 mb-5 h-0.5"></div>

          <ul className="flex hover:bg-transparent text-sm font-bold flex-col h-auto  justify-evenly ">
            <Link onClick={handleOnCloseMenu} href="/">
              <li
                className={`border-b border-gray-700 py-2  ${
                  router === "/" ? "text-teal-500" : "text-slate-300"
                }`}
              >
                Home
              </li>
            </Link>

         
            <Link
              onClick={handleOnCloseMenu}
              href="/academic/PYQS"
            >
              <li
                className={`border-b border-gray-700 py-2  ${
                  router.includes("Book") ? "text-teal-500" : "text-slate-300"
                }`}
              >
                Notes/PYQS
              </li>
            </Link>
          

            <Link href="/swapping" onClick={handleOnCloseMenu}>
              <li
                className={`border-b border-gray-700 py-2  ${
                  router === "/swapping" ? "text-teal-500" : "text-slate-300"
                }`}
              >
                Section Swapping
               
              </li>
            </Link>

            <Link href="/calculator" onClick={handleOnCloseMenu}>
              <li
                className={`border-b border-gray-700 py-2  ${
                  router === "/calculator" ? "text-teal-500" : "text-slate-300"
                }`}
              >
                CGPA Calculator
               
              </li>
            </Link>
           
           
            <a
              target="_blank"
              href="https://github.com/technicalranjitofficial"
            >
              <li
                className={`border-b border-gray-700 py-2  ${"text-slate-300"}`}
              >
                Github
              </li>
            </a>
          </ul>
          {session.status == "unauthenticated" && (
            <Link
              style={headFont.style}
              onClick={handleOnCloseMenu}
              href="/auth"
              className=" btn-shadow py-2 mt-2 text-center rounded-md"
            >
              Login
            </Link>
          )}

        
          

          {session.status == "authenticated" && (
            <div className="flex flex-col mt-2 items-center justify-center w-full">
              <div className="flex flex-col items-center">
                <img
                  id="dropdownDelayButton"
                  data-dropdown-toggle="dropdownDelay"
                  data-dropdown-delay="500"
                  data-dropdown-trigger="hover"
                  src={session.data.user?.image ?? "/kiit.png"}
                  // src="/kiit.png"
                  className="rounded-full border-4 cursor-pointer group border-slate-500 shadow-xl  "
                  width={70}
                  height={70}
                  alt="image"
                />

                <h1 className="mt-5 font-bold text-sm">
                  {session.data.user?.name}
                  {/* Ranjit Das */}
                </h1>
              </div>
              <div className="w-full mt-5 bg-gray-700 h-1"></div>

              <button
                style={headFont.style}
                onClick={async() => {
                
                  signOut()
                }}
                className="text-xl w-full mt-10 btn-shadow py-2 text-center rounded-md"
              >
                Logout
              </button>
            </div>
          )}
        </div>
        <div>
          <h1 className="font-bold text-2xl md:text-3xl  z-50">
            <Link href="/">
              {/* <span className="text-cyan-400 ">KIIT-</span>CONNECT */}
              <p className="t font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,theme(colors.indigo.400),theme(colors.red.100),theme(colors.sky.400),theme(colors.pink.400),theme(colors.sky.400),theme(colors.indigo.100),theme(colors.indigo.400))] bg-[length:200%_auto] animate-gradient mb-1">
                KIIT-KAKSHA
              </p>
            </Link>
          </h1>
        </div>
        <div className="flex items-center duration-200 ">
          {menuOpen ? (
            <AiOutlineClose
              className="mr-1 md:hidden"
              size={25}
              onClick={() => {
                document.body.classList.remove("disable-scrollBar");

                setMenuOpen((prev) => !prev);
              }}
            />
          ) : (
            <AiOutlineMenu
              className="mr-1 md:hidden"
              size={25}
              onClick={() => {
                setMenuOpen((prev) => !prev);
                document.body.classList.add("disable-scrollBar");
              }}
            />
          )}

          <ul className=" justify-center items-center font-bold gap-5  text-slate-300 hidden md:flex">
            <li>
              <Link
                className={`${
                  router === "/" ? "text-teal-500" : "text-slate-300"
                } hover:text-teal-500`}
                href="/"
              >
                Home
              </Link>
            </li>

           

            <li>
              <Link
                className={`${
                  router.includes("PYQS") ? "text-teal-500" : "text-slate-300"
                } hover:text-teal-500`}
                href="/academic/PYQS"
              >
                Notes/PYQS
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  router.includes("swapping") ? "text-teal-500" : "text-slate-300"
                } hover:text-teal-500`}
                href="/swapping"
              >
                Swapping
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  router.includes("calculator") ? "text-teal-500" : "text-slate-300"
                } hover:text-teal-500`}
                href="/calculator"
              >
                CGPA Calculator
              </Link>
            </li>
           
           {session.data?.user &&  emails.includes(session.data?.user.email)&&
           
           <Link href={`/Admin`} className="text-slate-300 hover:text-teal-500">
            Admin Pannel
            </Link>
           }
        

           
           {session.status == "unauthenticated" && 
           <Link
            
            href="/auth"
            className=" bg-cyan-700 px-4 rounded-[5px] py-2 text-center "
          >
            Login
            </Link>

           }

            {session.status == "authenticated" && (
              <Menubar className="bg-transparent rounded-full  outline-none border-none">
              <MenubarMenu>
                <MenubarTrigger className=" bg-transparent  ">
                  <img
                    src={`${session.data?.user.image}`}
                    alt="avatar"
                    className="w-8 h-8 rounded-full"
                  />
                </MenubarTrigger>
                <MenubarContent className="bg-body border-gray-800">
                  <MenubarItem onClick={()=>signOut()}>
                   Logout
                  </MenubarItem>
                  
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
            )}

            {/* <li>{session.data?.user?.name}</li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}
