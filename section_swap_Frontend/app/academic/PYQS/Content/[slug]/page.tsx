import { setMainDataList } from "@/Redux/reducers/academicReducer";
import { store } from "@/Redux/store/store";
import Academic from "@/components/Academic";
import GetButton from "@/components/GetButton";
import { allData, getAcademicData, getCachedData } from "@/lib/Academic";

// const stream = ["cse", "csse", "csce", "it"];

const types = ["Notes", "PYQS"];

export interface Root {
  id: string;
  name: string;
  semesters: Semester[];
}

export interface Semester {
  id: string;
  number: number;
  subjectId: string[];

  branchId: string;
  subjects: Subject[];
}

export interface Subject {
  name: string;
  SUBCODE?: string;
  id: string;
  folderId:string
  pyqs: Pyq[];
  notes: Notes[];
}

export interface Pyq {
  id: string;
  name: string;
  year: string;
  type: string;
  mimeType: string;
  Question: string;
  solution?: string;
}

export interface Notes {
  id: string;
  name: string;
  mimeType: string;
  Notes: string;
}

export default async function GetContent({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { type: string,branchId:string };
}) {
  // const data = await allData({stream:"cse"},1,"Notes");

  const p = params.slug.split("-");

  const k = p[1];
  console.log(searchParams);

  console.log(
  !types.includes(p[0]) ,
  parseInt(p[2]) < 0,
  parseInt(p[2]) > 6)
  if (
   
    !types.includes(p[0]) ||
    parseInt(p[2]) < 0 ||
    parseInt(p[2]) > 6
  ) {
    throw new Error("Bad Request!");
  }

  

  // console.log(p);
  const data: Root = await getCachedData(
    p[1].toLowerCase(),
    parseInt(p[2]),
    searchParams.type,
    searchParams.branchId
  );

  console.log(data);

  return (
    <div className="">
      {
        <Academic
          type={p[0]}
          semeseter={parseInt(p[2])}
          stream={p[1].toLowerCase()}
          branchId={searchParams.branchId}
          data={data}
        />
      }
    </div>
  );
}
