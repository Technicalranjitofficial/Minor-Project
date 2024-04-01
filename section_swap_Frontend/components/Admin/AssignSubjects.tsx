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

export function AssignSubject({id,btnName}:{id:string,btnName:string}) {
    const [open,setOpen] = useState(false);
 
  const handleOnSubmit = async (formData: FormData) => {
    // console.log(formData.get("name"));

    // const name = formData.get("name");
    // const code = formData.get("code");
    // const credit = formData.get("credit");

    // if (!name || !code || !credit)
    //   return toast.error("All Fields are Required");
    // const toastId = loadToast("Adding Subject");
    // const res = await addSubject({
    //   name: name.toString(),
    //   code: code.toString(),
    //   credit: credit.toString(),
    // });
    // if (res.status !== 201) return updateToast(toastId, res.message, "error");
    // setOpen(false);
    // updateToast(toastId, "Subject Addedd Successfully", "success");
  };
  return (
    <Popover onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">{btnName}</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 bg-body">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Add Subject{id}</h4>
            <p className="text-sm text-muted-foreground">
              Add Subjects to the database
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
            <div className="flex flex-col gap-2">
              <Label htmlFor="code">Code</Label>
              <Input
                id="code"
                name="code"
                className="col-span-2 h-8 bg-body outline-none !ring-gray-900"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="credit">Credit</Label>
              <Input
                id="credit"
                name="credit"
                className="col-span-2 h-8 bg-body outline-none !ring-gray-900"
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
