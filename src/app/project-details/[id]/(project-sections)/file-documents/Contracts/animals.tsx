
import React from 'react'
import { Dog, CircleAlert, FolderOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Find, Sort } from '../ui/docsIcons'

const Animals = () => {
  return (
    <section>
      <div className='py-5 flex flex-row gap-2 -mb-2 mt-5'>
        <Dog />
        <div className='flex flex-col -mt-2'>
          <span className='text-2xl font-medium'>Animals</span>
          <span className='text-slate-500 text-xs'>
            You can find contracts for animals here.
          </span>
        </div>
      </div>
      <div className='mt-5'>
        <span className='text-sm text-slate-600 flex items-center gap-2 border border-slate-200 p-2 rounded bg-white'>
          <CircleAlert className='lg:w-4 lg:h-4 w-5 h-5 md:w-4 md:h-4' />
          <span className='text-xs lg:text-sm md:text-sm'>This category is automatically filled with contracts from the linked function.</span>
        </span>
      </div>
      <div className='text-black mt-2 flex flex-col md:flex-row lg:flex-row items-center lg:justify-between md:justify-between'>
        <div className='flex'>
        </div>
        <div className='flex space-x-1 mt-4'>
          <Button variant="outline" size="icon">
            <Find />
          </Button>
          <Button variant="outline" size="icon">
            <Sort />
          </Button>
        </div>
      </div>
      <div className='mt-8'>
        <div className="relative mb-4 border-2 border-solid border-gray-200 rounded flex flex-col items-center justify-center py-10">
          <FolderOpen className="text-blue-500 lg:w-22 lg:h-20 md:w-20 md:h-18 w-10 h-8 mb-4 stroke-1" />
          <label className="text-xs text-slate-400 mb-2 lg:text-sm md:text-sm text-center">
            <span>This category is automatically filled with contracts from the linked function.</span>
          </label>
        </div>
      </div>
    </section>
  )
}

export default Animals