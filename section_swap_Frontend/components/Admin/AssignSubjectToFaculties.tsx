"use client";
import { setAddSolutionDetails, setAssignSubjectToFaculty, setFacultiesList } from "@/Redux/reducers/adminReducers";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks/index";
import { assignSectionToFacultyToDb, assignSubjectToFacultyToDb, fetchFaculties } from "@/ServerActions/admin";

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
import { useEffect, useRef, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "react-toastify";
import { MultiSelect } from "./MultiSelect";
const fileTypes = ["PDF"];
import Select from 'react-select';


export function AssignSubjectToFaculties() {


    const session = useSession();
    const [value, setValues] = useState<any>([]);

    const dispatch = useAppDispatch();

    const data = useAppSelector(
        (state) => state.adminSlice.assignSubjectToFaculty
    );
    const handleChangeOpen = () => {
        dispatch(
            setAssignSubjectToFaculty({

                subjectId: null,
                open: false
            })
        );
    };

    const ref = useRef<HTMLInputElement | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [fileId, setFileId] = useState<string | null>(null);

    const facultiesList = useAppSelector((state) => state.adminSlice.facultiesList);




    const fetchFacDetails = async () => {
        const res = await fetchFaculties();
        if (res) {
            dispatch(setFacultiesList(res));
        }
    }
    useEffect(() => {
        if (data.open && facultiesList.length === 0) {
            fetchFacDetails();
        }
    }, [data.open])


    const handleOnSubmit = async (formData: FormData) => {
        // console.log(ref.current?.value, file, session.data?.id,solutionDetails.pyqs);


        // const f = formData.get("file") as File;

        if (data.event === "assignFactultyToSection") {

            if (

                !data.sectionId || !data.section || !data.open
            )
                return alert("someting is missing");
    
            const getIds: string[] = value.map((v: any) => v.value);
    
            console.log(getIds);
    
            const toastId = loadToast("Your solution is Uploading, Please wait");
            const res = await assignSectionToFacultyToDb({ facultiesId: getIds, sectionId: data.sectionId }
            );
    
            if (res.status !== 201) {
                return updateToast(
                    toastId,
                    res.message ?? "Server is Busy, Please try again later",
                    "error"
                );
            }
            handleChangeOpen();
            updateToast(toastId, "Faculties Assign Successfully", "success");

            return;
        }


        if (

            !data.subjectId || !data.subjectName || !data.open
        )
            return alert("someting is missing");

        const getIds: string[] = value.map((v: any) => v.value);

        console.log(getIds);

        const toastId = loadToast("Your solution is Uploading, Please wait");
        const res = await assignSubjectToFacultyToDb({ facultiesId: getIds, subjectId: data.subjectId }
        );

        if (res.status !== 201) {
            return updateToast(
                toastId,
                res.message ?? "Server is Busy, Please try again later",
                "error"
            );
        }
        handleChangeOpen();
        updateToast(toastId, "Faculties Assign Successfully", "success");
    };





    return (
        <Dialog open={data.open} onOpenChange={handleChangeOpen}>
            {/* <DialogTrigger  asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
            <DialogContent className="md:max-w-[425px] w-[100%]  bg-[#111111] text-gray-200">
                <form action={handleOnSubmit}>
                    <DialogHeader>
                        <DialogTitle className="text-md">
                            {data.subjectName??`Section-${data.section}`}
                        </DialogTitle>
                        <DialogDescription>
                            Assign faculty to subject and sections
                        </DialogDescription>
                    </DialogHeader>



                    <div className=" gap-4 flex w-full flex-col justify-end items-center">

                        {/* <MultiSelect  data={facultiesList.map((fac: any) => {
                            return {
                                label: fac.name,
                                value: fac.id
                            }
                        })} /> */}
                        <div className="w-full py-4">
                            <Select
                                isMulti
                                name="faculties"
                                value={value}
                                onChange={(newValue) => {
                                    setValues(newValue)
                                }}

                                options={facultiesList.map((fac: any) => {
                                    return {
                                        label: fac.name,
                                        value: fac.id
                                    }

                                })}
                                className="my-react-select-container"


                                classNamePrefix="my-react-select"

                                styles={
                                    {
                                        input(base, props) {
                                            return {
                                                ...base,
                                            width: "100%",
                                            }
                                        },
                                    }
                                }
                            />

                        </div>
                        {
                            <div className="flex justify-center w-full">
                                <button
                                    className="bg-green-700 w-full text-white px-3  py-1 rounded-md"
                                    type="submit"

                                >
                                    Assign Subject
                                </button>
                            </div>
                        }
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
