"use server";

import { revalidateTag } from "next/cache";

export const getAllUsers = async (pageNo: string, pageSize: string) => {
  try {
    const res = await fetch(
      `${process.env.SERVER_URL}/admin/users?pageNo=${pageNo}&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "force-cache",
        next: {
          revalidate: 60 * 3,
        },
      }
    );
    const data = await res.json();
    if (res.status === 200) {
      return data;
    }
    return null;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

export const addBranches = async (name: string) => {
  try {
    const res = await fetch(`${process.env.SERVER_URL}/notes/addBranches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    });

    if (res.status === 201) {
      // return res.status;
      revalidateTag("getBranches");
      revalidateTag("allBranchesWithSemesters");
    }
    return {
      message: res.statusText,
      status: res.status,
    };
  } catch (error) {
    return {
      message: "Something went wrong",
      status: 500,
    };
  }
};

export const getAllPremiumUsers = async (pageNo: string, pageSize: string) => {
  try {
    const res = await fetch(
      `${process.env.SERVER_URL}/admin/getPremiumUsers?pageNo=${pageNo}&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "force-cache",
      }
    );
    const data = await res.json();
    if (res.status === 200) {
      return data;
    }
    return null;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

export const getAllSubjects = async () => {
  try {
    const res = await fetch(`${process.env.SERVER_URL}/notes/getAllSubjects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "force-cache",
      next: {
        tags: ["getAllSubjects"],
      },
    });

    const data = await res.json();
    if (res.status === 200) {
      return data;
    }

    return null;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

export const getNotesAndPYQS = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.SERVER_URL}/notes/getNotesAndPYQS/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "force-cache",
        next: {
          tags: ["getNotesAndPYQS"],
        },
      }
    );

    const data = await res.json();
    if (res.status === 200) {
      console.log(data);
      return data;
    }

    return null;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

export const deleteSubject = async (id: string) => {
  try {
    const res = await fetch(`${process.env.SERVER_URL}/notes/deleteSubject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subjectId: id }),
    });

    if (res.status === 201) {
      // return res.status;
      revalidateTag("getAllSubjects");
      revalidateTag("allBranchesWithSemesters");
    }
    return {
      message: res.statusText,
      status: res.status,
    };
  } catch (error) {
    return {
      message: "Something went wrong",
      status: 500,
    };
  }
};

export const deleteBranch = async (id: string) => {
  try {
    const res = await fetch(`${process.env.SERVER_URL}/notes/deleteBranch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ branchId: id }),
    });

    if (res.status === 201) {
      // return res.status;
      revalidateTag("getBranches");
      revalidateTag("allBranchesWithSemesters");
    }
    return {
      message: res.statusText,
      status: res.status,
    };
  } catch (error) {
    return {
      message: "Something went wrong",
      status: 500,
    };
  }
};

export const assignSubjectToSemester = async (
  subjectId: string,
  semesterId: string
) => {
  try {
    const res = await fetch(
      `${process.env.SERVER_URL}/notes/addSubjectToSemester`,
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

    console.log(res);
    if (res.status === 201) {
      revalidateTag("getSubjectsByBranchNameAndSemesterNumber");
    }

    return {
      message: res.statusText,
      status: res.status,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Something went wrong",
      status: 500,
    };
  }
};

export const removeSubjectFromSemester = async (
  subjectId: string,
  semesterId: string
) => {
  try {
    const res = await fetch(
      `${process.env.SERVER_URL}/notes/removeSubjectFromSemester`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subjectId, semesterId }),
      }
    );

    if (res.status === 201) {
      revalidateTag("getSubjectsByBranchNameAndSemesterNumber");
    }

    return {
      message: res.statusText,
      status: res.status,
    };
  } catch (error) {
    return {
      message: "Something went wrong",
      status: 500,
    };
  }
};

export const fetchFaculties = async () => {
  try {
    const res = await fetch(
      "${process.env.SERVER_URL}/faculties-review/getFacultiesIdsAndName",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "force-cache",
      }
    );

    console.log(res);
    if (res.status !== 200) throw new Error("Failed to fetch the data");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

export const assignSubjectToFacultyToDb = async (data: {
  subjectId: string;
  facultiesId: string[];
}) => {
  try {
    const res = await fetch(
      `${process.env.SERVER_URL}/faculties-review/assignSubjectToFaculty`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    console.log(res);
    if (res.status === 201) {
      // revalidateTag("getSubjectsByBranchNameAndSemesterNumber");
    }

    return {
      message: res.statusText,
      status: res.status,
    };
  } catch (error) {
    return {
      message: "Something went wrong",
      status: 500,
    };
  }
};

export const assignSectionToFacultyToDb = async (data: {
  sectionId: string;
  facultiesId: string[];
}) => {
  try {
    const res = await fetch(
      `${process.env.SERVER_URL}/faculties-review/assignSectionToFaculty`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    console.log(res);
    if (res.status === 201) {
      // revalidateTag("getSubjectsByBranchNameAndSemesterNumber");
    }

    return {
      message: res.statusText,
      status: res.status,
    };
  } catch (error) {
    return {
      message: "Something went wrong",
      status: 500,
    };
  }
};

export const setSectionSwappingEnabled = async (
  sectionId: string,
  event: boolean
) => {
  try {
    const res = await fetch(
      `${process.env.SERVER_URL}/swapping/setSectionSwappingEnabled`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sectionId: sectionId,
          event: event,
        }),
      }
    );

    console.log(res);
    if (res.status === 201) {
      // revalidateTag("getSubjectsByBranchNameAndSemesterNumber");
      revalidateTag("getAllSemestersByBranchId");
      revalidateTag("swapping")
    }

    return {
      message: res.statusText,
      status: res.status,
    };
  } catch (error) {
    return {
      message: "Something went wrong",
      status: 500,
    };
  }
};

export const updateNoOfSections =async (number: number, sectionId: string) => {
  try {
    const res = await fetch(
      `${process.env.SERVER_URL}/swapping/updateSectionNumber`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sectionId: sectionId,
          number: number,
        }),
      }
    );

    if (res.status === 201) {
      revalidateTag("getAllSemestersByBranchId");
      revalidateTag("swapping");

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
