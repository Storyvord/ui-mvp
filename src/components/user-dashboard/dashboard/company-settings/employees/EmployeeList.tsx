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
// [
// 	{
// 		"id": 2,
// 		"username": null,
// 		"email": "souvik2@client.com",
// 		"first_name": "",
// 		"last_name": ""
// 	}
// ]
const headers = ["Name", "Email"];
type Profile = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
};

type Props = {
  data?: Profile[] | undefined;
  isLoading?: boolean;
};

const EmployeeList = ({ data, isLoading }: Props) => {
  return (
    <>
      <Table className=" mt-4 bg-white p-2">
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item:Profile) => (
            <TableRow key={item.id} className="">
              <TableCell>{item.first_name}</TableCell>
              <TableCell>{item.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {data?.length === 0 && (
        <h2 className=" text-center mt-4 text-gray-600"> No Employee and Staff added</h2>
      )}
    </>
  );
};

export default EmployeeList;
