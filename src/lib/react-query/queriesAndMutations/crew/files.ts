import { getCrewFileDocumentRooms } from "@/lib/api/crew/files"
import { getAllFiles } from "@/lib/api/file"
import { useQuery } from "react-query"


export const useGetCrewFileDocumentRooms = (project_id:string) => {
    return useQuery({
        queryKey:["getCrewFileDocumentRooms"],
        queryFn: () => getCrewFileDocumentRooms(project_id)
    })
}

export const useGetAllFiles = (room_id:string) => {
    return useQuery({
        queryKey:["getAllFiles"],
        queryFn: () => getAllFiles(room_id)
    })
}