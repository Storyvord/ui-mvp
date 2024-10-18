import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProjectComplience } from "@/lib/react-query/queriesAndMutations";
import { FC, useState } from "react";
import CultureLoading from "../culture/components/CultureLoading";
import ComplianceCard from "./components/ComplianceCard";

interface CompliancePageProps {
  project_id: string;
}

const CompliancePage: FC<CompliancePageProps> = ({ project_id }) => {
  // const {data: projectCompliance, isPending, error} = useProjectComplience(project_id)

  const [selectedLocation, setSelectedLocation] = useState("all");
  return (
    <div className="w-full text-center mt-3">
      Compliance Details
      {/* <Select onValueChange={(value)=>setSelectedLocation(value)} value={selectedLocation || "all"}>
          <SelectTrigger className="w-full xsm:w-44 py-2 mb-2 px-4 border border-gray-300 rounded-lg bg-[#111827] text-white transition-colors duration-300">
            <SelectValue placeholder="Select a location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Locations</SelectLabel>
              <SelectItem value="all">All Locations</SelectItem>
              {projectCompliance?.map((item: any) => (
                <SelectItem key={item.id} value={item.location}>
                  {item.location}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
      </Select>
      {
        isPending ? <CultureLoading/> : 
        error ? <p className='text-center text-gray-700'>Something went wrong</p> :
        (
          <div className="flex flex-col gap-4">
            {
              projectCompliance?.length===0 ? <p className='text-center text-gray-700'>No compliance details found</p> :
              projectCompliance?.filter((item: any) => {
                return selectedLocation === "all" ? true : item.location === selectedLocation
              })
              .map((item:any)=>(
                <ComplianceCard key={item.id} compliance={item}/>
              ))
            }
          </div>
        )
      } */}
    </div>
  );
};

export default CompliancePage;
