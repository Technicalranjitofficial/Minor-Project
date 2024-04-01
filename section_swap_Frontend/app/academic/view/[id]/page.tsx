import HideLink from "@/components/Academic/hideLink";
import ShowingContents from "@/components/ShowingContents";
import { authOption } from "@/utils/authOptions";
import { Metadata, ResolvingMetadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


type Props = {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params

  const {year,name,subject,sid} = searchParams;

  return {
    title: `${year?`${year}-`:''}${name?`${name}-`:''}${subject?`${subject}-`:''}|Kiit University`,
    description: `You are viewing PYQS/NOTES of ${year?`${year}-`:''}${subject?`${subject}-`:''}${name??''} of Kiit University`,
   alternates:{
    canonical:searchParams.year?`/academic/view/${params.id}?year=${year}&subject=${subject}&sid=${sid}`:`/academic/view/${params.id}?name=${name}&subject=${subject}&sid=${sid}`
   }
  };
 
}

export default async function page(props:Props) {
  const session = await getServerSession(authOption);
  const id = props.params.id.replace("Kiitconnect-Ru6F3", "");
  // console.log(Number(id.at(0)) > 2 ,id,Number(id.at(0)));
  if ((!session)){
    // console.log("here")
    return redirect("/");
  }
  const actualId = Number(props.searchParams.sid)>9?id.slice(2):id.slice(1);
  // console.log(props.params.id,id,id.slice(1));

  return <ShowingContents id={actualId} />;
}
