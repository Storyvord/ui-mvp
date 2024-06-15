// app/[id]/CrewPageClient.tsx
"use client";

import { useEffect, useState } from "react";
import Filter from "./Filter"; // Adjust the import path as necessary
import Search from "./Search"; // Adjust the import path as necessary
import CrewCard from "./CrewCard"; // Adjust the import path as necessary
import { CrewData, CrewMember } from "./crewService"; // Adjust the import path as necessary

interface CrewPageClientProps {
  crewData: CrewData[];
}

const CrewPageClient: React.FC<CrewPageClientProps> = ({ crewData }) => {
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredCrewData, setFilteredCrewData] = useState<CrewData[]>([]);

  useEffect(() => {
    setFilteredCrewData(crewData);
  }, [crewData]);

  useEffect(() => {
    let filteredData = crewData;

    // Filter by selected role if it's not "all"
    if (selectedRole !== "all") {
      filteredData = filteredData.filter((data) =>
        Object.keys(data).includes(selectedRole)
      );
    }

    // Perform search filtering
    if (searchTerm) {
      filteredData = filteredData
        .map((data) => {
          const role = Object.keys(data)[0];
          const crewMembers = data[role].filter(
            (member) =>
              member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              member.minRatePerDay.toString().includes(searchTerm) ||
              member.maxRatePerDay.toString().includes(searchTerm)
          );
          return { [role]: crewMembers };
        })
        .filter((data) => Object.values(data)[0].length > 0); // Ensure we only keep entries with crew members
    }

    setFilteredCrewData(filteredData);
  }, [selectedRole, searchTerm, crewData]);

  const roles = Array.from(
    new Set(crewData.flatMap((data) => Object.keys(data)))
  );

  return (
    <div className="p-8">
      <div className="mb-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="sm:w-1/4">
          <Filter
            roles={roles}
            selectedRole={selectedRole}
            onRoleChange={(role) => setSelectedRole(role)}
          />
        </div>
        <div className="sm:flex-1">
          <Search searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
        </div>
      </div>
      {selectedRole === "all"
        ? filteredCrewData.map((data, index) => {
            const role = Object.keys(data)[0];
            const crewMembers = data[role];

            return (
              <div key={index} className="mb-8">
                <h2 className="font-semibold text-lg mb-4 text-center">
                  {role}
                </h2>
                <div className="flex flex-wrap -mx-4 justify-center">
                  {crewMembers.map((crewMember: CrewMember, i: number) => (
                    <div key={i} className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-6">
                      <CrewCard role={role} crewMember={crewMember} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        : filteredCrewData.map((data, index) => {
            const role = Object.keys(data)[0];
            const crewMembers = data[role];

            if (crewMembers.length > 0) {
              return (
                <div key={index} className="mb-8">
                  <h2 className="font-semibold text-lg mb-4 text-center">
                    {role}
                  </h2>
                  <div className="flex flex-wrap -mx-4 justify-center">
                    {crewMembers.map((crewMember: CrewMember, i: number) => (
                      <div
                        key={i}
                        className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-6"
                      >
                        <CrewCard role={role} crewMember={crewMember} />
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            return null;
          })}
    </div>
  );
};

export default CrewPageClient;
