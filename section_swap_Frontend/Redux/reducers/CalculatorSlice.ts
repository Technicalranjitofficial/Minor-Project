import { InitialState } from "@/interfaces/AcademicInterface";

import { createSlice } from "@reduxjs/toolkit";



export interface CalcData{
    name:string;
    Credit:number;
    Grade:string;
    SUBCODE:string;

}

export interface CalculatorState{
    loading:boolean;
    AllData:CalcData[];
    totalGrade:number;
}

export const initialState:CalculatorState={

    loading:true,
    AllData:[],
    totalGrade:0,

   
    
}

const CalculatorSlice = createSlice({
    name:"CalculatorSlice",
    initialState:initialState,
    reducers:{
       
        setAllData:(state,action)=>{
            state.AllData = action.payload;
        },
        setIndividualData:(state,action)=>{
            console.log("Actionp",action.payload);
            const { index, v } = action.payload;
          state.AllData[index]['Grade'] = v ;
            // state.AllData = p;
        },
        setTotalGrade:(state,action)=>{
            state.totalGrade = action.payload;
        }
        

    }

});


export const {setAllData,setIndividualData,setTotalGrade} = CalculatorSlice.actions;
export default CalculatorSlice.reducer;