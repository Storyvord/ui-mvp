"use client";

import { Card } from "@/components/ui/card";
import { useGetOngoingProjects } from "@/lib/react-query/queriesAndMutations";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { Fragment } from "react";

const OngoingProjects = () => {
  const { data, isLoading } = useGetOngoingProjects();

  if (isLoading){
    return <Fragment>
      <Skeleton className="mt-6 h-16 w-full" />
      <Skeleton className="mt-4 h-16 w-full" />
      <Skeleton className="mt-4 h-16 w-full" />
      <Skeleton className="mt-4 h-16 w-full" />

      </Fragment>;
    
  } 

  return (
    <>
    {data?.length === 0 && <h1 className=" mt-8 text-center">You don&apos;t have any ongoing project</h1>}
      {data?.map((item: any) => (
        <Link key={item.project_id} href={`/project-details/${item.project_id}`}>
          <Card className="px-4 mt-4 flex justify-between cursor-pointer font-semibold shadow">
            <h2 className="w-[70%]">{item.name}</h2>
            <div>
              <h2 className="text-xs font-normal text-gray-700">PLANNING</h2>
            </div>
          </Card>
        </Link>
      ))}
    </>
  );
};

export default OngoingProjects;
