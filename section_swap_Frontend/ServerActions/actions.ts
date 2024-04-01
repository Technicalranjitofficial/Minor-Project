"use server";

import { revalidateTag } from "next/cache";

// id String @id @default(auto()) @map("_id") @db.ObjectId
// name String
// branch String
// Semester Int
// alloted Int
// email String @unique
// lookingFor String[]
// matched Boolean
// contact String
// remoteUserId String?
// editLeft Int @default(3)
export const createUserProfile = async (user: {
  name: string;
  branch: string;
  Semester: number;
  alloted: number;
  lookingFor: number[];
  contact: string;
  email: string;
}) => {
  try {
    const res = await fetch(
      `${process.env.SERVER_URL}/swapping/createUserProfile`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(user),
      }
    );

    const data = await res.json();
    console.log(data);
    if (res.status === 201) {
      revalidateTag("swapping");
    }
    return res.status;
  } catch (error) {
    console.log(error);
    return 500;
  }
};

export const acceptSwapRequest = async (user: {
  currentUserEmail: string;
  remoteUserEmail: string;
}) => {
  try {
    const res = await fetch(`${process.env.SERVER_URL}/swapping/acceptSwap`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
    });

    const data = await res.json();
    console.log(data);
    if (res.status === 201) {
      revalidateTag("swapping");
    }
    return {
        status: res.status,
        message: res.statusText
    }
  } catch (error) {
    console.log(error);
    return {
        status: 500,
        message: "Internal Server Error"
    };
  }
};




export const updateSwapDetails = async (user: {
  alloted: number;
  lookingFor: number[];
  email: string;
}) => {
  try {
    const res = await fetch(
      `${process.env.SERVER_URL}/swapping/updateSwapDetails`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(user),
      }
    );

    const data = await res.json();
    console.log(data);
    if (res.status === 201) {
      revalidateTag("swapping");
    }
    return res.status;
  } catch (error) {
    console.log(error);
    return 500;
  }
};
