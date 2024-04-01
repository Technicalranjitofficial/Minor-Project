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
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddNotesPYQSDialog } from "./AddNotesAndPYQSDialog";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks/index";
import {
  addNotesPYQS,
  setAddNotesDetails,
  setAddPYQS,
  setAddSolutionDetails,
  setConfirmDelete,
  setUpdatePYQSQuestion,
} from "@/Redux/reducers/adminReducers";
import Link from "next/link";
import { ADDPYQS } from "./AddPYQSDialog";
import { DeleteConfirm } from "./DeleteConfirm";
import { UpdatePYQSQuestion } from "./UpdatePYQS";
import { AddSoultionDialog } from "./AddSolutions";
import { AddNotesDialog } from "./AddNotes";
import { secureId } from "@/utils";

interface mytype {
  row: {
    original: {
      id: string;
      name: string;
      year?: string;
      type?: string;
      status?: string;
      Question?: string;
      solution?: string;
      Notes?: string;
    };
  };
}

// id                 String  @default(uuid()) // Unique identifier for PYQS
// name               String
// year               String
// type               String
// status             String?
// solutionUploadedBy String? @db.ObjectId
// QuestionUploadedBy String? @db.ObjectId
// mimeType           String?
// Question           String?
// solution           String?

export type PYQS = {
  id: string;
  name: string;
  year?: string;
  type?: string;
  status?: string;
  Question?: string;
  solution?: string;
  Notes?: string;
};

export type NOTES = {
  id: string;
  name: string;
  Notes?: string;
};

function customSort(a: PYQS, b: PYQS): number {
  // First, sort by type
  if (
    a?.type?.toLowerCase().includes("mid") &&
    b?.type?.toLowerCase().includes("end")
  )
    return -1;
  if (
    a?.type?.toLowerCase().includes("end") &&
    b?.type?.toLowerCase().includes("mid")
  )
    return 1;

  // If types are equal or both are mid or end semester, sort by year
  const yearA: number = parseInt(a?.year ?? "0");
  const yearB: number = parseInt(b?.year ?? "0");
  return yearA - yearB;
}

