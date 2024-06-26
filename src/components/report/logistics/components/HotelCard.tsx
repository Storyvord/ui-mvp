import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { FC, useRef } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FaStar } from "react-icons/fa";

interface HotelCardProps {
    hotel: any
}

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1100 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 1100, min: 768 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 767, min: 0 },
        items: 1,
    },
};

const HotelCard: FC<HotelCardProps> = ({hotel}) => {

  return (
    <Card className="w-[300px] min-w-[250px] overflow-hidden p-0 flex flex-col justify-between">
        <div className='relative w-full'>
            <Carousel
                responsive={responsive}
                infinite={true}
                // // stagePadding={0}
                arrows={false}
                showDots
                autoPlay
                autoPlaySpeed={5000}
            >
                {hotel.images?.map((image:string, index:number) => ( 
                  <div key={index} className="relative w-full">
                    <Image width={300} height={300} src={image} alt={`Hotel image ${index + 1}`} className="relative top-0 left-0 w-full h-full max-h-[200px] object-cover" />
                  </div>
                ))}
            </Carousel>
        </div>
        <div className="p-2">
            <h1 className="text-sm font-sans font-bold">{hotel.name}</h1>
            <div className='flex justify-between items-center'>
                <div>
                    <p className="font-sans text-[12px]">{hotel.distance}</p>
                    <p className='font-sans text-[12px]'>
                        <strong>Rating: {hotel.reviewsSummary.score}</strong>{` (${hotel.reviewsSummary.total} reviews)`}
                    </p>
                </div>
                <div className="flex">
                    {
                        [...Array(Number(hotel.stars))].map((_, index)=>(
                            <FaStar key={index} className="text-yellow-400" />
                        ))
                    }
                </div>
            </div>
            
        </div>
        <div className='flex justify-between p-2 pt-0'>
            <h3 className="font-bold text-[13px]">Rooms Starting from {hotel.lowestPrice}</h3>
            <p className='text-[13px] text-blue-500 font-bold hover:underline underline-offset-1 cursor-pointer'>Book Now</p>
        </div>
    </Card>
)
}

export default HotelCard