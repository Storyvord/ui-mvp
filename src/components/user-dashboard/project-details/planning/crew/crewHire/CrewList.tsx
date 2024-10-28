"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import Tabs from "@/components/Tabs";
import { BiMessageDetail } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { cn } from "@/lib/utils";
import Link from "next/link";

const headers = ["Profile", "First Name", "Last Name", "Status", "Message"];
type ProfileData = {
  id: number;
  firstName: string;
  lastName: string;
  employee_email: string;
  status: string;
  invited_user: { id: number };
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

const CrewList = ({ data, isLoading }: Props) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const handleRedirectToMessagePage = (id: number, name: string) => {
    router.push(`/dashboard/message/?receiverId=${id}&name=${name}`);
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
      <Table className="mt-4 bg-white p-2 ">
        <TableHeader>
          <TableRow className="hover:bg-white">
            {headers.map((header, index) => (
              <TableHead key={index}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentList?.map((item: ProfileData) => (
            <TableRow key={item.id} className="hover:bg-white">
              <TableCell>
                <Link href={`crew/crew-profile/${item?.invited_user?.id}`}>
                  <CgProfile className=" w-8 h-8 cursor-pointer hover:text-gray-700 text-gray-800" />
                </Link>
              </TableCell>
              <TableCell>{item.firstName}</TableCell>
              <TableCell>{item.lastName}</TableCell>
              <TableCell
                className={cn(
                  "font-semibold",
                  item.status === "accepted" && "text-green-500",
                  item.status === "pending" && "text-yellow-500",
                  item.status === "rejected" && "text-red-500"
                )}
              >
                {item.status}
              </TableCell>
              <TableCell>
                <BiMessageDetail
                  onClick={() =>
                    handleRedirectToMessagePage(item?.invited_user?.id, item.firstName)
                  }
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

export default CrewList;