export function PYQSTable({
  data,
  subject,
}: {
  data: {
    id: string;
    name: string;
    folderId: string;
    pyqs: PYQS[];
    notes: NOTES[];
  };
  subject: string;
}) {
  const dispatch = useAppDispatch();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  // const data = useAppSelector((state)=>state.adminSlice.addNotesPYQS);

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [type, setType] = React.useState("PYQS");

  const columnsPYQS: ColumnDef<PYQS>[] = [
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
      accessorKey: "year",
      header: "Year",
      cell: ({ row }) => {
        return (
          <div className="flex text-gray-400 flex-row capitalize">
            {row.getValue("year") ?? "-"}
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
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <div className="capitalize  text-[12px] text-gray-400 font-medium">
          {row.getValue("type")}
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Question",
      cell: ({ row }) => (
        <div className="capitalize  text-[12px] text-gray-400 font-medium">
          <Link
            className="text-cyan-600"
            href={`${`/academic/view/Kiitconnect-Ru6F3${1}${row.original.Question
            }?secure=${ secureId
            }&year=${row.original.year}&name=${row.original.name}&subject=${subject}&sid=${1}`
            }`}
            target="_blank"
          >
            {row.getValue("name")}
          </Link>
        </div>
      ),
    },
    {
      accessorKey: "solution",
      header: "Solution",
      cell: ({ row }) => (
        <div className="capitalize  text-[12px] text-gray-400 font-medium">
          {row.getValue("solution") ? (
            <Link
            href={`${`/academic/view/Kiitconnect-Ru6F3${1}${row.original.solution
            }?secure=${ secureId
            }&year=${row.original.year}&name=${row.original.name}&subject=${subject}&sid=${1}`
            }`}
              className="text-cyan-600"
              target="_blank"
            >
              Solution
            </Link>
          ) : (
            "No Solution"
          )}
        </div>
      ),
    },
    {
      accessorKey: "modified",
      header: "Modified",
      cell: ({ row }) => (
        <div className="capitalize  text-[12px] text-gray-400 font-medium">
          {row.original.solution &&
            row.original.status === "VERIFIED" &&
            "Update Sol"}
        </div>
      ),
    },

    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }: mytype) => {
        return (
          <div className="flex flex-row gap-2">
            <div className="flex gap-2">
              {row?.original?.type?.toUpperCase() !== row.original.type && (
                <button
                  onClick={() =>
                    dispatch(
                      setUpdatePYQSQuestion({
                        folderId: data.folderId,
                        open: true,
                        Type: row.original.type
                          ? row.original.type.toUpperCase()
                          : row.original.type,
                        pyqsName: row.original.name,
                        subjectId: data.id,
                        subjectName: data.name,
                        pyqId: row.original.id,
                      })
                    )
                  }
                  className=" bg-blue-900 px-2 py-[2px] font-bold text-[10px] rounded-[3px]"
                >
                  Update Question
                </button>
              )}

              {row.original.solution ? (
                <button
                  onClick={() =>
                    dispatch(
                      setConfirmDelete({
                        open: true,
                        subjectId: data.id,
                        event: "deleteSolution",
                        solutionId: row.original.solution,
                        pyqsName: `${data.name}-${row.original.name}-${row.original.year}`,
                        questionId: row.original.id,
                      })
                    )
                  }
                  className=" bg-red-800 px-2 py-[2px] font-bold text-[10px] rounded-[3px]"
                >
                  Del Sol
                </button>
              ) : (
                <button
                  onClick={() =>
                    dispatch(
                      setAddSolutionDetails({
                        pyqs: {
                          id: row.original.id,
                          name: row.original.name,
                          year: row.original.year,
                          type: row.original.type,
                          Question: row.original.Question,
                        },
                        subjectId: data.id,
                        subjectName: data.name,
                        open: true,
                        folderId: data.folderId,
                      })
                    )
                  }
                  className=" bg-cyan-800 px-2 py-[2px] font-bold text-[10px] rounded-[3px]"
                >
                  Upload Sol
                </button>
              )}
            </div>

            {/* {
              row.original.PremiumMember?.paymentScreenshot &&  <button className=" bg-blue-800 px-2 py-[2px] font-bold text-[10px] rounded-[3px]">
              Payment
            </button>
           } */}
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

  const columnsNotes: ColumnDef<NOTES>[] = [
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
      header: "Notes",
      cell: ({ row }) => (
        <div className="capitalize  text-[12px] text-gray-400 font-medium">
          <Link href={`/view/${row.original.Notes}`} target="_blank">
            {row.getValue("name")}
          </Link>
        </div>
      ),
    },
  ];

  // const sortedPYQS = data.PYQS.sort(customSort);

  console.log([...(data.pyqs ?? [])].sort(customSort));

  const [sorted, setSorted] = React.useState(
    [...(data?.pyqs ?? [])].sort(customSort)
  );

  React.useEffect(() => {
    setSorted([...(data.pyqs ?? [])].sort(customSort));
    setRowSelection({});
  }, [data]);

  const table = useReactTable({
    data: type === "PYQS" ? sorted : data?.notes ?? [],
    columns: type === "PYQS" ? columnsPYQS : columnsNotes,
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
    <div className="w-full px-0 md:px-2 bg-body rounded-md mx-auto scrollbar scrollbar-thumb-cyan-600">
      <ADDPYQS />
      <DeleteConfirm />
      <UpdatePYQSQuestion />
      <AddSoultionDialog />
      <AddNotesDialog />
      <div className="flex  md:justify-between py-4 rounded-md flex-col md:flex-row w-full  gap-2">
        <div className="md:hidden font-bold flex text-center w-full justify-center py-5 text-yellow-600">
          <h1 className="">{subject}</h1>
        </div>
        <input
          placeholder="Filter PYQSs..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm  bg-body p-2 w-full px-2 border border-gray-600 rounded-[4px] outline-none"
        />
        <h1 className="md:flex hidden text-yellow-600 font-bold">{subject}</h1>
        <div className="flex md:gap-2 md:flex-row flex-col">
          <button
            onClick={() => {
              type === "PYQS"
                ? dispatch(
                    setAddPYQS({
                      open: true,
                      data: {
                        subjectId: data.id,
                        subjectName: data.name,
                        folderId: data.folderId,
                      },
                    })
                  )
                : dispatch(
                    setAddNotesDetails({
                      subjectId: data.id,
                      open: true,
                    })
                  );
            }}
            className="px-3 py-2 border border-gray-800"
          >
            Add {type}
          </button>

          <div className="flex">
            <Select
              defaultValue="PYQS"
              value={type}
              onValueChange={(val) => setType(val)}
            >
              <SelectTrigger className="w-[180px] bg-body outline-none !ring-gray-900">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent className="bg-body">
                <SelectGroup>
                  <SelectLabel>SELECT</SelectLabel>
                  <SelectItem value="NOTES">NOTES</SelectItem>
                  <SelectItem value="PYQS">PYQS</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

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
      </div>

      <div className="my-2">
        <button
          disabled={table.getFilteredSelectedRowModel().rows.length === 0}
          onClick={() => {
            console.log(table.getFilteredSelectedRowModel().rows.length);
            const selectedId = table
              .getFilteredSelectedRowModel()
              .rows.map((r) => r.original.id);
            const selectedName = table
              .getFilteredSelectedRowModel()
              .rows.map((r) => `${r.original.name}`);

            if (selectedId.length > 0) {
              dispatch(
                setConfirmDelete({
                  open: true,
                  event: "mutipleDeletePYQS",
                  subjectId: data.id,
                  multipleDatas: selectedId,
                  mutipleDataName: selectedName,
                  mutipleType: type,
                })
              );
            }
          }}
          className="px-2 py-1 disabled:bg-gray-800 text-[10px] bg-red-800 rounded-[5px]"
        >
          Delete Selected
        </button>
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
                  colSpan={
                    type === "NOTES" ? columnsNotes.length : columnsPYQS.length
                  }
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
