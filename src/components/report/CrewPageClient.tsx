"use client";

import { useEffect, useState } from "react";
import Search from "./Search";
import Filter from "./Filter";

import CrewCard from "./CrewCard";
import { CrewMember, CrewRequirement } from "@/types";

interface CrewPageClientProps {
  crewRequirements: CrewRequirement[];
}

const CrewPageClient: React.FC<CrewPageClientProps> = ({ crewRequirements }) => {
  const [selectedRole, setSelectedRole] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredCrewData, setFilteredCrewData] = useState<CrewRequirement[]>([]);

  useEffect(() => {
    setFilteredCrewData(crewRequirements);
  }, [crewRequirements]);

  useEffect(() => {
    let filteredData = crewRequirements;

    // Filter by selected role if it's not "all"
    if (selectedRole !== "all") {
      filteredData = filteredData.filter((data) => data.role === selectedRole);
    }

    // Perform search filtering
    if (searchTerm) {
      filteredData = filteredData.map((data) => {
          const crewMembers = data.crewMembers.filter(
            (member) =>
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.minRatePerDay.includes(searchTerm) ||
            member.maxRatePerDay.includes(searchTerm)
          );
          return { ...data, crewMembers };
        })
        .filter((data) => data.crewMembers.length > 0); // Ensure we only keep entries with crew members
    }

    setFilteredCrewData(filteredData);
  }, [selectedRole, searchTerm, crewRequirements]);

  const roles = Array.from(new Set(crewRequirements.map((data) => data.role)));

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
      <div className="flex flex-wrap -mx-4 justify-center">
        {selectedRole === "all"
          ? filteredCrewData.map((data, index) => (
              data.crewMembers.map((crewMember: CrewMember, i: number) => (
                <div key={i} className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-6">
                  <CrewCard role={data.role} crewMember={crewMember} />
                </div>
              ))
            ))
          : filteredCrewData.map((data, index) => (
              data.crewMembers.map((crewMember: CrewMember, i: number) => (
                <div key={i} className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-6">
                  <CrewCard role={data.role} crewMember={crewMember} />
                </div>
              ))
            ))
        }
      </div>
    </div>
  );
};

export default CrewPageClient;