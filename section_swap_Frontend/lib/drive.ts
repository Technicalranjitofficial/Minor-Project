"use server";
import fs, { writeFile } from "fs";
import { drive } from "./connectionGDrive";
import { join } from "path";

// Replace with your own Google Drive credentials and API key
const downloadPermissions = [
  {
    type: "user",
    role: "writer",
    // copyRequiresWriterPermission: true,
    emailAddress: "dranjitkumar16@gmail.com"

  },
  {
    type: "user",
    role: "writer",
    emailAddress: "technicalranjit@gmail.com"

  },
 
];
export const uploadSolutionFile = async (
  folderId: string,
  formData: FormData
) => {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      return false;
    }
    // console.log(file.name, file.type);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // console.log(buffer);

    const path = join("/", "tmp", file.name);
    const f = writeFile(path, buffer, (d) => {
      console.log(d);
    });
    console.log(f, path);

    const fileStream = fs.createReadStream(path);

    if (!fileStream)
      return false

    // Define the permission settings for download access to selected individuals
   

    const driveResponse = await drive.files.create({
      requestBody: {
        name: file.name,
        mimeType: file.type,
        parents: [folderId],
        copyRequiresWriterPermission: true,

      },
      media: {
        mimeType: file.type,
        body: fileStream,
      },
    });

    if (!driveResponse.data.id || Number(driveResponse.data.size)===0)
      return false;

    await setPermissions(driveResponse.data.id, downloadPermissions);

    console.log("id", driveResponse.data);
    return driveResponse.data.id;
  } catch (error) {
    console.log(error);
    return false
  }
};

const setPermissions = async (fileId: string, permissions: any) => {
  try {
    for (const permission of permissions) {
      await drive.permissions.create({
        fileId: fileId,
        requestBody: permission,
        sendNotificationEmail: false,
      
      // transferOwnership: true,
        // transferOwnership: false,
      });
    }
  } catch (error) {
    await drive.files.delete({
      fileId: fileId,
    });

    console.log(error);

    throw new Error("Error in setting permissions");
  }
};

export const uploadQuestion = async (folderId: string, formData: FormData) => {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      return false;
    }
    // console.log(file.name, file.type);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // console.log(buffer);

    const path = join("/", "tmp", file.name);
    const f = writeFile(path, buffer, (d) => {
      console.log(d);
    });
    console.log(f, path);

    const fileStream = fs.createReadStream(path);

    const driveResponse = await drive.files.create({
      requestBody: {
        name: file.name,
        mimeType: file.type,
        parents: [folderId],
        copyRequiresWriterPermission: true,
      

      },
      media: {
        mimeType: file.type,
        body: fileStream,
      },
    });
    // fs.unlinkSync(path);
    if (!driveResponse.data.id)
    return false;
    console.log("id", driveResponse.data);
    await setPermissions(driveResponse.data.id, downloadPermissions);

    return driveResponse.data.id;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteDriveFile = async (fileId: string) => {
  try {
    const response = await drive.files.delete({
      fileId: fileId,
    });

    console.log(response.status);

    return response.status;
  } catch (error) {
    console.log(error);
    return 500;
  }
};


export const createFolder = async (folderName: string, parentFolderId: string) => {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: folderName,
        mimeType: "application/vnd.google-apps.folder",
        parents: [parentFolderId],
      },
    });

    if (!response.data.id) {
      console.log("Failed to create the folder.");
      return false;
    }
    return response.data.id;
  } catch (error) {
    console.log(error);
    return false;
  }
}