/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';

interface AddShootDetailsDialogProps {
    openDialog: boolean;
    isChecked: string;
    handleCloseDialog: () => void;
    handleCheck: (value: string) => void;
}

export default function AddShootDetailsDialog({ openDialog, handleCloseDialog, isChecked, handleCheck }: AddShootDetailsDialogProps) {
  return (
    <Dialog open={openDialog} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-xl lg:max-w-2xl md:max-w-2xl mx-auto">
            <DialogHeader>
                <DialogTitle className='lg:text-2xl md:text-2xl text-sm font-poppins text-center font-medium text-[#333333]'>Almost there!</DialogTitle>
                <DialogDescription className='text-xs lg:text-base md:text-base font-poppins text-center font-normal text-[#666666] mt-2'>Now, let's finalise your shoot details</DialogDescription>
            </DialogHeader>
            <div className='lg:px-10 md:px-4'>
                <div className="w-full mt-5">
                    <Label className="font-poppins font-normal text-[#666666] text-base">Shoot Location</Label>
                    <Select>
                        <SelectTrigger className="mt-1 text-base font-normal text-[#111111] font-poppins h-14 rounded-xl border-[#66666659] focus:ring-offset-0 focus:ring-0 focus-visible:ring-offset-0 focus-visible:ring-[transparent]">
                            <SelectValue placeholder="Please Select Shoot Location" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem className="text-base font-normal text-[#111111] font-poppins" value="light">Light</SelectItem>
                            <SelectItem className="text-base font-normal text-[#111111] font-poppins" value="dark">Dark</SelectItem>
                            <SelectItem className="text-base font-normal text-[#111111] font-poppins" value="system">System</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex justify-between gap-x-5 md:gap-x-8 lg:gap-x-8 mt-5'>
                    <div className="md:w-6/12 w-6/12">
                        <Label className="font-poppins font-normal text-[#666666] text-base">Tentative start date</Label>
                        <DatePicker />
                    </div>
                    <div className="md:w-6/12 w-6/12">
                        <Label className="font-poppins font-normal text-[#666666] text-base">Tentative end date</Label>
                        <DatePicker />
                    </div>
                </div>
                <div className='mt-5'>
                    <Label className="font-poppins font-normal text-[#666666] text-base">Shoot Mode</Label>
                    <div className='flex justify-between gap-x-5 md:gap-x-8 lg:gap-x-8 mt-1'>
                        <RadioGroup className='flex items-center space-x-1 md:w-6/12 w-6/12 border-[1px] rounded-xl border-[#66666659] px-3 py-4'>
                            <RadioGroupItem id="indoor" value="indoor" className='data-[state=checked]:border-[#333333] data-[state=checked]:text-[#333333]'
                                checked={isChecked === 'indoor'} 
                                onClick={() => handleCheck('indoor')}
                            />
                            <Label className="font-poppins font-normal text-[#666666] text-sm cursor-pointer" htmlFor="indoor">Indoor</Label>
                        </RadioGroup>
                        <RadioGroup className='flex items-center space-x-1 md:w-6/12 w-6/12 border-[1px] rounded-xl border-[#66666659] px-3 py-4'>
                            <RadioGroupItem id="outdoor" value="outdoor" className='data-[state=checked]:border-[#333333] data-[state=checked]:text-[#333333]'
                                checked={isChecked === 'outdoor'} onClick={() => handleCheck('outdoor')}
                            />
                            <Label className="font-poppins font-normal text-[#666666] text-sm cursor-pointer" htmlFor="outdoor">Outdoor</Label>
                        </RadioGroup>
                    </div>
                </div>
                <div className="flex items-center space-x-3 mt-8">
                    <Checkbox className="data-[state=checked]:bg-white data-[state=checked]:text-[#111111] data-[state=checked]:border-[#111111] data-[state=checked]:before:text-[#111111] w-5 h-5 rounded-[5]" />
                    <p className="font-poppins font-normal text-[#666666] text-sm" >
                        Do you have Filming permits
                    </p>
                </div>
                <div className="flex items-center space-x-3 mt-4">
                    <Checkbox className="data-[state=checked]:bg-white data-[state=checked]:text-[#111111] data-[state=checked]:border-[#111111] data-[state=checked]:before:text-[#111111] w-5 h-5 rounded-[5]" />
                    <p className="font-poppins font-normal text-[#666666] text-sm" >
                        Allow AI to suggest crew & Equipment
                    </p>
                </div>
                <div className='mt-6 text-center'>
                    <Button className='w-1/4' type="submit">Submit</Button>
                </div>
            </div>
        </DialogContent>
    </Dialog>
  )
}
