import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { FC } from 'react'

interface TaxiCardProps {
  taxi: any
}

const TaxiCard: FC<TaxiCardProps> = ({taxi}) => {
  return (
    <Card className="w-[300px] min-w-[250px] overflow-hidden p-2 flex flex-col gap-2 justify-between">
        <div className="w-full">
            <Image width={300} height={300} src={taxi.logo} alt="Taxi image" className="mx-auto w-auto h-[50px]" />
        </div>
        <div>
            <h1 className="text-base text-center font-sans font-bold">{taxi.provider_name}</h1>
            <p className='font-sans text-sm text-center pt-1'>
                <strong>Rating: {taxi.rating}</strong>{` (${taxi.reviews} reviews)`}
            </p>
        </div>
        <p className='text-[13px] text-blue-500 font-bold hover:underline underline-offset-1 cursor-pointer text-right'>Contact Now</p>
    </Card>
)
}

export default TaxiCard