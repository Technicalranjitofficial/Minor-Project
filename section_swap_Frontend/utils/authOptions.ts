import { NextAuthOptions } from "next-auth";

import jsonwebtoken from 'jsonwebtoken'
import GoogleProvider from 'next-auth/providers/google'


function generateToken(payload: any) {
    return jsonwebtoken.sign(
      {
        ...payload,
        iss: process.env.NEXTAUTH_URL,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 10 days
      },
      process.env.NEXTAUTH_SECRET!
    );
  }

export const authOption:NextAuthOptions={
    providers:[
        
         GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID!,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                  prompt: "consent",
                  
                },
              },
              httpOptions: {
                timeout: 100000,
              },
         })
    ],

    callbacks:{
        async jwt({token,user,session,account}) {
            if (account) {
              const tk =  generateToken({
                email: account.email,
                name: account.name,
                picture: account.image,
              });
              return {
                ...token,
                authToken: tk,
              }
            }
            return token;
          
        
    },

    async session({session,token}) {
        return {
        ...session,
        authToken: token.authToken,
          };
    }
},
    pages:{
       signIn:"/auth",
        newUser: '/'
    },
    session:{
        strategy:"jwt",
        // maxAge:10
    },
    jwt:{
        secret:process.env.NEXTAUTH_SECRET,
    }
    
    
}