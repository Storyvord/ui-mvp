import { Skeleton } from '@/components/ui/skeleton'
import { FC } from 'react'

interface CultureLoadingProps {
  
}

const CultureLoading: FC<CultureLoadingProps> = ({}) => {
  return <div className="w-full mt-5">
        <Skeleton className="w-full xsm:w-44 h-10 mb-4 bg-black/10" />
        <Skeleton className="w-full h-[400px] bg-black/10" />
  </div>
}

export default CultureLoading