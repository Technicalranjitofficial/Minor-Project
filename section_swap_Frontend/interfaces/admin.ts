export interface InitialSatate {
    sidebar: boolean;
    subjectsList: [];
    facultiesList:[]
    confirmDelete:{
        open: false,
        questionId: null,
        subjectId: null,
        event: null,
        solutionId: null,
        pyqsName:string|null,
        multipleDatas:null|[],
        mutipleType:null|"PYQS"|"SOLUTION";
        mutipleDataName:null|string[];
        name:string|null;
        semesterId:null|string;
        branchId:null|string;
    },
    addNotesPYQS:{
        open:boolean;
        data:null|{
            id:string;
            name:string;
            folderId:string;
            type:"NOTES"| "PYQS";
            pyqs:[];
            notes:[];
        },
        loading:boolean;

    },
    updatePYQSQuestion:{
        open:boolean,
        subjectId:string|null,
        subjectName:string|null
        pyqsName:string|null,
        folderId:string|null,
        pyqId:string|null,
        Type:string|null
      }

    addPYQS:{
        open:boolean;
        data:null|{
            subjectId: null,
            subjectName: null,
            folderId: null,
        },
    },
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

      addNotes:{
        subjectId:string|null,
        open:boolean,
        folderId:string|null,
      },

      assignSubjectToFaculty:{
        open:boolean,
        subjectId:string|null,
        subjectName:string|null,
        sectionId:string|null,
        section:string|null,
        event:null|string,
      }
}
