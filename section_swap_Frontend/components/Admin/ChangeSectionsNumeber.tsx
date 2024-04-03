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
import { updateNoOfSections } from "@/ServerActions/admin";

export function ChangeSectionsNumber({sectionId,number}:{sectionId:string,number:number}) {
    const [open,setOpen] = useState(false);

    
   
  const handleOnSubmit = async (formData: FormData) => {
    // console.log(formData.get("name"));

    const number = formData.get("numberOfSections");

    console.log(number,Number(number))

    if(!number || Number(number)===0) return toast.error("Enter a valid number");
  

    
    const toastId = loadToast("Adding Subject");
    const res = await updateNoOfSections(Number(number),sectionId);
    if (res.status !== 201) return updateToast(toastId, res.message, "error");
    setOpen(false);
    updateToast(toastId, "Section Number Updated!!", "success");
  };
  return (
    <Popover onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">Update  Sections Number</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-body">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Update Sections Number</h4>
            <p className="text-sm text-muted-foreground">
              Update Sections for Swapping
            </p>
          </div>

          <form action={handleOnSubmit} className="grid gap-2 bg-body">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Number of Sections</Label>
              <Input
                id="name"
                defaultValue={number}
                name="numberOfSections"
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
