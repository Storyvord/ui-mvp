import { getCrewTasks } from "@/lib/api/crew/tasks"
import { useQuery } from "react-query"

export const useGetCrewTasks = () => {
    return useQuery({
        queryKey:["getCrewTasks"],
        queryFn: getCrewTasks
    })
}