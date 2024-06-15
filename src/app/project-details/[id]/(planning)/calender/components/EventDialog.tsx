import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogTitle,
  } from '@/components/ui/dialog';
  import { Button } from '@/components/ui/button';
import { calenderEventType } from '@/lib/types';


const EventDialog = ({ open, onClose, event, deleteEvent }:{
    open: boolean,
    onClose: () => void,
    event: calenderEventType | null
    deleteEvent: (id:number)=>void
}) => {
    if (!event) return null; // If no event is provided, do not render anything

    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="font-sans max-h-[85vh] overflow-auto">
          <DialogTitle className='text-[30px]'>{event.title}</DialogTitle>
          <div className='text-gray-700 text-[18px]'>
              <h5>
                <strong>Start:</strong> {event.start.toLocaleString()}
              </h5>
              <h5>
                <strong>End:</strong> {event.end.toLocaleString()}
              </h5>
              {event.location && (
                <h5>
                    <strong>Location:</strong> {event.location}
                </h5>
              )}
              {event.desc && (
                <h5>
                    <strong>Description:</strong><br/> 
                    {event.desc}
                </h5>
              )}
              {(event.participants && event.participants.length>0) && (
                <h5>
                    <strong>Participants:</strong>
                    {event.participants.map((participant)=>(participant+ ', '))}
                </h5>
              )}
              
          </div> 
          <div className='flex flex-wrap justify-between gap-1 w-full mt-2'>
            <Button onClick={onClose} className="w-[150px] font-bold">
              Close
            </Button>
            <Button onClick={()=>deleteEvent(event.id)} className="w-[150px] font-bold" variant="destructive">
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
}

export default EventDialog
