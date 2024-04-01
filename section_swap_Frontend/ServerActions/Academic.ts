"use server"

import { cache } from "react";

export const AcademicAction=cache(async(section:string,semester:number) =>{

    console.log(section.toLowerCase(),semester,"ssj");
    
    const p = await fetch(`${process.env.ACADEMIC_URL}/${section.toLowerCase()}-${semester}.json`,{
        cache:"force-cache",
        next:{
            revalidate:0
        }
        
    }).then((d)=>d.json());
    console.log("pppppp",p[0]['First']);
    return p[0]['First'];
})