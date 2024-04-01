export interface streams {
  stream: "cse" | "csse" | "csce" | "it";
}
export interface InitialState {
  stream: null|{
    stream:"cse" | "csse" | "csce" | "it";
    id:string;
  };
  semester: number;
  materialType: string;
  MaterialDataList: [];
  MainDataList: [];
  loading: Boolean;
  NotificationReceived: {
    msg: string;
    open: boolean;
  };
  settingAccount: boolean;
  loadingOther: Boolean;
  message: {
    msg: string;
    type: string;
    open: boolean;
  };

  addSolutionDetails: {
    pyqs:null| {
      id: string;
      name: string;
      year: string;
      type: string;
      Question: string;
    };
    subjectId:null| string;
    subjectName:null| string;
    open:boolean;
    folderId:null| string;
  };


  rejectReason:{
    open:boolean;
    refId:string|null;
    status:string|null,
    fileId:string|null,

    // rejectReason:string|null
  },

  addPYQSDetails:{
    subjectId:null|string,
    open:boolean,
    subjectName:string|null,
    folderId:null| string;

  },

  deleteConfirm:{
    open:boolean,
    subjectId:string|null,
    questionId:string|null,
    pyqsName:string|null,
    event:string|null,
    solutionId:string|null
  
  }

  updatePYQSQuestion:{
    open:boolean,
    subjectId:string|null,
    subjectName:string|null
    pyqsName:string|null,
    folderId:string|null,
    pyqId:string|null,
    Type:string|null
  },

  suspiciousLoginDetected:{
    open:boolean,
    message:string|null,
    isExpired:boolean
  
  }
}

export interface MainData {
  name: string;
  pyqs: [];
}

export interface PYQSData {
  name: string;
  type: string;
  id: string;
  year: string;
  solution: string;
}

export interface BOOKData {
  name: string;
  id: string;
  img: string;
  author: string;
}

export interface BookInterface {
  subject: string;
  data: BOOKData;
}
