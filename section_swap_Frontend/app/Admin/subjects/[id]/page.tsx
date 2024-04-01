import { getNotesAndPYQS } from "@/ServerActions/admin";
import { PYQSTable } from "@/components/Admin/PYQSTable";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";

type Props = {
  params: { id: string };
  searchParams: { subject: string };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
) {

  return{
    title: `${searchParams.subject}`,
    description: `PYQs and Notes for ${searchParams.subject}`,
  }

}

const page = async (props: Props) => {
  const { id } = props.params;

  const { subject } = props.searchParams;

  if (!subject || !id) return <div>Something went wrong</div>;

  const res = await getNotesAndPYQS(id);

  if (!res) return <div>Something went wrong</div>;

  return <PYQSTable subject={subject.toString()} data={res} />;
};

export default page;
