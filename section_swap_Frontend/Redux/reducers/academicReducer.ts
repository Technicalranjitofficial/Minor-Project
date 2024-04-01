import { InitialState } from "@/interfaces/AcademicInterface";

import { createSlice } from "@reduxjs/toolkit";

export const initialState: InitialState = {
  stream: null,
  semester: 1,
  materialType: "Notes",
  MaterialDataList: [],
  NotificationReceived: {
    msg: "",
    open: false,
  },
  settingAccount: false,
  MainDataList: [],
  loading: true,
  loadingOther: false,
  message: {
    msg: "",
    type: "success",
    open: false,
  },

  addSolutionDetails: {
    pyqs: null,
    subjectId: null,
    open: false,
    subjectName: null,
    folderId: null,
  },

  rejectReason: {
    open: false,
    refId: null,
    // rejectReason:null,
    status: null,
    fileId: null,
  },

  addPYQSDetails: {
    open: false,
    subjectId: null,
    subjectName: null,
    folderId:null
  },

  deleteConfirm: {
    open: false,
    subjectId: null,
    questionId: null,
    pyqsName: null,
    event: null,
    solutionId: null,
  },

  updatePYQSQuestion: {
    folderId: null,
    open: false,
    pyqsName: null,
    subjectId: null,
    subjectName: null,
    pyqId:null,
    Type:null
  },

  suspiciousLoginDetected:{
    open:false,
    message:null,
    isExpired:false
  }
};

const AcademicSlice = createSlice({
  name: "AcademicSlice",
  initialState: initialState,
  reducers: {
    setStream: (state, action) => {
      state.stream = action.payload;
    },
    setSemester: (state, action) => {
      state.semester = action.payload;
    },
    setMaterialType: (state, action) => {
      state.materialType = action.payload;
    },
    setMainDataList: (state, action) => {
      console.log("getting data", action.payload);
      state.MainDataList = action.payload;
    },
    setMaterialDataList: (state, action) => {
      console.log("getting data", action.payload);
      state.MaterialDataList = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setLoadingOther: (state, action) => {
      state.loadingOther = action.payload;
    },

    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setSettingAccount: (state, action) => {
      state.settingAccount = action.payload;
    },

    setNotificationReceived: (state, action) => {
      state.NotificationReceived = action.payload;
    },

    setAddSolutionDetails: (state, action) => {
      state.addSolutionDetails = action.payload;
    },
    setRejectReason: (state, action) => {
      state.rejectReason = action.payload;
    },

    setAddPYQSDetails: (state, action) => {
      state.addPYQSDetails = action.payload;
    },
    setDeleteConfirm: (state, action) => {
      state.deleteConfirm = action.payload;
    },

    setUpdatePYQSQuestion:(state,action)=>{
        state.updatePYQSQuestion = action.payload;
    },

    setSuspiciousLoginDetected:(state,action)=>{
      state.suspiciousLoginDetected = action.payload;
    }

  },
});

export const {
  setSemester,
  setStream,
  setMaterialType,
  setMainDataList,
  setMaterialDataList,
  setLoading,
  setLoadingOther,
  setMessage,
  setSettingAccount,
  setNotificationReceived,
  setAddSolutionDetails,
  setRejectReason,
  setAddPYQSDetails,
  setDeleteConfirm,
  setUpdatePYQSQuestion,
  setSuspiciousLoginDetected
} = AcademicSlice.actions;
export default AcademicSlice.reducer;
