"use client";

import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddNotesPYQSDialog } from "./AddNotesAndPYQSDialog";
import { useAppDispatch } from "@/Redux/hooks/index";
import { addNotesPYQS, setAssignSubjectToFaculty, setConfirmDelete } from "@/Redux/reducers/adminReducers";
import { getNotesAndPYQS } from "@/ServerActions/admin";
import Link from "next/link";
import { AddSubjects } from "./AddSubjects";
import { DeleteConfirm } from "./DeleteConfirm";

import FilterSemesters from "./FilterSemesters";
import { MultiSelect } from "./MultiSelect";
import { AssignSubjectToFaculties } from "./AssignSubjectToFaculties";

interface mytype {
  row: {
    original: {
      id: string;
      name: string;
      SUBCODE?: string;
      Credit?: string;
      folderId: string;
    };
  };
}

export type Root = Root2;

export interface Root2 {
  branch: B[];
  allSubjects: {
    id: string;
    name: string;
  }[];
}

export interface Semester {
  number: number;
  id: string;
}

export interface B {
  id: string;
  name: string;
  semesters?: Semester[];
}

export interface Branch {
  id: string;
  name: string;
}

export type Subject = {
  id: string;
  name: string;
  SUBCODE?: string;
  Credit?: string;
  folderId: string;
};




export function SubjectsTable({
  data,
  isSemesterData,
}: {
  data: Subject[];
  isSemesterData: null | {
    semester: number;
    semesterId: string;
    branch: string;
    branchId: string;
    branchAndSemesterId: Root;
  };
}) {
  const dispatch = useAppDispatch();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<Subject>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          className="border-gray-600 focus:ring-gray-900"
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          className="border-gray-600 focus:ring-gray-900"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        return (
          <div className="flex text-gray-400 flex-row capitalize">
            {row.getValue("name")}
          </div>
        );

        //    return row.getValue("profileImage")
        //     ? <img src={row.getValue("profileImage")} alt="profile" className="w-8 h-8 rounded-full" />:null
        //     return <div className="">

        //     <span className="ml-2">{row.getValue("profileImage")}</span>
        // </div>
      },
    },
    {
      accessorKey: "SUBCODE",
      header: "Code",
      cell: ({ row }) => (
        <div className="capitalize  text-[12px] text-gray-400 font-medium">
          {row.getValue("SUBCODE") ?? "N/A"}
        </div>
      ),
    },
    {
      accessorKey: "Credit",
      header: "Credit",
      cell: ({ row }) => (
        <div className="capitalize  text-[12px] text-gray-400 font-medium">
          {row.getValue("Credit") ?? "N/A"}
        </div>
      ),
    },

    {
      accessorKey: "id",
      header: "Actions",
      cell: ({ row }: mytype) => {
        return (
          <div className="flex flex-row gap-2">
            <div className="flex gap-2">
              <Link
                href={`/Admin/subjects/${row.original.id}?subject=${row.original.name}`}
                target="_blank"
                className=" bg-green-800 px-2 py-[2px] text-center flex justify-center items-center font-bold text-[10px] rounded-[3px]"
              >
                Notes/PYQS
              </Link>
              <button
                onClick={() => {
                  if (isSemesterData !== null) {
                    dispatch(
                      setConfirmDelete({
                        open: true,
                        subjectId: row.original.id,
                        name: row.original.name,
                        event: "RemoveSubjectFromSemester",
                        semesterId: isSemesterData.semesterId,
                      })
                    );
                  } else {
                    dispatch(
                      setConfirmDelete({
                        open: true,
                        subjectId: row.original.id,
                        name: row.original.name,
                        event: "DeleteSubject",
                      })
                    );
                  }
                }}
                className=" bg-red-800 px-2 py-[2px] font-bold text-[10px] rounded-[3px]"
              >
                {isSemesterData !== null ? "Remove" : "Delete"}
              </button>

             
            </div>

            

          
          </div>
        );

        //    return row.getValue("profileImage")
        //     ? <img src={row.getValue("profileImage")} alt="profile" className="w-8 h-8 rounded-full" />:null
        //     return <div className="">

        //     <span className="ml-2">{row.getValue("profileImage")}</span>
        // </div>
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    // rowCount: data.length,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  return (
    <div className="w-full px-1 md:px-2 bg-body mt-4 rounded-md scrollbar-thin scrollbar-thumb-cyan-600">
      <AddNotesPYQSDialog />
      <DeleteConfirm />
      <AssignSubjectToFaculties/>
      <div className="flex gap-2 flex-col py-4 rounded-md">
        <input
          placeholder="Filter Subjects..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm  bg-body p-2 border bg-transparent border-gray-600 rounded-[4px] outline-none"
        />
        <div className="flex gap-2 justify-start ">
          {/* <button
            onClick={() => {}}
            className="px-3 py-2 border border-gray-800"
          >
            Add Subject{" "}
          </button> */}

          {isSemesterData !== null && <FilterSemesters event="subject" data={isSemesterData} />}

          {isSemesterData === null && <AddSubjects />}
          <DropdownMenu>
            <DropdownMenuTrigger
              className="bg-body focus:!ring-transparent"
              asChild
            >
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-body">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="bg-body">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
