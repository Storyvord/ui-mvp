'use client'

import React from 'react'
import { Button } from '../../ui/button'
import { useSideBarControl } from '@/contexts/SideBarContext'

const SideBarCloseButton = () => {
  const {toggle} = useSideBarControl()
  return (
    <Button className='absolute right-1 top-0 w-8 h-8 lg:hidden rounded-br-none rounded-tl-none bg-gray-700 hover:bg-gray-900/10 active:bg-gray-900/20' onClick={toggle}>
        <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true" className="h-5 w-5 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </span>
    </Button>
  )
}

export default SideBarCloseButton
