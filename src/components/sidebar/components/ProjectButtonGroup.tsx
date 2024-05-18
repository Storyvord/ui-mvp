'use client'

import React from 'react'
import { useSelectedLayoutSegment } from 'next/navigation'

const ProjectButtonGroup = ({children}:{
    children:React.ReactNode
}) => {
    const segment = useSelectedLayoutSegment()
  return (
    <>
        {
            segment ==='project-details' ? (children): null
        }
    </>
    
  )
}

export default ProjectButtonGroup
