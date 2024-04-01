"use client";
import {
  setAddNotesDetails,
  setAddSolutionDetails,
} from "@/Redux/reducers/adminReducers";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks/index";
import { addNotes, adminAddSolution } from "@/ServerActions/Admin/Notes";

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
import { toast } from "react-toastify";
import { loadToast, updateToast } from "@/utils/tostify";
const fileTypes = ["PDF"];

export function AddNotesDialog() {
  const [file, setFile] = useState<File | null>(null);
  const handleChange = (file: File) => {
    setFile(file);
  };

  const session = useSession();

  const dispatch = useAppDispatch();

  const data = useAppSelector((state) => state.adminSlice.addNotes);
  const handleChangeOpen = () => {
    dispatch(
      setAddNotesDetails({
        subjectId: null,
        open: false,
      })
    );
  };

  const ref = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleOnSubmit = async (formData: FormData) => {
    // console.log(ref.current?.value, file, session.data?.id,solutionDetails.pyqs);

    if (!data.subjectId || !data.open)
      return toast.error("Fill the Required Fileds");
    const name = formData.get("name")?.toString();
    const fileId = formData.get("fileId")?.toString();
    if (!name || !fileId) return toast.error("FileId or Name is missing");

    const toastId = loadToast("Your Question is Uploading, Please wait");
    const res = await addNotes({
      name: name,
      note: fileId,
      subjectId: data.subjectId,
    });

    if (res.status !== 201) {
      return updateToast(
        toastId,
        res.message ?? "Server is Busy, Please try again later",
        "error"
      );
    }

    dispatch(
      setAddNotesDetails({
        subjectId: null,
        open: false,
      })
    );
    updateToast(toastId, "Solution Uploaded Successfully", "success");
  };

  return (
    <Dialog open={data.open} onOpenChange={handleChangeOpen}>
      {/* <DialogTrigger  asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className="md:max-w-[425px] w-[100%]  bg-[#111111] text-gray-200">
        <form action={handleOnSubmit}>
          <DialogHeader>
            <DialogTitle className="text-md">Add Notes</DialogTitle>
            <DialogDescription>
              NOTE: Add Only Authentic Notes
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className=" flex flex-col flex-start  gap-4">
              <Label htmlFor="name" className="text-left">
                Name <span className="text-red-600">*</span>
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                className="col-span-3 w-full outline-none bg-body border-cyan-700 rounded-md !ring-gray-900"
              />
            </div>
          </div>

          <div className="grid gap-4 py-4">
            <div className=" flex flex-col flex-start  gap-4">
              <Label htmlFor="fileId" className="text-left">
                ID <span className="text-red-600">*</span>
              </Label>
              <Input
                type="text"
                id="fileId"
                name="fileId"
                className="col-span-3 w-full outline-none bg-body border-cyan-600 !ring-gray-900"
              />
            </div>
          </div>

          <DialogFooter>
            <button
              className="bg-green-800 hover:bg-green-900 py-1 px-2 text-white"
              type="submit"
              disabled={isUploading}
              // onClick={handleOnSubmit}
            >
              Upload
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
