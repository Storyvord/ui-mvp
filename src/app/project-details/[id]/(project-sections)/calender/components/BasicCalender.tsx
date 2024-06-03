'use client'

import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

const localizer = momentLocalizer(moment)

const BasicCalender = () => {
  return (
    <Calendar
      localizer={localizer} 
    />
  )
}

export default BasicCalender
