import { PreferredCrewMember } from "@/types";
import CrewCard from "./CrewCard";
import { useGetSuggestedCrew } from "@/lib/react-query/queriesAndMutations";
import InfiniteProgress from "../InfiniteProgress";
import Link from "next/link";

const SelectedCrew = ({
  project_id,
  status,
}: {
  project_id: string;
  status: "INITIATED" | "COMPLETED" | "PLANNING";
}) => {
  const { data: crews, isLoading, error } = useGetSuggestedCrew(project_id);

  const reportsPage = (
    <Link
      href={`/project-details/${project_id}/reports`}
      className=" cursor-pointer underline text-blue-500"
    >
      reports page
    </Link>
  );

  if (error)
    return <h1 className=" text-center text-red-500">Failed to get crew</h1>;

  return (
    <section>
      <div className=" flex justify-between">
        <h1 className="text-base sm:text-xl font-semibold font-sans">
          Suggested Crew Members
        </h1>
        <span className=" text-sm text-gray-500">For more details go - {reportsPage}</span>
      </div>
      <div className="max-w-full overflow-x-auto md:overflow-x-hidden mb-[5px] pt-2 pl-2 hover:mb-0 md:hover:overflow-x-auto py-4">
        {status === "INITIATED" ? (
          <p className="text-center text-gray-400">
            This is taking longer than usual. Please wait while our AI prepares the best fit crew for your project...
            <InfiniteProgress />
          </p>
        ) : crews?.length === 0 ? (
          <div className=" text-center mt-10 text-gray-500">
            No crew found for this project, you have to provide more details
            <br />
            or you can go - {reportsPage}
          </div>
        ) : (
          <div className="flex gap-4">
            {crews?.map((crew: PreferredCrewMember) => (
              <CrewCard key={crew.crew_member.id} crew={crew} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SelectedCrew;
