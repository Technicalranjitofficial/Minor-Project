"use client";

import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { setDisplayMessage, setMyData, setOpenCreate, setTableInfo } from "@/Redux/reducers/sectionswap";
import DisplayUser from "@/components/DisplayUser";
import Modal from "@/components/Modal";
import Navbar from "@/components/Navbar";
import BasicTable from "@/components/Table";
import SingleUser from "@/components/WithoutMatch";
import { TableInfo } from "@/interfaces";
// import SpanningTable from "@/components/Table";
import { fetchUser, getMyData } from "@/utils/functions";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Update from "./Update";

export default function MainContent({ infoData, user, branchInfo,semesterDetails }: {
  infoData: TableInfo[],
  user: TableInfo,
  branchInfo: {
    branch: string,
    semester: number
  },
  semesterDetails: {
    numberOfSectionForSwapping: number,
    isSwappingEnabled: boolean
  }
}) {
  const [data, setData] = useState([]);
  const message = useAppSelector((state) => state.sectionSwap.message);
  const openMessage = useAppSelector(
    (state) => state.sectionSwap.displayMessage
  );
  const session = useSession();
  const dispatch = useAppDispatch();
  const myData = useAppSelector((state) => state.sectionSwap.mydata);

  // console.log(data);

  const fetchData = async () => {
    const p: string = await fetchUser();
    setData(JSON.parse(p));
  };

  const p = async (email: string) => {
    var c: string = await getMyData(email);

    var decode: {
      success: boolean;
      user: TableInfo;
    } = JSON.parse(c);
    if (decode.success) {
      dispatch(setMyData(decode.user));
    }
  };

  useEffect(() => {
    // if (session.data?.user) {
    //   fetchData();
    //   p(`${session.data.user.email}`);
    // }
    // const interval = setInterval(fetchData,10000);
    // return()=>clearInterval(interval);
    // dispatch(setMyData(user));
    if (user) {
      console.log(user)
      dispatch(setMyData(user));
    }else{
      dispatch(setMyData({
       alloted:0,
       branch:"",
       contact:"",
       editLeft:0,
       email:"",
       id:"",
       lookingFor:[],
       matched:false,
       name:"",
       remoteUser:{
        email:"",
        id:"",
        name:""
       },
       Semester:0
       
      }))
    }
    dispatch(setTableInfo(infoData));
  }, [user, infoData]);

  return (
    <>
      <div className="">
        <Modal />
        <Update />

        <Snackbar open={openMessage} autoHideDuration={6000} onClose={() => dispatch(setDisplayMessage(false))}>
          <Alert severity={`${message.type as AlertColor}`} sx={{ width: "100%" }}>
            {JSON.stringify(message.msg)}
          </Alert>
        </Snackbar>

        {/* {JSON.stringify(data)}  
      
      */}

        {/* <div className="pt-28"></div> */}
        <div className="pt-28 w-full max-w-screen-2xl px-2 mx-auto ">
          {/* {myData.alloted!==0 && JSON.stringify(myData)}
        
        */}


          {!myData.id ? (
            <div className="font-sans  p-8 bg-slate-800 border-2 rounded-[5px]">
              <div>
                You have not created your match yet.{" "}
                <button
                  className="text-blue-500"
                  onClick={() => dispatch(setOpenCreate({
                    open: true,
                    data: {
                      semester: branchInfo.semester,
                      branch: branchInfo.branch,
                      sectionNumber:semesterDetails.numberOfSectionForSwapping
                    }
                  }))}
                >
                  Create Now
                </button>
              </div>
            </div>
          ) : myData.remoteUser ? (
            <DisplayUser
              currentAllotedSection={myData.alloted}
              currentLookingForSections={myData.lookingFor}

              matchedUserEmail={myData.remoteUser.email}
              matchedUserName={myData.remoteUser.name}


              senderName={myData.name}
            />
          ) : (
            <SingleUser
              currentUserName={myData.name}
              currentUserEmail={myData.email}
              currentUserContact={myData.contact}
              currentAllotedSection={myData.alloted}
              currentLookingForSections={myData.lookingFor}
              editLeft={myData.editLeft}
            />
          )}
          <h1 className="text-center font-bold py-5 text-red-400">Refresh your page to get fresh data <span className="text-cyan-600">({infoData.length} Users have Reuested)</span></h1>
          <h1 className="py-10 px-10 text-bold">
            {/* Hope You have found found this site helpfu.If you find helpful then please give your feedback here and stay connected we are bringing something cool soon. */}
           After matching with any user you won&apos;t be able to delete your profile.If you still want to unswap or remove your account send a mail to the support team
            {/* <a href="https://www.kiitconnect.live/feedback" target="_blank" className="text-green-400">Feedback Here</a> */}
            <a href="mailto:21053420@kiit.ac.in" target="_blank" className="text-green-400"> 21053420@kiit.ac.in</a>
          </h1>
          <BasicTable />
        </div>
      </div>
    </>
  );
}
