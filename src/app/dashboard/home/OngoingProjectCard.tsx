'use client'

import { Card } from '@/components/ui/card'
import { useProjectControl } from '@/contexts/ProjectContext'

const OngoingProjectCard = ({id, name}:{
    id:string,
    name:string
}) => {

  const { setProject } = useProjectControl();

  return (
    <Card className="px-4 mt-4 flex justify-between cursor-pointer font-semibold shadow" onClick={()=>setProject({id, name})}>
        <h2 className="w-[70%]">{name}</h2>
        <div>
            <h2 className="text-xs font-normal text-gray-700">PLANNING</h2>
        </div>
    </Card>
  )
}

export default OngoingProjectCard
