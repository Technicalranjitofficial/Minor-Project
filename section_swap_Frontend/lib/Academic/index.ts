import { streams } from "@/interfaces/AcademicInterface";
import { store } from "@/Redux/store/store";
import axios from "axios";
import { RequestOptions } from "https";
import { cache } from "react";
// export const revalidate = 60
// stream:string,semester:number,materialType:string
export async function getStreams() {
  var data = await axios
    .get(
      "https://raw.githubusercontent.com/amitpandey-github/data/main/index.json"
    )
    .then((data) => {
      return data.data;
    })
    .catch((err) => {
      return new Error("Something Went wrong!");
    });
  if (data) return data;
}

const index = {
  cse: 0,
  csce: 1,
  csse: 2,
  it: 3,
};

//   [helper[branch]][semester]['link']
export async function getAcademicData(
  data: any,
  stream: streams,
  semester: number
) {
  const p = await axios
    .get(`${data[index[stream.stream]][stream.stream][semester]["link"]}`)
    .then((d) => d.data);
  return p;
}

export async function allData(
  stream: streams,
  semester: number,
  materialType: string
) {
  const allD = await Promise.all([getStreams()])
    .then(async (d) => {
      return d;
    })
    .then(async (d) => {
      const p = await getAcademicData(d[0], stream, semester);

      return {
        mainData: d[0],
        materialListData: p[0]["First"],
      };
    });

  return allD;
}

export async function getSelectedData(stream: streams, semester: number) {
  console.log(
    "stram",
    stream.stream,
    "semeste",
    semester,
    store.getState().AcademicSlice.MainDataList
  );
  const p = await axios
    .get(
      `${
        store.getState().AcademicSlice.MainDataList[index[stream.stream]][
          stream.stream
        ][semester]["link"]
      }`
    )
    .then((d) => d.data);
  console.log(p);
  return p[0]["First"];
}

export async function GetDataOnCLick(stream: streams, semester: number) {
  try {
    const data = await axios.post("/api/academic", {
      url: store.getState().AcademicSlice.MainDataList[index[stream.stream]][
        stream.stream
      ][semester]["link"],
    });
    return data.data.data[0]["First"];
  } catch (error) {
    throw new Error("Network Error has been throwon");
  }
}

// export const getCachedData =cache(async(stream:streams,semester:number)=> {
//   try {
//    const data = await axios.post("/api/academic",{stream:stream.stream,semester:semester});
//    return data.data.data[0]['First'];
//   } catch (error) {
//    throw new Error("Network Error has been throwon")
//   }

//  })

// https://raw.githubusercontent.com/amitpandey-github/kiit-connect-data/kiit/csce-1.json

// export const getCachedData =async(stream:string,semester:number,types:string)=> {
//   try {
//    console.log("called")
//    const data = await fetch(`https://raw.githubusercontent.com/amitpandey-github/kiit-connect-data/kiit/${types}/${stream?.toLowerCase()}-${semester}.json`,{

//     cache:"force-cache",

//     next:{
//       revalidate:1,
//       tags:["pyqs"]
//     },

//    },).then((d)=>d.json());
//    console.log("ddsdsdsds", data)
//    return  data[0]['First'];
//   } catch (error) {
//     console.log(error);
//    throw new Error("Network Error has been throwon")
//   }

//  }

const streamMap = {
  cse: "65d20c1248b08e85746da005",
  csce: "65d20c1248b08e85746da007",
  csse: "65d20c1248b08e85746da006",
  it: "65d20c1248b08e85746da008",
};

export const getCachedData = async (
  stream: string,
  semester: number,
  types: string,
  branchId:string
) => {
  try {
    // ${types}/${stream?.toLowerCase()}-${semester}.json
    console.log(types);
    console.log("called");

    if(!branchId) return console.log("not");
    const res = await fetch(
      `${
        process.env.SERVER_URL
      }/notes/getPYQSByBranchIdAndSemesterNumber?branchId=${
       branchId
      }&semesterNumber=${semester}&type=${types}`,
      {
        method: "GET",

        cache: "no-cache",

        next: {
          // revalidate:1,
          tags: ["pyqs"],
        },
      }
    );
    //  console.log("ddsdsdsds", data)
    //  return  data[0]['First'];
    console.log(res);
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Network Error has been throwon");
  }
};

export const getBookData = async (stream: string, semester: number) => {
  console.log(stream,semester);
  try {
    console.log("called");
    const res = await fetch(
      `https://raw.githubusercontent.com/amitpandey-github/kiit-connect-data/kiit/Book/${stream?.toLowerCase()}-${semester}.json`,
      {
        cache: "force-cache",
        next: {
          revalidate: 3600,
        },
      }
    );

    // console.log(res);
    if (res.status === 200) {
      const data = await res.json();
      return data.data;
    }
    throw new Error("Network Error has been throwon");
  } catch (error) {
    console.log(error);
    throw new Error("Network Error has been throwon");
  }
};
