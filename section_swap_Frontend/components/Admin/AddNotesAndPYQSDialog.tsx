"use client";
import { addNotesPYQS } from "@/Redux/reducers/adminReducers";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks/index";
import { getNotesAndPYQS } from "@/ServerActions/admin";
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
import { useEffect, useState } from "react";
import { PYQSTable } from "./PYQSTable";

export function AddNotesPYQSDialog() {
  const data = useAppSelector((state) => state.adminSlice.addNotesPYQS);
  const dispatch = useAppDispatch();
  const handleOnClose = () => {
    dispatch(addNotesPYQS({ open: false, data: null, loading: false }));
  };
  
  console.log(data);

  const fetchDaa = async () => {
    if (!data.data) return;
    
    const res = await getNotesAndPYQS(data.data?.id);
    console.log(res);
    if (!res) return;
    dispatch(
      addNotesPYQS({
        open: true,
        data: {
          id: res.id,
          name: res.name,
          type: data.data.type,
          notes: res.notes,
          pyqs: res.pyqs,
          folderId: res.folderId,
        },
        loading: false,
      })
    );
  };

  useEffect(() => {
    fetchDaa();

  }, [data.data?.id,]);

  return (
    <Dialog open={data.open} onOpenChange={handleOnClose}>
      <DialogContent className=" w-full md:max-w-screen-2xl mx-auto max-h-screen h-full bg-body">
        <DialogHeader>
          <DialogTitle>{data.data?.type}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full h-full mx-auto overflow-y-auto scrollbar scrollbar-none scrollbar-thumb-cyan-600">
          {!data.loading && data.data?.pyqs && (
            // <PYQSTable
            // />
            <h1></h1>
          )}
          {data.loading && <div>Loading...</div>}
          {/* {!data.loading && data.data?.notes && JSON.stringify(data.data)} */}
        </div>
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
