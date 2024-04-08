
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '@/components/Admin/Sidebar'
import Header from '@/components/Admin/Header';
import { getServerSession } from 'next-auth';
import { authOption } from '@/utils/authOptions';
import { redirect } from 'next/navigation';


const emails = [
  "21053420@kiit.ac.in",
  "21053421@kiit.ac.in",
  "21053436@kiit.ac.in",
  "21053448@kiit.ac.in",
  "21053474@kiit.ac.in",
  "dranjitkumar16@gmail.com"
]
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOption);
  if (!session || !emails.includes(session?.user?.email)) return redirect("/");



  // redirect("/Admin/subjects")
  return (
    <div className="flex flex-row w-screen fixed left-0 z-50 bg-[#090909]  scrollbar scrollbar-none scrollbar-thumb-cyan-600">
      <Sidebar />

      <div className="flex-1 w-full mx-auto bg-body min-h-screen  md:mx-3 scrollbar scrollbar-none scrollbar-thumb-cyan-600">
        <Header />
        <div className='overflow-y-auto h-screen pb-28  scrollbar scrollbar-none px-2'>
        {children}
        </div>
      </div>
    </div>
  )
}
