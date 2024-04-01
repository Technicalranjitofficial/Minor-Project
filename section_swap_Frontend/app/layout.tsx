import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './Provider'
import Navbar from '@/components/Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KIIT-CONNECT | Section Swap',
  description: 'Welcome to Kiit Connect - Your one-stop website for B.Tech students at KIIT University! Access comprehensive study materials tailored for your academic success. Stay updated with the latest placements and events happening on campus',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#111111]">
        <Providers>
        <div className='w-full bg-[#111111] text-white min-h-screen h-auto  max-w-screen-2xl mx-auto flex relative flex-col'>
          <Navbar/>

        {children}
        </div>
        </Providers>
        <ToastContainer className=""  />

        </body>
    </html>
  )
}
