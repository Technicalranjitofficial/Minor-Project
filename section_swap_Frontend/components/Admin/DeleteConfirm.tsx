import { CopyIcon } from "@radix-ui/react-icons";

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
import { useAppDispatch, useAppSelector } from "@/Redux/hooks/index";
import { toast } from "react-toastify";
import { setConfirmDelete } from "@/Redux/reducers/adminReducers";
import { loadToast, updateToast } from "@/utils/tostify";
import { deleteMultiplePYQS, deletePYQS, deleteSolution } from "@/ServerActions/Admin/Notes";
import { deleteBranch, deleteSubject, removeSubjectFromSemester } from "@/ServerActions/admin";

export function DeleteConfirm() {
  const data = useAppSelector((state) => state.adminSlice.confirmDelete);

  const dispatch = useAppDispatch();
  const hadleClose = () => {
    dispatch(
      setConfirmDelete({
        open: false,
        questionId: null,
        subjectId: null,
        event: null,
        solutionId: null,
        pyqsName:null,
        multipleDatas:null,
        mutipleType:null,
        mutipleDataName:null,
        name:null,
        semesterId:null,
      
      })
    );
  };

  const handleOnDelete = async () => {



   if(data.event==="RemoveSubjectFromSemester"){
    if(!data.subjectId || !data.semesterId) return toast.error("Subject Id or Semester Id Missing");
    const toastId = loadToast("Removing Subject");
    const res = await removeSubjectFromSemester(data.subjectId,data.semesterId);
    if (res.status !== 201) {
      return updateToast(toastId, res.message, "error");
    }
    hadleClose();
    return updateToast(toastId, "Removed Successfully", "success");

   }else if(data.event==="DeleteSubject"){
        if(!data.subjectId) return toast.error("Subject Id Missing");
        const toastId = loadToast("Deleting Subject");
        const res = await   deleteSubject(data.subjectId);
        if (res.status !== 201) {
          return updateToast(toastId, res.message, "error");
        }
        hadleClose();
        return updateToast(toastId, "Deleted Successfully", "success");

    }else if(data.event==="deleteBranch"){
      if(!data.branchId) return toast.error("Branch Id Missing");
      const toastId = loadToast("Deleting Branch");
      const res = await   deleteBranch(data.branchId);
      if (res.status !== 201) {
        return updateToast(toastId, res.message, "error");
      }
      hadleClose();
      return updateToast(toastId, "Deleted Successfully", "success");

    }else if(data.event === "mutipleDeletePYQS"){
        if(!data.multipleDatas || !data.mutipleType || !data.subjectId) return toast.error("Multiple Data Missing");
        const toastId = loadToast("Deleting Multiple PYQS");       
        const res = await deleteMultiplePYQS({
            subjectId:data.subjectId,
            ids:data.multipleDatas,
            type:data.mutipleType
        });
        if(!res) return updateToast(toastId, "Something Went Wrong", "error");

        hadleClose();
        return updateToast(toastId, "Deleted Successfully", "success");
    }
    


    if (!data.questionId || !data.subjectId || !data.event)
      return toast.error("Question Id or Subject Id Missing");
    const toastId = loadToast("Deleting Question");
    if (data.event === "deletePYQS") {
      const res = await deletePYQS(data.subjectId, data.questionId,data.solutionId);
      if (res.status !== 201) {
        return updateToast(toastId, res.message, "error");
      }
    } else if (data.event === "deleteSolution") {
      if (!data.solutionId)
        return updateToast(toastId, "Solution Id Missing", "error");
      const res = await deleteSolution(
        data.subjectId,
        data.questionId,
        data.solutionId
      );
      if (res.status !== 201) {
        return updateToast(toastId, res.message, "error");
      }
    }
    hadleClose();
    return updateToast(toastId, "Deleted Successfully", "success");
  };
  return (
    <Dialog open={data.open} onOpenChange={hadleClose}>
      {/* <DialogTrigger asChild> */}
      {/* <Button variant="outline">Share</Button> */}
      {/* </DialogTrigger> */}
      <DialogContent className="sm:max-w-md bg-[#111111] text-white ">
        <DialogHeader>
          <DialogTitle className="text-sm">{data.pyqsName??"Confirm"}</DialogTitle>
          <DialogDescription className="text-sm">
           Deleted file cannot be recovered : {data.event}
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            {data.event === "mutipleDeletePYQS" && <ul>
                {
                    data.mutipleDataName?.map((name,i)=>{
                        return <li key={i} className="list-disc">{name}</li>
                    }) 
                }
            </ul>
                
            }
            <p>Are you sure want to delete? {data?.name} </p>
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          {/* <DialogClose asChild> */}
          <Button onClick={hadleClose} type="button" variant="secondary">
            cancel
          </Button>
          <Button
            className="bg-red-700 text-white"
            onClick={handleOnDelete}
            type="button"
            variant="secondary"
          >
            Delete
          </Button>
          {/* </DialogClose> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
