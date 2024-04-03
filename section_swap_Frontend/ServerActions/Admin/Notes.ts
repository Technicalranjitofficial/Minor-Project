"use server";

import { deleteDriveFile, uploadSolutionFile } from "@/lib/drive";
// import axios from "";
import { revalidateTag } from "next/cache";

export const addSubjectToSemester = async (
  subjectId: string[],
  semesterId: string
) => {
  try {
    const res = await fetch(
      `${process.env.SERVER_URL}/notes/addmultiSubjectToSemester`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          subjectId: subjectId,
          semesterId: semesterId,
        }),
      }
    );
    console.log(res.status, res.statusText);
  } catch (error) {
    console.log(error);
  }
};

export const adminAddSolution = async (
  data: {
    questionId:string,
    subjectId: string;
    solution: string;
  },
) => {
  try {
   
    const res = await fetch(
      `${process.env.SERVER_URL}/notes/adminAddSolution`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          
        }),
      }
    );
    console.log(res);
    if (res.status === 201) {
      revalidateTag("getNotesAndPYQS");
    }
    return {
      status: res.status,
      message: res.statusText,
    };
  } catch (error) {
    console.log(error);
    // return 500;
    return {
      status: 500,
      message: "Check your internet connection or try again later",
    };

    // throw error;
  }
};

export const actionOnPyqsSolution = async (
  fileId: string,
  dto: {
    status: string;
    rejectedReason?: string;
    createdById: string;
  }
) => {
  try {
    if (dto.status === "REJECTED") {
      const status = await deleteDriveFile(fileId);
      console.log(status);
      if (status !== 204)
        return {
          statusText: "Error in deleting file",
          status: 500,
        };
    }
    const res = await fetch(
      `${process.env.SERVER_URL}/notes/ActionOnSolutionReview`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dto),
      }
    );
    // console.log(res);
    if (res.status === 201) {
      revalidateTag("pyqs");
      revalidateTag("allsubmission");
    }
    return {
      status: res.status,
      statusText: res.statusText,
    };
  } catch (error) {
    console.log(error);
    return {
      statusText: "Error in action on pyqs solution",
      status: 500,
    };
    // throw new Error("Error in action on pyqs solution");
  }
};

export const setPaiedToUser = async (refId: string) => {
  try {
    const res = await fetch(
      `${process.env.SERVER_URL}/notes/payToUser/${refId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // const data = await res.json();
    // console.log(data);
    if (res.status === 200) {
      revalidateTag("allsubmission");
    }
    return res.status;
  } catch (error) {
    console.log(error);
    return 500;

    // throw new Error("Error in setting paid to user");
  }
};

export const addPYQS = async (
  subjectId: string,
  data: {
    mimeType: string;
    year: string;
    type: string;
    name: string;
    Question: string;
    solution: string | null;
  }
) => {
  console.log(data);

  try {
    const res = await fetch(
      `${process.env.SERVER_URL}/notes/addPYQSToSubjectSingle`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pyqs: data,
          subjectId: subjectId,
        }),
      }
    );
    if (res.status === 201) {
      const data = await res.json();
      console.log(data);
      revalidateTag("getNotesAndPYQS");
      return {
        status: res.status,
        message: res.statusText,
        data: data,
      };
    }
    return {
      message: res.statusText,
      status: res.status,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Internal Server Error",
      status: 500,
    };
  }
};

export const updatePyqsQuestion = async (
  subjectId: string,
  PyqId: string,
  Question: string,
  Type: string
) => {
  try {
    const res = await fetch(
      `${process.env.SERVER_URL}/notes/updatePYQSQuestion`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subjectId: subjectId,
          pyqId: PyqId,
          Question: Question,
          Type: Type,
        }),
      }
    );
    if (res.status === 201) {
      revalidateTag("pyqs");
    }
    return {
      message: res.statusText,
      status: res.status,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Internal Server Error",
      status: 500,
    };
  }
};

export const deletePYQS = async (
  subjectId: string,
  pyqsId: string,
  solutionId?: string | null
) => {
  try {
    const res = await fetch(`${process.env.SERVER_URL}/notes/deletePYQS`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subjectId: subjectId,
        pyqsId: pyqsId,
        solutionId: solutionId ?? null,
      }),
    });
    if (res.status === 201) {
      revalidateTag("getNotesAndPYQS");
    }
    return {
      message: res.statusText,
      status: res.status,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Internal Server Error",
      status: 500,
    };
  }
};

export const deleteSolution = async (
  subjectId: string,
  pyqsId: string,
  solutionId: string
) => {
  try {
    // const status = await deleteDriveFile(solutionId);
    // if (status !== 204)
    //   return {
    //     message: "Error in deleting file",
    //     status: 500,
    //   };
    const res = await fetch(`${process.env.SERVER_URL}/notes/deleteSolution`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subjectId: subjectId,
        pyqsId: pyqsId,
        solutionId: solutionId,
      }),
    });
    if (res.status === 201) {
      revalidateTag("getNotesAndPYQS");
    }
    return {
      message: res.statusText,
      status: res.status,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Internal Server Error",
      status: 500,
    };
  }
};

export const deleteMultiplePYQS = async (data: {
  ids: string[];
  subjectId: string;
  type: string;
}) => {
  try {
    const res = await fetch(
      `${process.env.SERVER_URL}/notes/deleteMultiplePYQS`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (res.status === 201) {
      revalidateTag("getNotesAndPYQS");
    }
    return {
      message: res.statusText,
      status: res.status,
    };
  } catch (error) {
    return {
      message: "Internal Server Error",
      status: 500,
    };
  }

};


export const addNotes = async (data: {
  name: string;
  subjectId: string;
  note:string
}) => {
  try {
    const res = await fetch(
      `${process.env.SERVER_URL}/notes/adminAddQuestion`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (res.status === 201) {
      revalidateTag("getNotesAndPYQS");
    }
    return {
      message: res.statusText,
      status: res.status,
    };
  } catch (error) {
    return {
      message: "Internal Server Error",
      status: 500,
    };
  }

};


export const addSubject =async(data:{
  name:string,
  code?:string,
  credit?:string,
  folderId:string
})=>{
  try {
    const res = await fetch(`${process.env.SERVER_URL}/notes/addSubject`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    });

    if(res.status === 201){
      revalidateTag("getAllSubjects");
      revalidateTag("allBranchesWithSemesters");
    }
    return{
      message:res.statusText,
      status:res.status
    }
  } catch (error) {
    console.log(error);
    return{
      message:"Internal Server Error",
      status:500
    }
  }


}
