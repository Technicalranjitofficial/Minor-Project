import { useAppDispatch, useAppSelector } from "@/Redux/hooks/index";
import { setTotalGrade } from "@/Redux/reducers/CalculatorSlice";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { calculateCGPA } from "@/utils/utils";
  
  export function CalculatorAlertBox() {
    const dispatch = useAppDispatch();
    const allData = useAppSelector((state) => state.CalculatorSlice.AllData);
    const TotalGrade = useAppSelector((state) => state.CalculatorSlice.totalGrade);
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {/* <Button variant="outline">Show Dialog</Button> */}
          <Button type="button" onClick={(()=>{
            const v = calculateCGPA(allData);
        
            if(v){
                dispatch(setTotalGrade(v))
            }
          })} variant={"secondary"} className="">Calculate</Button>

        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Your Total Grade is:</AlertDialogTitle>
            <AlertDialogDescription>
            {TotalGrade}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Ok</AlertDialogCancel>
            {/* <AlertDialogAction>Continue</AlertDialogAction> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  