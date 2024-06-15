import React, {useState} from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import DialogForm from './DialogForm';
import { calenderFormType } from '@/lib/types';

interface CalendarDialogProps {
  open: boolean;
  handleChange: ({name, value}:{name:string, value:string | string[]})=>void,
  data: calenderFormType,
  onClose: () => void,
  handleSubmit: (e: React.FormEvent)=>void,

}
const AddTaskDialog: React.FC<CalendarDialogProps> = ({ open, data, handleChange, onClose, handleSubmit }) => {
    
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent  className='p-4 max-h-[85vh] overflow-auto font-sans'>
          <DialogTitle>Add New Event</DialogTitle>
          <DialogDescription>
            Please fill out the details for your new event.
          </DialogDescription>
            <DialogForm data={data} handleChange= {handleChange} onClose={onClose} handleSubmit={handleSubmit}/>
        </DialogContent>
      </Dialog>
    );
  };

export default AddTaskDialog
