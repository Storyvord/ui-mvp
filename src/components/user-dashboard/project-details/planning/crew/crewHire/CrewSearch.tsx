"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { crewData } from "@/constant/dummyCrew";
import Loader from "@/components/Loader";
import { useSearchCrew } from "@/lib/react-query/queriesAndMutations/crew";

const CrewSearch = () => {
  const [formData, setFormDate] = useState({
    name: "S",
    service: "",
    location: "",
  });
  const [ifFormValid, setIsFormValid] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const { data, isPending } = useSearchCrew(formData);
  console.log(data);
  const handelSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.service === "" || formData.location === "") {
      setIsFormValid(true);
      return;
    } else {
      setIsFormValid(false);
    }
    // await mutateAsync({
    //   location: formData.location,
    //   service: formData.service,
    // });
    setShowLoading(true);
    setTimeout(() => {
      setShowResult(true);
      setShowLoading(false);
    }, 500);
  };
  return (
    <div className=" w-full">
      <h1 className="text-xl lg:text-2xl font-semibold text-center">
        Discover the world’s top creators
      </h1>
      <form
        onSubmit={handelSearch}
        className=" sm:w-[500px] sm:mx-auto mt-8 flex flex-col md:flex-row gap-4"
      >
        <Input
          placeholder="Crew name"
          value={formData.name}
          onChange={(e) => setFormDate({ ...formData, name: e.target.value })}
        />
        <Input
          placeholder="Service"
          value={formData.service}
          onChange={(e) => setFormDate({ ...formData, service: e.target.value })}
        />

        <Input
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormDate({ ...formData, location: e.target.value })}
        />
        <Button type="submit" className="mx-auto px-8">
          Search
        </Button>
      </form>
      {ifFormValid && <p className=" text-center text-red-500 my-2"> Please fill all the fields</p>}

      {/* dummy data this change while backend ready */}
      {showLoading && (
        <div className=" flex justify-center mt-10">
          <Loader />
        </div>
      )}

      {/* {
            "id": 31,
            "image": null,
            "experience": "Production Manager",
            "skills": "Production Manager",
            "standardRate": "1050.0",
            "technicalProficiencies": "Production Manager",
            "specializations": "Production Manager",
            "drive": true,
            "active": true,
            "user": 59,
            "personal_info": 39
        }, */}
      {showResult && (
        <>
          <h1 className=" my-4 text-lg md:text-xl">Search Results</h1>
          <section className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
            {crewData.map((item: any) => (
              <Card key={item.id} className=" cursor-pointer">
                {/* Banner Image */}
                <Image
                  src={item.projectDigests[0].thumbnailUrl}
                  alt="Banner"
                  width={400}
                  height={150}
                  className="w-full h-32 object-cover"
                />

                <section className=" mt-4 flex items-center justify-between ">
                  <div className=" flex items-center gap-2">
                    <Image
                      src={item.image.transforms.profile128}
                      alt="Profile"
                      width={50}
                      height={50}
                      className="rounded-full mr-4 w-12 h-12"
                      objectFit="contain"
                    />
                    <CardTitle className=" text-lg">{item.formalName}</CardTitle>
                  </div>
                  <CardDescription>{item.location.countryName}</CardDescription>
                </section>

                <CardContent className=" mt-3 line-clamp-2">
                  <p>{item.description}</p>
                </CardContent>

                {/* Rating */}
                <div className="p-4 flex items-center gap-1">
                  <Image src="/icons/star.svg" width={15} height={15} alt="star" />
                  5.0 (2)
                </div>

                <CardFooter className="flex justify-between items-center">
                  <p className="text-lg font-semibold">${item.profile.maxRate / 5}/Day</p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Connect
                  </button>
                </CardFooter>
              </Card>
            ))}
          </section>
        </>
      )}
    </div>
  );
};

export default CrewSearch;
