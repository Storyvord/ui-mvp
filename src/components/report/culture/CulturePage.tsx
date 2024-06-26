import { useProjectCulture } from '@/lib/react-query/queriesAndMutations'
import { FC, useState } from 'react'
import CultureCard from './components/CultureCard'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import CultureLoading from './components/CultureLoading'

interface CulturePageProps {
  project_id: string
}

const CulturePage: FC<CulturePageProps> = ({project_id}) => {

  const {data: projectCulture, isLoading, error} = useProjectCulture(project_id)

  const [selectedLocation, setSelectedLocation] = useState("all")
  return (
    <div className='w-full mt-2'>
      {
        isLoading ? <CultureLoading/> : 
        error ? <p className='text-center text-gray-700'>Something went wrong</p> :
        (
          <div className="flex flex-col gap-4">
            <Select onValueChange={(value)=>setSelectedLocation(value)} value={selectedLocation || "all"}>
              <SelectTrigger className="w-full xsm:w-44 py-2 px-4 border border-gray-300 rounded-lg bg-[#111827] text-white transition-colors duration-300">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Locations</SelectLabel>
                  <SelectItem value="all">All Locations</SelectItem>
                  {projectCulture?.map((item: any) => (
                    <SelectItem key={item.id} value={item.culture.location}>
                      {item.culture.location}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {
              projectCulture?.length===0 ? <p className='text-center text-gray-700'>No culture details found</p> :
              projectCulture?.filter((item: any) => {
                return selectedLocation === "all" ? true : item.culture.location === selectedLocation
              })
              .map((item:any)=>(
                <CultureCard key={item.id} location={item.culture.location} details={item.culture.details}/>
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default CulturePage