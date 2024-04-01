import mongoose from "mongoose";

export interface initialState{
    allotedSection:number,
    lookingFor:number[],
    openCreate:{
        open:boolean,
       data:null|{
        semester:number,
        branch:string
       },
       isEdit:boolean;
       editData:null|{
              semester:number,
              branch:string,
              phone:string,
              alloted:number,
              lookingFor:number[],

       }
    },
    confirmOpen:boolean,
    updateConfirmOpen:boolean,
    displayMessage:boolean
    message:{
        msg:string,
        type:string
    };
    mydata:TableInfo,
    loading:boolean,
    loadingIndex:number,
    userContact:string,
    isUpdate:boolean
    tableInfo:TableInfo[]
   
   
}

export interface User{
    name:string;
    email:string;
    alloted:number,
    lookingFor:number[];
    matched:Boolean,
    contact:string
    remoteUserId:any,
    editLeft:number,
    branch:string,
    Semester:number,
}


export interface remoteUserId{
    name:string,
    email:string,
    id:string,
 
}
export interface TableInfo{
    name:string;
    email:string;
    contact:string;
    alloted:number;
    lookingFor:number[];
    id:string,
    matched:Boolean,
    remoteUser:remoteUserId,
    editLeft:number
    branch:string,
    Semester:number,
}