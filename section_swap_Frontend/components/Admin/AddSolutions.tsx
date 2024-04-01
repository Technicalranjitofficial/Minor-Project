"use client";
import { setAddSolutionDetails } from "@/Redux/reducers/adminReducers";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks/index";
import { adminAddSolution } from "@/ServerActions/Admin/Notes";
import { uploadQuestion } from "@/lib/drive";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loadToast, updateToast } from "@/utils/tostify";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "react-toastify";
import { secureId } from "@/utils";
const fileTypes = ["PDF"];

export function AddSoultionDialog() {
  const [file, setFile] = useState<File | null>(null);
  const handleChange = (file: File) => {
    setFile(file);
  };

  const session = useSession();

  const dispatch = useAppDispatch();

  const solutionDetails = useAppSelector(
    (state) => state.adminSlice.addSolutionDetails
  );
  const handleChangeOpen = () => {
    dispatch(
      setAddSolutionDetails({
        pyqs: null,
        subjectId: null,
        open: false,
        folderId: null,
      })
    );
  };

  const ref = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [fileId, setFileId] = useState<string | null>(null);
  

  const handleOnSubmit = async (formData: FormData) => {
    // console.log(ref.current?.value, file, session.data?.id,solutionDetails.pyqs);

    // const f = formData.get("file") as File;
    if (
     
      !solutionDetails.pyqs ||
      !solutionDetails.subjectId ||
      //   !session.data?.id ||
      !fileId ||
      !solutionDetails.subjectName ||
      !solutionDetails.pyqs.Question ||
      !solutionDetails.folderId
    )
      return alert("someting is missing");

    // pyqs:{
    //   id:string,
    //   name:string,
    //   year:string,
    //   type:string
    // }, upiId:string,subjectId:string

    // formData.set("pyqs", JSON.stringify(solutionDetails.pyqs));
    // formData.set("upiId", ref.current?.value);
    // formData.set("userId", session.data.id);
    // formData.append("file", file);
    // formData.set("subjectId", solutionDetails.subjectId);

    // setIsUploading(true);
    const toastId = loadToast("Your solution is Uploading, Please wait");
    // console.log(formData.get('file'),formData.get("upiId"))
    const res = await adminAddSolution({
        questionId: solutionDetails.pyqs.id,
        subjectId: solutionDetails.subjectId,
        solution: fileId,
      },
    );

    if (res.status !== 201) {
      setIsUploading(false);
      return updateToast(
        toastId,
        res.message ?? "Server is Busy, Please try again later",
        "error"
      );
    }
    setIsUploading(false);
    dispatch(
      setAddSolutionDetails({
        pyqs: null,
        subjectId: null,
        subjectName: null,
        open: false,
      })
    );
    setFileId(null);
    updateToast(toastId, "Solution Uploaded Successfully", "success");
  };

  

  const handleOnUploadFile = async () => {
    // console.log("hewr", file);
    if (!file) return toast.error("Please select a file");
    if (!solutionDetails.folderId) return toast.error("Folder Id Empty");
    const formData = new FormData();
    formData.set("file", file);
    const toastId = loadToast("Uploading File");
    const res = await uploadQuestion(solutionDetails.folderId, formData);
    console.log(res);
    if (!res) return updateToast(toastId, "Error in uploading", "error");
    setFileId(res);
    return updateToast(toastId, "File Uploaded", "success");
  };

  return (
    <Dialog open={solutionDetails.open} onOpenChange={handleChangeOpen}>
      {/* <DialogTrigger  asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className="md:max-w-[425px] w-[100%]  bg-[#111111] text-gray-200">
        <form action={handleOnSubmit}>
          <DialogHeader>
            <DialogTitle className="text-md">
              {solutionDetails.subjectName}-{solutionDetails.pyqs?.name}-
              {solutionDetails.pyqs?.year}
            </DialogTitle>
            <DialogDescription>
              NOTE: Add Only Authentic Solution(Email will be Recorded)
            </DialogDescription>
          </DialogHeader>

          <div className="my-5">
            <FileUploader
              className="text-white w-full"
              color="white"

              handleChange={handleChange}
              name="file"
              types={fileTypes}
            />
          </div>

          {/* <DialogFooter>
            <button
              className="bg-green-800 hover:bg-green-900 py-1 px-2 text-white"
              type="button"
              
              onClick={handleOnUploadFile}
            >
              Upload
            </button> 
            <button
              className="bg-green-800 hover:bg-green-900 py-1 px-2 text-white"
              type="submit"
              disabled={isUploading}
              // onClick={handleOnSubmit}
            >
              Submit
            </button>
          </DialogFooter> */}

<div className="flex gap-2 justify-end items-center">
          {fileId ? (
            <div>
              <Link
                className="text-white  bg-yellow-800 px-3 py-[6px] rounded-sm"
                target="_blank"
                href={`${`/academic/view/Kiitconnect-Ru6F3${1}${fileId
                }?secure=${session?.data?.authToken
                  ? session.data?.authToken
                  : secureId
                }&year=${solutionDetails.pyqs?.year}&name=${solutionDetails.pyqs?.name}&subject=${solutionDetails.subjectName}&sid=${1}`
                }`}
              >
                Open Link
              </Link>
            </div>
          ) : (
            <div>
            <button
              className="bg-cyan-700 text-white px-3 py-1 rounded-sm"
              type="button"
              onClick={handleOnUploadFile}
            >
              Upload
            </button>
            </div>
          )}

          {
             <div>
            <button
              className="bg-green-700 text-white px-3  py-1 rounded-sm"
              type="submit"
         
            >
              Submit
            </button>
            </div>
          }
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
