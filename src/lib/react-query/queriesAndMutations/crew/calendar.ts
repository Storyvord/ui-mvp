import { getAllCrewCalenderEvents } from "@/lib/api/crew/calender";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCrewCalenderEvents = () => {
  return useQuery({
    queryKey: ["getAllCalenderEvents"],
    queryFn: () => getAllCrewCalenderEvents(),
  });
};
