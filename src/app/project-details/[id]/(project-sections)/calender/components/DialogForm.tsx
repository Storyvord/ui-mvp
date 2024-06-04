import React from 'react'
import { Button } from '@/components/ui/button'
import { calenderFormType } from '@/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const DialogForm = ({ data, handleChange, handleSubmit}:{
    handleChange: (e: React.ChangeEvent<any>)=>void,
    data: calenderFormType,
    onClose: () => void,
    handleSubmit: (e: React.FormEvent)=>void,

}) => {
    
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
        <div>
            <Label htmlFor="title">Title</Label>
            <Input name="title" id="title" value={data.title} onChange={handleChange} type="text" required/>
        </div>
        <div className='flex flex-col sm:flex-row gap-2'>
            <div>
                <Label htmlFor="start">Start</Label>
                <Input name="start" id="start" value={data.start} onChange={handleChange} type="datetime-local" required/>
            </div>
            <div>
                <Label htmlFor="end">End</Label>
                <Input name="end" id="end" value={data.end} onChange={handleChange} type="datetime-local" required/>
            </div>
        </div>
        <div>
            <Label htmlFor="desc">Description</Label>
            <Textarea name="desc" id="desc" value={data.desc} onChange={handleChange}/>
        </div>
        
        <div className="mt-4">
            <Button type="submit">Add Event</Button>
        </div>
    </form>
  )
}

export default DialogForm
