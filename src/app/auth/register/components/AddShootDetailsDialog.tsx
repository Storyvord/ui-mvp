/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';

interface AddShootDetailsDialogProps {
    openDialog: boolean;
    handleCloseDialog: () => void;
}

export default function AddShootDetailsDialog({ openDialog, handleCloseDialog }: AddShootDetailsDialogProps) {
  return (
    <Dialog open={openDialog} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-2xl mx-auto">
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
                <div className='flex justify-between gap-x-8 mt-5'>
                    <div className="md:w-6/12">
                        <Label className="font-poppins font-normal text-[#666666] text-base">Tentative start date</Label>
                        <DatePicker />
                    </div>
                    <div className="md:w-6/12">
                        <Label className="font-poppins font-normal text-[#666666] text-base">Tentative end date</Label>
                        <DatePicker />
                    </div>
                </div>
            </div>
        </DialogContent>
    </Dialog>
  )
}
