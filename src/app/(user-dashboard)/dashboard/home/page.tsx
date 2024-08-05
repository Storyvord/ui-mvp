import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Link from "next/link";
import OngoingProjects from "@/components/dashboardHome/OngoingProjectCard";
import { projects, USER_API } from "@/constant/constant";

interface project {
  id: number;
  name: string;
  start_date?: string;
  end_date?: string;
  budget?: string;
  location?: string;
  status: boolean;
}

type projectArray = project[];

const page = async () => {
  const PastProjects = projects
    .filter((project) => project.status === true)
    .map((project) => (
      <TableRow key={project.name}>
        <TableCell>
          <p className="block antialiased text-base leading-relaxed text-blue-gray-900 font-[800]">
            {project.name}
          </p>
        </TableCell>
        <TableCell>
          <p className="block antialiased text-base leading-relaxed text-blue-gray-900 font-light">
            {project.start_date}
          </p>
        </TableCell>
        <TableCell>
          <p className="block antialiased text-base leading-relaxed text-blue-gray-900 font-light">
            {project.end_date}
          </p>
        </TableCell>
        <TableCell>
          <p className="block antialiased text-base leading-relaxed text-blue-gray-600 font-[600]">
            {project.budget}
          </p>
        </TableCell>
        <TableCell>
          <p className="block antialiased text-base leading-relaxed text-blue-gray-600 font-[600]">
            {project.location}
          </p>
        </TableCell>
        <TableCell>
          <p className="block antialiased text-base leading-relaxed  text-green-500 font-[600]">
            COMPLETED
          </p>
        </TableCell>
      </TableRow>
    ));
  return <div className="mt-12 lg:gap-16 gap-9 px-4"></div>;
};

export default page;
