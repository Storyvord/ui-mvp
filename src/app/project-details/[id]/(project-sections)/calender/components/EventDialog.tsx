import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogTitle,
  } from '@/components/ui/dialog';
  import { Button } from '@/components/ui/button';
import { calenderEventType } from '@/types';


const EventDialog = ({ open, onClose, event }:{
    open: boolean,
    onClose: () => void,
    event: calenderEventType | null
}) => {
    if (!event) return null; // If no event is provided, do not render anything

    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="font-sans max-h-[80vh] overflow-auto">
          <DialogTitle className='text-[30px]'>{event.title}</DialogTitle>
          <div className='text-gray-700 text-[18px]'>
              <h5>
                <strong>Start:</strong> {event.start.toLocaleString()}
              </h5>
              <h5>
                <strong>End:</strong> {event.end.toLocaleString()}
              </h5>
              {event.desc && (
                <h5>
                    <strong>Description:</strong> {event.desc}
                </h5>
              )}
          </div> 
          
          <Button onClick={onClose} className="mt-4" color="primary">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    );
}

export default EventDialog
