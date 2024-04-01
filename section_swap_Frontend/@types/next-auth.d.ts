import NextAuth from "next-auth/next";
declare module "next-auth"{
    interface Session{
        user: {
            id: string|null;
            email: string;
            name: string;
            image:string|null
          };
        
         authToken:string,
      

    }
}


import {JWT} from "next-auth/jwt"

declare module "next-auth/jwt"{
     interface JWT{
        user: {
            id: string;
            email: string;
            name: string;
            image:string
          };
      
        authToken:string
    }
}