"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Tabs from "@/components/Tabs";
import { BiMessageDetail } from "react-icons/bi";

const headers = ["First Name", "Last Name", "Email", "Status", "Message"];
type ProfileData = {
  id: number;
  firstName: string;
  lastName: string;
  employee_email: string;
  status: string;
};
type Profile = {
  accepted: ProfileData[];
  pending: ProfileData[];
  rejected: ProfileData[];
};

type Props = {
  data: Profile;
  isLoading?: boolean;
};
const tabs = ["Accepted", "Pending", "Rejected"];
const EmployeeList = ({ data, isLoading }: Props) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const handleRedirectToMessagePage = (id: number, name: string) => {
    router.push(`dashboard/message/?receiverId=${id}&name=${name}`);
  };

  // Function to get the current list based on active tab
  const getCurrentList = () => {
    switch (activeTab) {
      case "Accepted":
        return data?.accepted;
      case "Pending":
        return data?.pending;
      case "Rejected":
        return data?.rejected;
      default:
        return [];
    }
  };

  // Get the current list of profiles based on active tab
  const currentList = getCurrentList();

  return (
    <>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
      {isLoading && <p className="w-full text-center">Loading...</p>}
      <Table className="mt-4 bg-white p-2">
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentList?.map((item: ProfileData) => (
            <TableRow key={item.id} className="">
              <TableCell>{item.firstName}</TableCell>
              <TableCell>{item.lastName}</TableCell>
              <TableCell>{item.employee_email}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>
                <BiMessageDetail
                  onClick={() => handleRedirectToMessagePage(item.id, item.firstName)}
                  className="w-6 h-6 hover:text-gray-600 cursor-pointer"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default EmployeeList;
