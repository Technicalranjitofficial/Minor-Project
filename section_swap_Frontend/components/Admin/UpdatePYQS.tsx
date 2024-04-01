"use client";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks/index";

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

import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
const fileTypes = ["PDF"];

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";




import Link from "next/link";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import { loadToast, updateToast } from "@/utils/tostify";
import { updatePyqsQuestion } from "@/ServerActions/Admin/Notes";
import { uploadQuestion } from "@/lib/drive";
import { setUpdatePYQSQuestion } from "@/Redux/reducers/adminReducers";

const formSchema = z.object({
  file: z.any(),
  type: z.string({
    required_error: "Please select type",
  }),
  year: z.string({
    required_error: "Please select type",
  }),
  name: z.string({
    required_error: "Please select type",
  }),
});

const type = ["MID SEMESTER", "END SEMESTER", "QUESTION BANK"];

const Year = [
  "-",
  "2011",
  "2012",
  "2013",
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
];

const secureId =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiMzQyMF9SQU5KSVQgS1VNQVIgREFTIiwiZW1haWwiOiIyMTA1MzQyMEBraWl0LmFjLmluIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xEYktTM0wyLTJodXprUkE2QTZRekVNNTJ2RUhrbXcwOXZFOHhyd0dUUGhZQT1zOTYtYyIsInN1YiI6IjEwOTgyNDUwNzgwNDY5MjI4NzI3NyIsImRhdGEiOnsiYWRkcmVzcyI6eyJhZGRyZXNzIjoiS2lpdCBSb2FkLFBhdGlhIEJodWJhbmVzaHdhciIsImNpdHkiOiJCaHViYW5lc3dhciIsInN0YXRlIjoiT2Rpc2hhIiwiY291bnRyeSI6IkluZGlhIiwicGluY29kZSI6Ijc1MTAyNCJ9LCJpZCI6IjY1YzNjZjZkNmE1MmNhZmQwNzMyYWNlMiIsInVzZXJuYW1lIjoiMjEwNTM0MjAiLCJGbmFtZSI6IlJhbmppdCIsIkxuYW1lIjoiRGFzIiwiZW1haWwiOiIyMTA1MzQyMEBraWl0LmFjLmluIiwiYWdlIjpudWxsLCJnZW5kZXIiOm51bGwsImRvYiI6IjIwMjQtMDItMTNUMTg6MzA6MDAuMDAwWiIsImJsb29kR3JvdXAiOm51bGwsImNvbnRhY3QiOiIwOTYzMTYyNzEwNCIsImlzQWN0aXZlIjp0cnVlLCJwcm9maWxlUGljIjpudWxsLCJyb2xlIjoiRE9DVE9SIiwidXNlcklkIjoiUFQtazl3eFgiLCJjcmVhdGVkQXQiOiIyMDI0LTAyLTA3VDE4OjQzOjU3LjcwMFoiLCJ1cGRhdGVkQXQiOiIyMDI0LTAyLTA3VDE4OjQ1OjEwLjgyNloiLCJkb2N0b3JQcm9maWxlIjp7ImlkIjoiNjVjM2NmNzk2YTUyY2FmZDA3MzJhY2UzIiwic3BlY2lhbGl6YXRpb25zIjpbInBvcCJdLCJkZXNjcmlwdGlvbiI6ImkgYW0gYSBkb2N0b3IiLCJmZWUiOm51bGx9fSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiZXhwIjoxNzA4ODU2MTUwLCJpYXQiOjE3MDc5OTIxNTB9.kO7rz-EWzb5yci7v5aD3GdPkFez7fJJvMe8XQSRNAHk";

const name = [
  "Spring Mid Sem",
  "Autumn Mid Sem",
  "MakeUp Mid Sem",
  "Autumn End Sem",
  "Spring End Sem",
  "MakeUp End Sem",
  "Mid Sem",
  "Supplementary",
  "Question Bank-1",
  "Question Bank-2",
  "Question Bank-3",
  "Question Bank-4",
  "Question Bank-5",
];

export function UpdatePYQSQuestion() {
  const [file, setFile] = useState<File | null>(null);
  const handleChange = (file: File) => {
    setFile(file);
  };

  const session = useSession();

  const dispatch = useAppDispatch();

  const data = useAppSelector((state) => state.adminSlice.updatePYQSQuestion);
  const handleChangeOpen = () => {
    dispatch(
      setUpdatePYQSQuestion({
        folderId: null,
        open: false,
        pyqsName: null,
        Type: null,
        subjectId: null,
        subjectName: null,
        pyqId: null,
      })
    );
  };

  const [fileId, setFileId] = useState<string | null>(null);

  // 2. Define a submit handler.
  async function onSubmit() {
    if (!data.subjectId || !file || !fileId || !data.pyqId || !data.Type)
      return toast.error("Please fill all the fields");

    const toastId = loadToast("Uploading Your Questio");

    const res = await updatePyqsQuestion(
      data.subjectId,
      data.pyqId,
      fileId,
      data.Type
    );
    if (res.status !== 201) {
      return updateToast(toastId, res.message, "error");
    }
    setFileId(null);
    setFile(null);
    handleChangeOpen();
    return updateToast(toastId, "Question Updated Successfully", "success");
  }

  const handleOnUploadFile = async () => {
    // console.log("hewr", file);
    if (!file) return toast.error("Please select a file");
    if (!data.folderId) return toast.error("Folder Id Empty");
    const formData = new FormData();
    formData.set("file", file);
    const toastId = loadToast("Uploading File");
    const res = await uploadQuestion(data.folderId, formData);

    console.log(res);
    if (!res) return updateToast(toastId, "Error in uploading", "error");
    setFileId(res);
    return updateToast(toastId, "File Uploaded", "success");
  };

  return (
    <Dialog open={data.open} onOpenChange={handleChangeOpen}>
      {/* <DialogTrigger  asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className="md:max-w-[425px] w-[100%]  bg-[#111111] text-gray-200">
        <DialogHeader>
          <DialogTitle className="text-md">{data.subjectName}</DialogTitle>
          <DialogDescription>NOTE:Update Questions</DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <FileUploader
            className="text-white w-full"
            color="white"
            handleChange={handleChange}
            name="file"
            types={fileTypes}
          />

          {/* <br /> */}
          


          <div className="flex gap-2 justify-end">
          {fileId ? (
            <div>
              <Link
                className="text-white  bg-yellow-800 px-3 py-1 rounded-sm"
                target="_blank"
                href={`/view/${fileId}`}
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
              type="button"
              onClick={onSubmit}
            >
              Submit
            </button>
            </div>
          }
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}
