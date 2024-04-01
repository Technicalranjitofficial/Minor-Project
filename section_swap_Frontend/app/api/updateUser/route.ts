import { User } from "@/interfaces";
import Users from "@/models/CreateEvent";
import connectDB from "@/utils/connect-db"
import { NextResponse } from "next/server";

export async function POST() {

    try {
        await connectDB();

        // const u = await Users.findOne({email:"22051348@kiit.ac.in"});
        // console.log(u);
        const user1 = await Users.findOneAndUpdate<User>({email:"22052356@kiit.ac.in"},{$set:{remoteUserId:null}});
        const user2 = await Users.findOneAndUpdate<User>({email:"22051450@kiit.ac.in"},{$set:{remoteUserId:null}});
        console.log(user1,user2);


       return NextResponse.json({user:user1,user2});
        
    } catch (error) {
       return NextResponse.error();
    }
   

   
    
  }