"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Branch, CalcInfo, Semester } from "@/lib/utils"
import { useAppDispatch, useAppSelector } from "@/Redux/hooks/index"

import { CalculatorAlertBox } from "./CalculatorAlertBox"
import { setAllData } from "@/Redux/reducers/CalculatorSlice"

const FormSchema = z.object({
  branch: z
    .string({
      required_error: "Please select an email to display.",
    }),
  semester: z.string({
    required_error: "Please select Your Semester to display.",
  }),


})

export function Calculator() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  const dispatch = useAppDispatch();
  const allData = useAppSelector((state) => state.CalculatorSlice.AllData);
  function onSubmit(data: z.infer<typeof FormSchema>) {


    const p = CalcInfo[data.branch as "CSE" | "IT" | "CSCE"]
    //    console.log()

    dispatch(setAllData(p[data.semester as "1" | "2" | "3" | "4" | "5" | "6" | "7"]))

    //    {allData.length>0 &&  toast({
    //     title: "You submitted the following values:",
    //     description: (
    //       <p>
    //           {JSON.stringify(allData)}
    //       </p>)

    //   })}
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="branch"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Branch</FormLabel>
              <Select  onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-body">
                    <SelectValue placeholder="Select Your Branch" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {/* <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem> */}
                  {Branch.map((branch) => (
                    <SelectItem value={branch}>{branch}</SelectItem>
                  ))}
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
          name="semester"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Semester</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-body">
                    <SelectValue placeholder="Select Your Section" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {/* <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem> */}

                  {Semester.map((semester) => <SelectItem value={semester.toString()}>{semester.toString()}</SelectItem>)}
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


        <Button type="submit" variant={"secondary"} className="">Submit</Button>


      </form>
    </Form>
  )
}
