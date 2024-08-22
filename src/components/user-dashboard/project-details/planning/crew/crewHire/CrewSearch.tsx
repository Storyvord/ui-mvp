import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

const CrewSearch = () => {
  return (
    <div className=' w-full'>
      <h1 className=' text-2xl font-semibold text-center'>Discover the world’s top creators</h1>
      <form action="" className=' sm:w-[500px] sm:mx-auto mt-8'>
        <div>
          <Label className=' text-lg font-semibold text-gray-900'>Service</Label>
          <Input/>
        </div>
        <div>
          <Label className=' text-lg font-semibold text-gray-900'>Location</Label>
          <Input/>
        </div>
        <Button className=' mt-2 mx-auto px-8'>Search</Button>
      </form>
    </div>
  )
}

export default CrewSearch