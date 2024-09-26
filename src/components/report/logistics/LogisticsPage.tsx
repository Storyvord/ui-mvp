import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProjectLogistics } from "@/lib/react-query/queriesAndMutations";
import { FC, useState } from "react";
import LogisticsLoading from "./components/LogisticsLoading";
import { Card } from "@/components/ui/card";
import HotelCard from "./components/HotelCard";
import FlightCard from "./components/FlightCard";
import TaxiCard from "./components/TaxiCard";

interface CulturePageProps {
  project_id: string;
}

const LogisticsPage: FC<CulturePageProps> = ({ project_id }) => {
  // const {data: projectLogistics, isLoading, error} = useProjectLogistics(project_id)

  const [selectedLocation, setSelectedLocation] = useState("all");

  return (
    <div className="w-full text-center mt-3">
      Logistics Details
      {/* <Select onValueChange={(value)=>setSelectedLocation(value)} value={selectedLocation || "all"}>
          <SelectTrigger className="w-full xsm:w-44 py-2 mb-2 px-4 border border-gray-300 rounded-lg bg-[#111827] text-white transition-colors duration-300">
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Locations</SelectLabel>
              <SelectItem value="all">All Locations</SelectItem>
              {projectLogistics?.map((item: any) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.location? item.location : item.id}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
      </Select>
      {
        isLoading ? <LogisticsLoading/> :
        error ? <p className='text-center text-gray-700'>Something went wrong</p>:
        (<div className="w-full flex flex-col gap-4 mt-2">
          {
            projectLogistics?.length===0 ? <p className='text-center text-gray-700'>No logistics details found</p> :
            projectLogistics?.filter((item: any) => {
              return selectedLocation === "all" ? true : item.id === selectedLocation
            })
            .map((item:any)=>(
              <div key={item.id} className="w-full flex flex-col gap-3">
                <h1 className="text-[25px] font-sans font-bold underline underline-offset-1 capitalize">{item.location? item.location : item.id}</h1>
                <div className='w-full'>
                  <h1 className="text-[20px] font-sans font-bold">Hotel Details</h1>
                  <div className='flex w-full gap-3 mt-1 pb-3 overflow-x-auto'>
                    {
                      item.hotel_details.hotelCards.map((hotel:any)=>(
                        <HotelCard key={hotel.name} hotel={hotel}/>
                      ))
                    }
                  </div>
                </div>
                <div className='w-full'>
                  <h1 className="text-[20px] font-sans font-bold">Flight Details</h1>
                  <div className='flex w-full gap-3 mt-1 pb-3 overflow-x-auto'>
                    {
                      item.flights_details.data.itineraries.map((flight: any, index: number)=>(
                        <FlightCard key={index} flight={flight}/>
                      ))
                    }
                  </div>
                </div>
                <div className='w-full'>
                  <h1 className="text-[20px] font-sans font-bold">Taxi Providers</h1>
                  <div className='flex w-full gap-3 mt-1 pb-3 overflow-x-auto'>
                    {
                      item.taxi_details.data.top_providers.map((taxi: any, index: number)=>(
                        <TaxiCard key={index} taxi={taxi}/>
                      ))
                    }
                  </div>
                </div>
                <hr></hr>
              </div>
            ))
          }
        </div>)
      } */}
    </div>
  );
};

export default LogisticsPage;
