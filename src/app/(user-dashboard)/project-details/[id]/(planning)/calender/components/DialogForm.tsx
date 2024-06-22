import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { calenderFormType } from '@/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const DialogForm = ({ data, handleChange, handleSubmit}:{
    handleChange: ({name, value}: {name:string, value:string | string[]})=>void,
    data: calenderFormType,
    onClose: () => void,
    handleSubmit: (e: React.FormEvent)=>void,

}) => {

    const [partName, setPartName] = useState('');

    const handleClick = ()=>{
        const partValue = data.participants ? [...data.participants, partName]: [partName];
        handleChange({name: 'participants', value: partValue})
        setPartName('');
    }

    const handleInputChange= (e: React.ChangeEvent<any>) => {
        const name= e.target.name;
        const value= e.target.value;
        handleChange({name, value})
    }

    const deleteParticipant = (index: number)=>{
        const partValue = data.participants? data.participants.filter((_, i)=>i!==index) : [];
        handleChange({name: 'participants', value: partValue})
    }
    
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
        <div>
            <Label htmlFor="title">Title</Label>
            <Input name="title" id="title" value={data.title} onChange={handleInputChange} type="text" required/>
        </div>
        <div className='flex flex-col sm:flex-row gap-2'>
            <div>
                <Label htmlFor="start">Start</Label>
                <Input name="start" id="start" value={data.start} onChange={handleInputChange} type="datetime-local" required/>
            </div>
            <div>
                <Label htmlFor="end">End</Label>
                <Input name="end" id="end" value={data.end} onChange={handleInputChange} type="datetime-local" required/>
            </div>
        </div>
        <div>
            <Label htmlFor="location">Location</Label>
            <Input name="location" id="location" value={data.location} onChange={handleInputChange} type="text" />
        </div>
        <div>
            <Label htmlFor="desc">Description</Label>
            <Textarea name="desc" id="desc" value={data.desc} onChange={handleInputChange}/>
        </div>
        <div>
            <Label htmlFor="participants">Participants</Label>
            <div className="flex w-full items-center space-x-2">
                <Input type="text" value={partName} onChange={(e)=>setPartName(e.target.value)} placeholder="Enter name" />
                <Button type="button" onClick={handleClick} disabled={partName===""}>Add</Button>
            </div>
            {
                data.participants && (
                    <ul className="flex pl-5 gap-1 flex-wrap text-[10px] w-full pt-2">
                        {data.participants.map((participant, index) => (
                            <Badge key={index} className='bg-gray-500'>
                                {participant}
                                <span onClick={()=>deleteParticipant(index)} className='text-white font-bold ml-4 cursor-pointer'>x</span>
                            </Badge>
                        ))}
                    </ul>
                )
            }
            
        </div>
        
        
        <div className="mt-2">
            <Button type="submit" className='bg-green-500 hover:bg-green-700 font-bold'>Add Event</Button>
        </div>
    </form>
  )
}

export default DialogForm
