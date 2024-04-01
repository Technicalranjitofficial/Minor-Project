// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// import { getToken } from 'next-auth/jwt'
// import { headers } from 'next/dist/client/components/headers'
// import { signOut } from 'next-auth/react'


 
// // This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest,res:NextResponse) {


// const token = await getToken({
//     req:request,
//     secret:process.env.NEXTAUTH_SECRET
// })



// console.log("token is ",token);



// // if(!token && request.nextUrl.pathname!==""){
// //     return NextResponse.redirect(new URL('/Auth/', request.url));
// // }


// if(token && request.nextUrl.pathname=="/Auth"){
//     return NextResponse.redirect(new URL('/', request.url));

// }








// // return;
// // if(!token) return NextResponse.redirect(new URL('/auth/login', request.url))
// // console.log(session)

// // if(session==null) 
// // return NextResponse.redirect(new URL('/', request.url))


// return NextResponse.next();
// }
 
// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: [
//     '/swapping',

//     '/nonKitians'
//   ],
// }


export { default } from "next-auth/middleware"

export const config = { matcher: ["/swapping"] }