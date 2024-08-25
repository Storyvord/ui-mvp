"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const headers = [
  "Name",
  "Email",
  "Phone",
  "Job Title",
  "Location",
  "Languages",
  "Standard Rate",
  "Skills",
  "Technical Proficiencies",
  "Specializations",
  "Drive",
  "Active",
];
type Profile = {
  id: number;
  image: string;
  name: string;
  phone: string;
  location: string;
  languages: string;
  job_title: string;
  bio: string;
  experience: string;
  skills: string;
  standardRate: string;
  technicalProficiencies: string;
  specializations: string;
  drive: boolean;
  active: boolean;
  user: number;
};

export type Crew = {
  id: number;
  email: string;
  profile: Profile;
};

type Props = {
  data: Crew[] | undefined;
  isLoading: boolean;
};

const CrewList = ({ data, isLoading }: Props) => {
  return (
    <>
      {data?.length === 0 && (
        <main className="mt-12 flex flex-col gap-8">
          <h1 className=" text-2xl text-center text-gray-500">No crew Found</h1>
        </main>
      )}
      <Table className=" mt-4 bg-white p-2">
        <TableHeader >
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item: Crew) => (
            <TableRow key={item.id} className="">
              <TableCell>{item.profile.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.profile.phone}</TableCell>
              <TableCell>{item.profile.job_title}</TableCell>
              <TableCell>{item.profile.location}</TableCell>
              <TableCell>{item.profile.languages}</TableCell>
              <TableCell>{item.profile.standardRate}</TableCell>
              <TableCell>{item.profile.skills}</TableCell>
              <TableCell>{item.profile.technicalProficiencies}</TableCell>
              <TableCell>{item.profile.specializations}</TableCell>
              <TableCell>{item.profile.drive ? "Yes" : "No"}</TableCell>
              <TableCell>{item.profile.active ? "Yes" : "No"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default CrewList;
