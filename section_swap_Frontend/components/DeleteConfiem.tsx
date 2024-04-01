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
import { setDeleteConfirm } from "@/Redux/reducers/academicReducer";
import { deletePYQS, deleteSolution } from "@/ServerActions/Notes/Notes";
import { toast } from "react-toastify";
import { loadToast, updateToast } from "@/utils/tostify";

export function DeleteConfirm() {
  const data = useAppSelector((state) => state.AcademicSlice.deleteConfirm);

  const dispatch = useAppDispatch();
  const hadleClose = () => {
    dispatch(
      setDeleteConfirm({
        open: false,
        questionId: null,
        subjectId: null,
        event: null,
        solutionId: null,
      })
    );
  };

  const handleOnDelete = async () => {
    if (!data.questionId || !data.subjectId || !data.event)
      return toast.error("Question Id or Subject Id Missing");
    const toastId = loadToast("Deleting Question");
    if (data.event === "deletePYQS") {
      const res = await deletePYQS(
        data.subjectId,
        data.questionId,
        data.solutionId
      );
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
          <DialogTitle className="text-sm">{data.pyqsName}</DialogTitle>
          <DialogDescription className="text-sm">
            Solution will be deleted permanently,
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <p>Are you sure want to delete? </p>
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
