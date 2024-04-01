import { addSubject } from "@/ServerActions/Admin/Notes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { loadToast, updateToast } from "@/utils/tostify";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "../ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { assignSubjectToSemester } from "@/ServerActions/admin";

export function AssignSubject({
  branchId,
  semesterId,
  allSubjects,
}: {
  branchId: string;
  semesterId: string;
  allSubjects: {
    id: string;
    name: string;
  }[];
}) {
  const [open, setOpen] = useState(false);

  const handleOnSubmit = async (formData: FormData) => {
    // console.log(formData.get("name"));

    const subjectId = formData.get("subject");

    if(!subjectId || !semesterId || !branchId) return toast.error("All Fields are Required");

    console.log(subjectId,semesterId,branchId);
    const toastId = loadToast("Assigning Subject");

    const res = await assignSubjectToSemester(subjectId.toString(),semesterId);
    if (res.status !== 201) return updateToast(toastId, res.message, "error");
    return updateToast(toastId, "Subject Assigned Successfully", "success");


    
    console.log(branchId,semesterId,subjectId);
  };
  return (
    <Popover onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="bg-body">Assign Subject</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-body">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Assign Subject</h4>
            <p className="text-sm text-muted-foreground">
              Add Subjects to the database
            </p>
          </div>

          <form action={handleOnSubmit} className="grid gap-2 bg-body">
            <Select name="subject" >
              <SelectTrigger className="w-[180px] bg-body outline-none !ring-gray-900">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent className="bg-body">
                <SelectGroup>
                  <SelectLabel>SELECT</SelectLabel>
                  {allSubjects.map((b) => {
                    return (
                      <SelectItem key={b.id} value={b.id}>
                        {b.name}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>

            <div className="w-full flex justify-end">
              <button
                className="px-2 py-1 bg-green-700 rounded-md"
                type="submit"
              >
                Assign
              </button>
            </div>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
