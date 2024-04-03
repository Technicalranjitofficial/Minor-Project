import { TableInfo, initialState } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";



const initialState:initialState={
    allotedSection:0,
    lookingFor:[],
    openCreate:{
        open:false,
        data:null,
        editData:null,
        isEdit:false,
    
        
    },
    updateConfirmOpen:false,
    confirmOpen:false,
    displayMessage:false,
    tableInfo:[],
    
    message:{
        msg:"",
        type:""
    },
    mydata:null||{
        id:"",
        alloted:0,
        contact:"",
        email:"",
        lookingFor:[],
        matched:false,
        name:"",
        
       remoteUser:{
        id:"",
        email:"",
        name:"",
    
       },
       editLeft:0,
       branch:"",
         Semester:0

    },
    loading:false,
    loadingIndex:-1,
    userContact:"",
    isUpdate:false,

}

const sectionSwapSlice = createSlice({
    name:"SectionSwapSlice",
    initialState,
    reducers:{
        setAllotedSection:(state,action)=>{
            state.mydata.alloted = action.payload;
        },
        pushLookingFor:(state,action)=>{
            if(state.mydata.lookingFor.includes(action.payload)){
                state.mydata.lookingFor = state.mydata.lookingFor.filter((val)=>val!==action.payload)
            }else{
                state.mydata.lookingFor = state.mydata.lookingFor.concat(action.payload);  
            }
        },

        updateAllotedSection:(state,action)=>{
            if(state?.openCreate?.editData?.alloted){
                state.openCreate.editData.alloted = action.payload;
            }
        },
        updateLookingFor:(state,action)=>{
            if(state?.openCreate?.editData?.lookingFor.includes(action.payload)){
                state.openCreate.editData.lookingFor = state.openCreate.editData.lookingFor.filter((val)=>val!==action.payload)
            }else{
               if(state.openCreate.editData){
                state.openCreate.editData.lookingFor = state.openCreate.editData.lookingFor.concat(action.payload); 
               }
            }
        },
        setConfirmOpen:(state,action)=>{
           state.confirmOpen = action.payload;
        },
        setUpdateConfirmOpen:(state,action)=>{
            state.updateConfirmOpen = action.payload;
        }
        ,
        setOpenCreate:(state,action)=>{
            state.openCreate =action.payload;
        },
        setDisplayMessage:(state,action)=>{
            state.displayMessage = action.payload;
        },
        setMessage:(state,action)=>{
            state.message = action.payload;
        },
        setMyData:(state,{payload}:{payload:TableInfo})=>{
            state.mydata = payload
        },
        

        setLoading:(state,action)=>{
            state.loading = action.payload;
        },
        setLoadingIndex:(state,action)=>{
            state.loadingIndex = action.payload;
        },

        setUserContact:(state,action)=>{
            state.mydata.contact = action.payload;
        },
        setIsUpdate:(state,action)=>{   
            state.isUpdate = action.payload;
        },
        setTableInfo:(state,action)=>{
            state.tableInfo = action.payload;
        }

    }
});


export const { pushLookingFor,setConfirmOpen,setAllotedSection,setOpenCreate,setDisplayMessage,setMessage,setMyData,setLoading,setLoadingIndex,setUserContact,setIsUpdate,setTableInfo,setUpdateConfirmOpen,updateAllotedSection,updateLookingFor} = sectionSwapSlice.actions;

export default sectionSwapSlice.reducer
