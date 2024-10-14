"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const CrewCard = () => {
  return (
    <Card className=" cursor-pointer">
      {/* Banner Image */}
      <Image
        src="/banner.jpeg"
        alt="Banner"
        width={400}
        height={150}
        className="w-full h-32 object-cover"
      />

      <section className=" mt-4 flex items-center justify-between ">
        <div className=" flex items-center gap-2">
          <Image
            src="/profile.png"
            alt="Profile"
            width={50}
            height={50}
            className="rounded-full mr-4"
          />
          <CardTitle className=" text-lg">Crew Name</CardTitle>
        </div>
        <CardDescription>Country</CardDescription>
      </section>

      <CardContent className=" mt-3 line-clamp-2">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio error accusantium
          consequatur quibusdam ratione, repudiandae earum incidunt sequi ducimus quis, ipsa commodi
          magnam deserunt eos vero nesciunt dolores quod voluptates nostrum repellat voluptatum in
          ut. Repudiandae cum, consequuntur autem quod quae nam temporibus, quibusdam quas, dolorem
          molestiae rerum dicta a eveniet ex iure natus ut corrupti sequi ab incidunt hic
          laboriosam. Ea cupiditate voluptatum libero perferendis deserunt. Aliquam explicabo iste
          animi, quaerat blanditiis, laboriosam possimus repudiandae nihil non adipisci ad. Error
          corporis ex, voluptate totam vel reprehenderit praesentium quidem incidunt dignissimos
          necessitatibus, ipsum, suscipit porro harum magnam doloribus repellendus. Omnis.
        </p>
      </CardContent>

      {/* Rating */}
      <div className="p-4 flex items-center gap-1">
        <Image src="/icons/star.svg" width={15} height={15} alt="star" />
        5.0 (2)
      </div>

      <CardFooter className="flex justify-between items-center">
        <p className="text-lg font-semibold">$200/day</p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Connect
        </button>
      </CardFooter>
    </Card>
  );
};

export default CrewCard;
