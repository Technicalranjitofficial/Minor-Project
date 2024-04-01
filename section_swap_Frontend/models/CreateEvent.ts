import { User } from "@/interfaces";
import { Schema } from "mongoose";

import mongoose from "mongoose";

const EventSchema = new Schema<User>({
    name:{type:String,required:true},
    alloted:{type:Number,required:true},
    email:{type:String,required:true},
    lookingFor:{type:[],required:true},
    matched:{type:Boolean,required:true},
    contact:{type:String,required:true},
    remoteUserId :{type:null||{} ,default:null},
    editLeft:{type:Number,default:3}

});

const Users = mongoose.models.User || mongoose.model<User & mongoose.Document>('User', EventSchema);


export default Users;