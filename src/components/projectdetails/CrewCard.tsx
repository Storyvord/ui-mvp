import { SelectedCrewMember } from '@/types'
import Image from 'next/image'
import { FC } from 'react'

interface CrewCardProps {
  crew: {
    crew_member: SelectedCrewMember,
    preferred_because?:string
  }
}

const CrewCard: FC<CrewCardProps> = ({crew}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center transition-transform duration-300 w-[250px] min-w-[250px] max-w-[250px]">
      <div className="flex-shrink-0">
        <Image
          src={crew.crew_member.profile_pic}
          width={96}
          height={96}
          className="w-24 h-24 rounded-full border-4 border-gray-200 object-cover mb-4"
          alt="Crew Image"
        />
      </div>
      <div className="text-center">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-2">
          {crew.crew_member.role}
        </div>
        <h3 className="block text-xl leading-tight font-medium text-balance truncate max-w-full">
          {crew.crew_member.name}
        </h3>
        <div className="mt-2 space-y-2">
          <p className="text-gray-500 text-base">
            Years of Experience: {crew.crew_member.yoe}
          </p>
          <p className="text-gray-500 text-base">
            Rate Per Day: ${crew.crew_member.minRatePerDay} - $
            {crew.crew_member.maxRatePerDay}
          </p>
          <p className="text-gray-500 text-base">
            Location: {crew.crew_member.location}
          </p>
        </div>
      </div>
      <div className="flex mt-4">
        <button className="py-2 px-4 bg-[#111827] text-white rounded-lg transition-colors duration-300 text-base w-full">
          View Profile
        </button>
      </div>
    </div>
)
}

export default CrewCard