import { Skeleton } from '@/components/ui/skeleton'
import { FC } from 'react'

interface LogisticsLoadingProps {
  
}

const LogisticsLoading: FC<LogisticsLoadingProps> = ({}) => {
  return <div className="w-full flex flex-col gap-3 overflow-hidden">
    <Skeleton className='w-full h-10 bg-black/10 mt-2'/>
    <div className='w-full'>
        <h1 className="text-[20px] font-sans font-bold">Hotel Details</h1>
        <div className='flex gap-2 mt-1'>
            <Skeleton className='w-[300px] h-[400px] bg-black/10'/>
            <Skeleton className='w-[300px] h-[400px] bg-black/10'/>
            <Skeleton className='w-[300px] h-[400px] bg-black/10'/>
            <Skeleton className='w-[300px] h-[400px] bg-black/10'/>
        </div>
    </div>
    <div className='w-full'>
        <h1 className="text-[20px] font-sans font-bold">Flight Details</h1>
        <div className='flex gap-2 mt-1'>
            <Skeleton className='w-[300px] h-[400px] bg-black/10'/>
            <Skeleton className='w-[300px] h-[400px] bg-black/10'/>
            <Skeleton className='w-[300px] h-[400px] bg-black/10'/>
            <Skeleton className='w-[300px] h-[400px] bg-black/10'/>
        </div>
    </div>
    <div className='w-full'>
        <h1 className="text-[20px] font-sans font-bold">Taxi Details</h1>
        <div className='flex gap-2 mt-1'>
            <Skeleton className='w-[300px] h-[400px] bg-black/10'/>
            <Skeleton className='w-[300px] h-[400px] bg-black/10'/>
            <Skeleton className='w-[300px] h-[400px] bg-black/10'/>
            <Skeleton className='w-[300px] h-[400px] bg-black/10'/>
        </div>
    </div>
  </div>
}

export default LogisticsLoading