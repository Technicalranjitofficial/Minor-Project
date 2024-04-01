import GetButton from "@/components/GetButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:"PYQS",
};

const UsersLayout = async ({ children }:{children: React.ReactNode;
searchParams:{type:string}
}) => {
    // const users = await getData()
    // console.log(searchParams.type);

    const res = await fetch(`http://localhost:8000/notes/getAllBranches`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      next: {
        tags: ['getBranches']
      }
    });
  
  
  
  
    if (!res.ok) return <div>Something went wrong</div>
    console.log(res);
    const data = await res.json();
    console.log(data);
  
    return (
      <section className='flex flex-col'>
        
        {/* <div className="mt-28"> */}
         <GetButton branches={data}/>
        {/* </div> */} 
        
       
        <main>{children}</main>
      </section>
    )
  }
  
  export default UsersLayout