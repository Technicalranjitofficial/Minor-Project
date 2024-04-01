import { InitialSatate } from "@/interfaces/admin";
import { createSlice } from "@reduxjs/toolkit";

export const initialState: InitialSatate = {
  sidebar: true,
facultiesList:[],
  subjectsList:[],
  addNotesPYQS:{
    open:false,
    data:null,
    loading:false,
  
  
  
  },
  confirmDelete:{
    open: false,
    questionId: null,
    subjectId: null,
    event: null,
    solutionId: null,
    pyqsName:null,
    multipleDatas:null,
    mutipleType:null,
    mutipleDataName:null,
    name:null,
    semesterId:null,
    branchId:null

  },
  updatePYQSQuestion:{
    folderId: null,
    open: false,
    pyqsName: null,
    subjectId: null,
    subjectName: null,
    pyqId:null,
    Type:null
  },
  addPYQS:{
    open:false,
    data:null,
  
  },
  addSolutionDetails: {
    pyqs: null,
    subjectId: null,
    open: false,
    subjectName: null,
    folderId: null,
  },
  addNotes:{
    folderId:null,
    open:false,
    subjectId:null
  },
  assignSubjectToFaculty:{
    open:false,
  subjectId:null,
  subjectName:null,
  sectionId:null,
  section:null,
  event:null,
  }
};

const AdminSlice = createSlice({
  name: "adminSlice",
  initialState: initialState,
  reducers: {
    toggleSidebar: (state, actions) => {
      state.sidebar = actions.payload;
    },
    addNotesPYQS: (state, actions) => {
      state.addNotesPYQS = actions.payload;
    },
    setAddPYQS: (state, actions) => {
      state.addPYQS = actions.payload;
    },

    setSubjectsList: (state, actions) => {
      state.subjectsList = actions.payload;
    },
    setConfirmDelete: (state, actions) => {
      state.confirmDelete = actions.payload;
    },
    setUpdatePYQSQuestion: (state, actions) => {
      state.updatePYQSQuestion = actions.payload;
    },
    setAddSolutionDetails: (state, action) => {
      state.addSolutionDetails = action.payload;
    },

    setAddNotesDetails:(state,action)=>{
      state.addNotes = action.payload;
    },
    setAssignSubjectToFaculty:(state,action)=>{
      state.assignSubjectToFaculty = action.payload;
    },
    setFacultiesList:(state,action)=>{

      state.facultiesList = action.payload;
    }

  },


});

export const { toggleSidebar,addNotesPYQS ,setAddPYQS,setConfirmDelete,setSubjectsList,setUpdatePYQSQuestion,setAddSolutionDetails, setAddNotesDetails,setAssignSubjectToFaculty,setFacultiesList} = AdminSlice.actions;
export default AdminSlice.reducer;
