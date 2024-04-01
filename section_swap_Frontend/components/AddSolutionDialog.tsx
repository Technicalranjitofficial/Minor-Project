"use client";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks/index";
import { setAddSolutionDetails } from "@/Redux/reducers/academicReducer";
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
import { addSolutionToPyqs } from "@/ServerActions/Notes/Notes";
import { uploadSolutionFile } from "@/lib/drive";
import { loadToast, updateToast } from "@/utils/tostify";
import { secureId } from "@/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "react-toastify";
const fileTypes = ["PDF"];

export function AddSoultionDialog() {
  const [file, setFile] = useState<File | null>(null);
  const [fileId, setFileId] = useState<string | null>(null);
  const handleChange = (file: File) => {
    setFile(file);
  };

  const session = useSession();

  const dispatch = useAppDispatch();

  const solutionDetails = useAppSelector(
    (state) => state.AcademicSlice.addSolutionDetails
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


  const handleOnUpload = async () => {

    if (!file) return toast.error("Please Upload the file first");
    if (!solutionDetails.folderId) return toast.error("Refresh the page and try again");
    const toastId = loadToast("File is Uploading, Please wait");
    const formData = new FormData();
    formData.append("file", file);
    const res = await uploadSolutionFile(solutionDetails.folderId, formData);
    if (!res) return updateToast(toastId, "Failed to upload,Please try again", "error");
    setFileId(res);
    return updateToast(toastId, "File Uploaded Successfully", "success");
  }

  const handleOnSubmit = async (formData: FormData) => {
    // console.log(ref.current?.value, file, session.data?.id, solutionDetails.pyqs);


    if (!fileId) return toast.error("Upload the file first");
    if (
      !ref.current?.value ||
      !solutionDetails.pyqs ||
      !solutionDetails.subjectId ||
      // !session.data?.authToken ||

      !solutionDetails.subjectName || !solutionDetails.pyqs.Question
    )
      return toast.error("Please Fill all the fields");

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

    const res = await addSolutionToPyqs({
      pyqs: solutionDetails.pyqs,
      upiId: ref.current?.value,
      // userId: session.data.id,
      subjectId: solutionDetails.subjectId,
    }, fileId);


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
    setFile(null);
    setFileId(null);
    updateToast(toastId, "Solution Uploaded Successfully", "success");
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
          <div className="grid gap-4 py-4">
            <div className="my-5 flex flex-col gap-3">
              <FileUploader
                className="text-white w-full"
                color="white"
                handleChange={handleChange}
                name="file"
                types={fileTypes}
              />
              <div>
                {fileId?<Link href={`/academic/view/Kiitconnect-Ru6F3${1}${
                          fileId
                        }?secure=${
                          session?.data?.authToken
                            ? session.data?.authToken
                            : secureId
                        }&sid=${1}`}
                        target="_blank"
                        className={`bg-yellow-800 px-2 py-1 rounded-md`}>Preview</Link>:<button type="button" onClick={handleOnUpload} className="px-2 bg-green-800 rounded-md py-1">Upload</button>}
              </div>
            </div>
            <div className=" flex flex-col flex-start  gap-4">
              <Label htmlFor="username" className="text-left">
                Valid UPI Id
              </Label>
              <Input
                type="text"
                id="username"
                name="upiId"

                ref={ref}
                className="col-span-3 w-full"
              />
            </div>
          </div>



          <DialogFooter>
            <Button
              className="bg-green-700 text-white"
              type="submit"
              disabled={isUploading}
            // onClick={handleOnSubmit}
            >
              Submit For Verification
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
