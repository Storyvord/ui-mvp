import React, { useState } from "react";
import { useGetOnBoardedCrewList } from "@/lib/react-query/queriesAndMutations/crew";
import { useParams } from "next/navigation";
import Select, { MultiValue } from "react-select";
import { Crew } from "./user-dashboard/project-details/planning/crew/crewHire/CrewList";
import { Button } from "./ui/button";
import Loader from "./Loader";

type OptionType = {
  value: string;
  label: string;
};

type Props = {
  handleSubmit: (data: OptionType[]) => void;
  isLoading: boolean;
};

const AccessRights = ({ handleSubmit, isLoading }: Props) => {
  const { id: projectId }: { id: string } = useParams();
  const [selectedOption, setSelectedOption] = useState<OptionType[]>([]);

  const { data: crew_list } = useGetOnBoardedCrewList(projectId);
  const crewList = crew_list?.map((crew: Crew) => ({
    value: crew.email,
    label: crew.email,
  }));

  const handleSubmitAccessRightsForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedOption.length === 0) return;
    handleSubmit(selectedOption);
  };

  const handleSelectChange = (newValue: MultiValue<OptionType>) => {
    setSelectedOption(newValue as OptionType[]);
  };

  return (
    <form onSubmit={handleSubmitAccessRightsForm} className="flex items-center gap-1">
      <Select
        placeholder="Access rights"
        isMulti={true}
        value={selectedOption}
        onChange={handleSelectChange}
        options={crewList}
      />
      <Button variant="outline" size="sm" type="submit">
        {isLoading ? <Loader /> : "Access"}
      </Button>
    </form>
  );
};

export default AccessRights;
