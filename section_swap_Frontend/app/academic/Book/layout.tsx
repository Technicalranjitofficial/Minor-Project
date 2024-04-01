import BookButtonLayout from "@/components/BookButtonLayout";
import GetButton from "@/components/GetButton";
import { Metadata } from "next";


export const metadata: Metadata = {
  title:"Book",
};
const UsersLayout = async ({ children }:{children: React.ReactNode;}) => {
    // const users = await getData()
    
  
    return (
      <section className='flex  flex-col min-h-[100vh]  md:min-h-[80vh]'>
        
        {/* <div className="mt-28"> */}
         <BookButtonLayout/>
        {/* </div> */} 
        
       
        <main>{children}</main>
      </section>
    )
  }
  
  export default UsersLayout