
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {

  redirect("/Admin/subjects")
  return (
    <div className="text-gray-400">
    {/* <Analytics/> */}
</div>
  );
}
