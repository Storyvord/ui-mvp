import React, { useState } from "react";
import { useParams } from "next/navigation";
import Select, { MultiValue } from "react-select";
import { Button } from "./ui/button";
import Loader from "./Loader";
import { useGetCrewList } from "@/lib/react-query/queriesAndMutations/crew";

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

  const { data: crewListData } = useGetCrewList(projectId);
  const crewList = crewListData?.results.map((crew: { id: number; user: string }) => ({
    value: crew.id,
    label: crew.user,
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
