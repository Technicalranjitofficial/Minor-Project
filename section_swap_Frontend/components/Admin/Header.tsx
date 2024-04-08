"use client";
import * as React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks/index";
import { toggleSidebar } from "@/Redux/reducers/adminReducers";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { signOut, useSession } from "next-auth/react";

const pages = [{
  name: "Home",
  link: "/"
},{
  name:"Notes/PYQS",
  link:"/academic/PYQS"
},{
  name:"Swapping",
  link:"/swapping"
}];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Header() {
    const dispatch = useAppDispatch();
    const sidebar = useAppSelector((state) => state.adminSlice.sidebar);
    const { t } = useTranslation();

    const session = useSession();

  return (
    <div className="w-full sticky top-0 bg-body text-gray-200 z-10 flex justify-between px-4 py-2 border-b border-b-gray-800  items-center">
      {
        <div
        className="flex items-center"
        >

{
    !sidebar && <div className="flex items-center gap-2" onClick={()=>dispatch(toggleSidebar(true))}>
       <Link href="/" className="main-logo flex shrink-0 items-center">
              {/* <img
                className="ml-[5px] w-8 flex-none"
                src="/assets/images/logo.svg"
                alt="logo"
              /> */}
              <span className="align-middle text-2xl font-semibold ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light lg:inline">
                {t("KAKSHA")}
              </span>
            </Link>
    <MenuIcon className="w-6 h-6 cursor-pointer" />
      </div>
}

      <ul>
        {pages.map((page, index) => (
          <li key={index} className="inline-block mx-4">
            <Link href={page.link}>{page.name}</Link>
          </li>
        ))}
      </ul>
            

            </div>
      }

      <div>
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
      </div>
    </div>
  );
}
export default Header;
