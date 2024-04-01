import { BookInterface } from "@/interfaces/AcademicInterface";
import { setMainDataList } from "@/Redux/reducers/academicReducer";
import { store } from "@/Redux/store/store";
import Academic from "@/components/Academic";
import BookCard from "@/components/Academic/BookCard";
import { allData, getAcademicData, getBookData, getCachedData } from "@/lib/Academic"




const stream = ['cse','csse','csce','it'];

const types = ['Notes','PYQS']

export default async function GetContent({params}:{params:{slug:string}}){
// const data = await allData({stream:"cse"},1,"Notes");

const p = params.slug.split("-");
// console.log(p,"hhds"); 
const k = p[1];


// if(!stream.includes(k) || !types.includes(p[0])|| parseInt(p[2])<0 ||parseInt(p[2])>6  ){
//   throw new Error("What the fuck you are trying to get?");
// } 
const data:[] = await getBookData(p[0].toLowerCase(),parseInt(p[1]));
console.log(data)
  return (
    <div className="">
        
        {/* {<Academic type={p[0]} semeseter={parseInt(p[2])} stream={p[1].toLowerCase()} data={data} />} */}
    

    {/* {data && <p>Data is there {JSON.stringify(data)}</p> } */}

        

        <div className="w-full lg:grid-cols-3 grid md:grid-cols-2 grid-cols-1 gap-5">
        { data && data.length>0 &&  data.map((val:BookInterface,i)=>{
          return <BookCard name={val.subject} books={val.data}/>
        })}
        
        </div>

    </div>
  )
}



