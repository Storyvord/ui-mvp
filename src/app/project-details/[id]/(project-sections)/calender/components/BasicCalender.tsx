'use client'

import React, {useState} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { eventList} from '@/constants'
import AddTaskDialog from './AddTaskDialog'
import { calenderEventType, calenderFormType } from '@/types'
import { format } from 'date-fns';
import { Button } from '@/components/ui/button'
import EventDialog from './EventDialog'

const localizer = momentLocalizer(moment)

const BasicCalender = () => {
    
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
    const [events, setEvents] = useState<calenderEventType[]>(eventList);
    const handleCloseDialog = () => setIsDialogOpen(false);
    const handleCloseEventDialog = () => {
        setEventToDisplay(null);
        setIsEventDialogOpen(false)
    };
    const [eventToDisplay, setEventToDisplay] = useState<calenderEventType | null>(null)
    const [formData, setFormData] = useState({
        start: '',
        end: '',
        title: '',
        desc: '',
        location: '',
        participants: [],
    })

    const handleChange = (e: React.ChangeEvent<any>)=>{
        const name = e.target.name;
        const value = e.target.value;
        setFormData(values => ({...values, [name]: value}))
    }

    const addEvent=(event: calenderFormType)=>{
        const newEvent = {
            ...event,
            id: events.length > 0 ? events[events.length - 1].id + 1 : 0, // Generate new ID
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
        };
        setEvents((prevEvents) => [...prevEvents, newEvent]);
    }

    const handleSubmit = (e: React.FormEvent)=>{
        e.preventDefault();
        addEvent(formData);
        handleCloseDialog()
        setFormData({
            start: '',
            end: '',
            title: '',
            desc: '',
            location: '',
            participants: [],
    })}
    
    const handleSelectSlot = ({start, end}:{
        start: Date,
        end: Date,
    })=>{
        const startString= format(start, "yyyy-MM-dd'T'HH:mm");
        const endString= format(end, "yyyy-MM-dd'T'HH:mm")
        setFormData((prevData)=>({...prevData, start:startString , end:endString}));
        setIsDialogOpen(true);
    }

    const handleSelectEvent = (event: calenderEventType)=>{
        setEventToDisplay(event);
        setIsEventDialogOpen(true);
    }

    
    
  return (
    <div>
        <Button onClick={()=>setIsDialogOpen(true)} className='mb-2'>Add Event</Button>
        <div className='h-[90vh]'>
            <Calendar
                localizer={localizer} 
                events={events}
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                selectable
            />
        </div>
        <AddTaskDialog open={isDialogOpen} onClose={handleCloseDialog} data={formData} handleChange= {handleChange} handleSubmit={handleSubmit}  />
        <EventDialog event={eventToDisplay} open={isEventDialogOpen} onClose={handleCloseEventDialog}/>
    </div>
    
  )
}

export default BasicCalender
