import Image from "next/image";
import React from "react";
import logo from "@/assets/logo3.png";
import Link from "next/link";
import { Button } from "../ui/button";
import { MdNotificationsActive } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutButton from "./LogoutButton";
import { FaRegUser } from "react-icons/fa";



const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center p-4 border bg-white z-50 font-sans">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-8">
          <Link href="/crew/home">
            <Image src={logo} alt="logo" className="sm:h-10 h-8 w-auto cursor-pointer" />
          </Link>
          <div className="hidden md:flex gap-8">
            <Link href={"/crew/postings"}>Postings</Link>
            <Link href={"/crew/projects"}>Projects</Link>
            <Link href={"/crew/message"}>Message</Link>
            <Link href={"/crew/tasks"}>Tasks</Link>
          </div>
        </div>

        <div className="md:flex items-center gap-6 hidden mr-4">
          <Button variant="outline">Find Work</Button>
          <MdNotificationsActive className="w-6 h-6" />

          <DropdownMenu >
            <DropdownMenuTrigger>
             <FaRegUser className=" w-8 h-8"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4">
              <DropdownMenuItem>
                <Link href={"/crew/profile"} className="py-2 w-full text-center">
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/crew/settings"} className="py-2 w-full text-center">
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogoutButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* Mobile Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <GiHamburgerMenu className=" w-6 h-6 cursor-pointer sm:hidden block" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" mr-4">
          <DropdownMenuItem>
            <Link href={"/crew/postings"} className="py-2 w-full text-center">
              Postings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/crew/projects"} className="py-2 w-full text-center">
              Projects
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/crew/message"} className="py-2 w-full text-center">
              Message
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/crew/reports"} className="py-2 w-full text-center">
              Reports
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/crew/find-work"} className="w-full py-2 mt-2">
              Find Work
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/crew/profile"} className="py-2 w-full text-center">
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MdNotificationsActive className="w-8 h-8 mx-auto py-2" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default Navbar;
