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
import OngoingProjectCard from "@/components/dashboardHome/OngoingProjectCard";
import { projects } from "@/utils/constant";

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
  const res = await fetch(
    "https://sv-aibackend.azurewebsites.net/api/project/list-projects", {
      next: { revalidate: 10 },
    },
  );
  const projectsData = await res.json()

  const OngoingProjecs = 
    projectsData.map((project: any) => {
      return (
        <Link key={project.id} href={`/project-details/${project.project_id
        }`}>
          <OngoingProjectCard id={project.project_id.toString()} name={project.project_name} />
        </Link>
      );
    });

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
  return (
    <div className="mt-12 lg:gap-16 gap-9">
      <div className="md:flex justify-between gap-4">
        <div className="md:w-96 mt-4 w-full">
          <Card className="flex justify-between cursor-pointer">
            <Link
              href="new-project"
              className="space-y-4 max-w-[70%] md:max-w-[85%]"
            >
              <CardTitle>Create New Project</CardTitle>
              <CardDescription className="font-normal text-blue-gray-600 leading-5">
                Start a new project A preect is a work order between you and a
                creator. Start a project directly with a creator, or put up a
                posting to hire from the marketplace.
              </CardDescription>
            </Link>
            <span className="w-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"></path>
                <path
                  fillRule="evenodd"
                  d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                  clipRule="evenodd"
                ></path>
                <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z"></path>
              </svg>
            </span>
          </Card>
        </div>
        <Card className="md:w-96 w-full mt-8 md:mt-0 overflow-hidden overflow-y-auto h-[400px] ">
          <CardHeader>
            <CardTitle className="text-xl">Your Ongoing Projects</CardTitle>
          </CardHeader>
          <div>{OngoingProjecs}</div>
        </Card>
      </div>
      <Card className="relative mt-4 flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 overflow-hidden shadow-sm border-blue-gray-100">
        <div className="relative bg-clip-border rounded-xl overflow-hidden bg-transparent text-gray-700 shadow-none m-0 items-center flex justify-between p-6">
          <h6 className="block antialiased tracking-normal text-base font-semibold leading-relaxed text-blue-gray-900 mb-1">
            Previous Projects
          </h6>
        </div>
        <CardContent className="overflow-x-auto px-0 pb-2">
          <Table className="min-w-[640px] table-auto">
            <TableHeader>
              <TableRow>
                <TableHead>PROJECT NAME</TableHead>
                <TableHead>START DATE</TableHead>
                <TableHead>END DATE</TableHead>
                <TableHead>BUDGET</TableHead>
                <TableHead>LOCATION</TableHead>
                <TableHead>STATUS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>{PastProjects}</TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
