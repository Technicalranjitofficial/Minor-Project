import { addSubject } from "@/ServerActions/Admin/Notes";
import { createFolder } from "@/lib/drive";
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
import { addBranches } from "@/ServerActions/admin";

export function AddBranches() {
    const [open,setOpen] = useState(false);
    const handleOnClose = ()=>{
        
    }
  const handleOnSubmit = async (formData: FormData) => {
    // console.log(formData.get("name"));

    const name = formData.get("name");


    if (!name)
      return toast.error("Name Required!");
    const toastId = loadToast("Adding Subject");
    const res = await addBranches(name.toString());
    if (res.status !== 201) return updateToast(toastId, res.message, "error");
    setOpen(false);
    updateToast(toastId, "Branch Created Successfully", "success");
  };
  return (
    <Popover onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">Add Branch</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-body">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Add Braches</h4>
            <p className="text-sm text-muted-foreground">
              Add Branches to the database
            </p>
          </div>

          <form action={handleOnSubmit} className="grid gap-2 bg-body">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                className="col-span-2 bg-body h-8 outline-none !ring-gray-900"
              />
            </div>
            
 

            <div className="w-full flex justify-end">
              <button
                className="px-2 py-1 bg-green-700 rounded-md"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}
