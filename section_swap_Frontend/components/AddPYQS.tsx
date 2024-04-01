"use client";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks/index";
import {
  setAddPYQSDetails,
  setAddSolutionDetails,
} from "@/Redux/reducers/academicReducer";
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
import { addPYQS, addSolutionToPyqs } from "@/ServerActions/Notes/Notes";
import { loadToast, updateToast } from "@/utils/tostify";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
const fileTypes = ["PDF"];

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { uploadQuestion, uploadSolutionFile } from "@/lib/drive";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Link from "next/link";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";

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

const type = ["MID SEMESTER", "END SEMESTER","QUESTION BANK"];

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

export function AddPYQS() {
  const [file, setFile] = useState<File | null>(null);
  const handleChange = (file: File) => {
    setFile(file);
  };

  const session = useSession();

  const dispatch = useAppDispatch();

  const data = useAppSelector((state) => state.AcademicSlice.addPYQSDetails);
  const handleChangeOpen = () => {
    dispatch(
      setAddPYQSDetails({
        subjectId: null,
        open: false,
        subjectName: null,
        folderId: null,
      })
    );
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   username: "",
    // },
  });

  const [fileId, setFileId] = useState<string | null>(null);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!data.subjectId || !file || !fileId)
      return toast.error("Please fill all the fields");

    const toastId = loadToast("Uploading Your Questio");

    const res = await addPYQS(data.subjectId, {
      mimeType: file.type,
      name: values.name,
      Question: fileId ?? "ID",
      solution: null,
      type: values.type,
      year: values.year,

    });
    if (res.status !== 201) {
      return updateToast(toastId, res.message, "error");
    }
    setFileId(null);
    setFile(null);
    dispatch(setAddPYQSDetails({ subjectId: null, open: false }));
    return updateToast(toastId, "Question Uploaded", "success");
  }

  const handleOnUploadFile = async () => {
    // console.log("hewr", file);
    if (!file) return toast.error("Please select a file");
    if(!data.folderId) return toast.error("Please select a subject")  
    const formData = new FormData();
    formData.set("file", file);
    const toastId = loadToast("Uploading File");
    const res = await uploadQuestion(
      data.folderId,
      formData
    );

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
          <DialogDescription>
            NOTE: Add Only Authentic Solution(Email will be Recorded)
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Pdf</FormLabel>
                  <FormControl>
                    <FileUploader
                      className="text-white w-full"
                      color="white"
                      handleChange={handleChange}
                      name="file"
                      types={fileTypes}
                    />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <br /> */}
            {fileId ? (
              <div>
                <Link
                  className="text-white mt-2 bg-yellow-800 px-3 py-1 rounded-sm"
                  target="_blank"
                  href={`/academic/view/Kiitconnect-Ru6F3${1}${fileId}?secure=${
                    session?.data?.authToken
                      ? session.data?.authToken
                      : secureId
                  }&sid=${1}`}
                >
                  Open Link
                </Link>
              </div>
            ) : (
              <button
                className="bg-green-700 text-white px-2 py-1 rounded-sm"
                type="button"
                onClick={handleOnUploadFile}
              >
                Upload
              </button>
            )}

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {type.map((val, index) => {
                        return (
                          <SelectItem key={index} value={val}>
                            {val}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  {/* <FormDescription>
                    You can manage email addresses in your{" "}
                    <Link href="/examples/forms">email settings</Link>.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Year.map((val, index) => {
                        return (
                          <SelectItem key={index} value={val}>
                            {val}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  {/* <FormDescription>
                    You can manage email addresses in your{" "}
                    <Link href="/examples/forms">email settings</Link>.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select name" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {name.map((val, index) => {
                        return (
                          <SelectItem key={index} value={val}>
                            {val}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  {/* <FormDescription>
                    You can manage email addresses in your{" "}
                    <Link href="/examples/forms">email settings</Link>.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {
              <Button
                className="bg-green-700 text-white px-2 py-1 rounded-sm"
                type="submit"
              >
                Submit
              </Button>
            }
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
