import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card'
import { FC } from 'react'
import { TiArrowRightThick } from "react-icons/ti";

interface FlightCardProps {
  flight: any
}

const FlightCard: FC<FlightCardProps> = ({flight}) => {
  return (
    <Card className="relative w-[300px] min-w-[250px] overflow-hidden p-4 flex flex-col gap-4 justify-between">
        <Badge className="absolute top-0 left-[-5px] w-fit bg-green-500 rounded-none rounded-br-sm hover:bg-green-500">{flight.tags[0]}</Badge>
        <div className="w-full flex justify-between items-center mt-2">
            <div className="text-left">
                <p className='text-sm font-sans font-bold'>{flight.origin}</p>
                <p className='text-sm font-sans font-bold'>{flight.departure.date}</p>
                <p className='text-sm font-sans font-bold'>{flight.departure.time}</p>
            </div>
            <TiArrowRightThick className="w-6 h-6"/>
            <div className="text-right">
                <p className='text-sm font-sans font-bold'>{flight.destination}</p>
                <p className='text-sm font-sans font-bold'>{flight.arrival.date}</p>
                <p className='text-sm font-sans font-bold'>{flight.arrival.time}</p>
            </div>
        </div>
        <hr></hr>
        <div className='flex justify-between'>
            <h3 className="font-bold text-[13px]">Price: {flight.price}</h3>
            <p className='text-[13px] text-blue-500 font-bold hover:underline underline-offset-1 cursor-pointer'>Book Now</p>
        </div>
    </Card>
 )
}

export default FlightCard