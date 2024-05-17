

import React from 'react'
import { Card } from '@/components/ui/card'

const OngoingProjectCard = ({id, name}:{
    id:string,
    name:string
}) => {

  return (
    <Card className="px-4 mt-4 flex justify-between cursor-pointer font-semibold shadow">
        <h2 className="w-[70%]">{name}</h2>
        <div>
            <h2 className="text-xs font-normal text-gray-700">PLANNING</h2>
        </div>
    </Card>
  )
}

export default OngoingProjectCard
