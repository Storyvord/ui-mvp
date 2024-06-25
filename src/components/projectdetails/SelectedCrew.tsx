import { SelectedCrewMember } from '@/types'
import { FC } from 'react'
import CrewCard from './CrewCard'

interface SelectedCrewProps {
    crews:{
        crew_member: SelectedCrewMember,
        preferred_because?:string
    }[]
    
}

const SelectedCrew: FC<SelectedCrewProps> = ({crews}) => {
  return <div>
    <h1 className='text-base sm:text-xl font-semibold font-sans'>Selected Crew Members</h1>
    <div className='max-w-full overflow-x-auto md:overflow-x-hidden mb-[5px] pt-2 pl-2 hover:mb-0 md:hover:overflow-x-auto py-4'>
        {
            crews.length === 0 ? <p className='text-sm text-center text-gray-500'>No crew members selected</p>: (
                <div className='flex gap-4'>
                    {
                        crews.map((crew) => (
                            <CrewCard key={crew.crew_member.id} crew={crew}/>
                        ))
                    }
                </div>
            )
        }
        
    </div>
    
  </div>
}

export default SelectedCrew