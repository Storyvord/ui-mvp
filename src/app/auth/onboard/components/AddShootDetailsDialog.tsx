/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import AddIcon from '../../../../assets/add-square.svg';
import Image from 'next/image';
import moment from 'moment';

interface ShootDetails {
    shootLocation: string;
    startDate: string;
    endDate: string;
    mode: string;
}

interface AddShootDetailsDialogProps {
    openDialog: boolean;
    handleCloseDialog: () => void;
    shootDetails: ShootDetails;
    handleInputChange: (field: string, value: string) => void;
    handleAddOtherLocation: () => void;
    allShootDetails: any[];
}

export default function AddShootDetailsDialog(
    {
        openDialog,
        handleCloseDialog,
        shootDetails,
        handleAddOtherLocation,
        handleInputChange,
        allShootDetails
    }: AddShootDetailsDialogProps) {

    const handleDateChange = (field: string) => (date: Date | undefined) => {
        const formattedDate = date ? moment(date).format('DD/MM/YYYY') : '';
        handleInputChange(field, formattedDate); // Pass the formatted string to the parent
    };

    const parseDate = (dateStr: string) => {
        return dateStr ? moment(dateStr, 'DD/MM/YYYY').toDate() : undefined;
    };

  return (
    <Dialog open={openDialog} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-xl lg:max-w-2xl md:max-w-2xl mx-auto">
            <DialogHeader>
                <DialogTitle className='lg:text-2xl md:text-2xl text-sm font-poppins text-center font-medium text-[#333333]'>Almost there!</DialogTitle>
                <DialogDescription className='text-xs lg:text-base md:text-base font-poppins text-center font-normal text-[#666666] mt-2'>Now, let's finalise your shoot details</DialogDescription>
            </DialogHeader>
            <div className='lg:px-10 md:px-4'>
                {allShootDetails?.map((shoot: any, index: number) => {
                    console.log(shoot, 'shoot')
                    return (
                        <div className='flex justify-between gap-x-5 md:gap-x-8 lg:gap-x-8 mt-5' key={index}>
                            <div>
                                <p className="font-poppins font-normal text-[#666666] text-base text-center mb-1">Shoot Location {index + 1}</p>
                                <p className="bg-[#333333] rounded-lg text-[#fff] text-base font-normal font-poppins py-2 px-2 text-center">{shoot.shootLocation}</p>
                            </div>
                            <div>
                                <p className="font-poppins font-normal text-[#666666] text-base text-center mb-1">Start Date</p>
                                <p className="bg-[#333333] rounded-lg text-[#fff] text-base font-normal font-poppins py-2 px-2  text-center">{shoot.startDate}</p>
                            </div>
                            <div>
                                <p className="font-poppins font-normal text-[#666666] text-base text-center mb-1">End Date</p>
                                <p className="bg-[#333333] rounded-lg text-[#fff] text-base font-normal font-poppins py-2 px-2  text-center">{shoot.endDate}</p>
                            </div>
                            <div>
                                <p className="font-poppins font-normal text-[#666666] text-base text-center mb-1">Shoot mode</p>
                                <p className="bg-[#333333] rounded-lg text-[#fff] text-base font-normal font-poppins py-2 px-2  text-center">{shoot.mode}</p>
                            </div>
                        </div>
                    )
                })}
                <div className="w-full mt-5">
                    <Label className="font-poppins font-normal text-[#666666] text-base">Shoot Location</Label>
                    <Select onValueChange={(value: string) => handleInputChange('shootLocation', value)} value={shootDetails.shootLocation}>
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
                        <DatePicker onChange={handleDateChange('startDate')} value={parseDate(shootDetails.startDate)}  />
                    </div>
                    <div className="md:w-6/12 w-6/12">
                        <Label className="font-poppins font-normal text-[#666666] text-base">Tentative end date</Label>
                        <DatePicker onChange={handleDateChange('endDate')} value={parseDate(shootDetails.endDate)} />
                    </div>
                </div>
                <div className='mt-5'>
                    <Label className="font-poppins font-normal text-[#666666] text-base">Shoot Mode</Label>
                    <div className='flex justify-between gap-x-5 md:gap-x-8 lg:gap-x-8 mt-1'>
                        <RadioGroup className='flex items-center space-x-1 md:w-6/12 w-6/12 border-[1px] rounded-xl border-[#66666659] px-3 py-4'>
                            <RadioGroupItem id="indoor" value="indoor" className='data-[state=checked]:border-[#333333] data-[state=checked]:text-[#333333]'
                                checked={shootDetails.mode === 'indoor'} onClick={() => handleInputChange('mode', 'indoor')}
                            />
                            <Label className="font-poppins font-normal text-[#666666] text-sm cursor-pointer" htmlFor="indoor">Indoor</Label>
                        </RadioGroup>
                        <RadioGroup className='flex items-center space-x-1 md:w-6/12 w-6/12 border-[1px] rounded-xl border-[#66666659] px-3 py-4'>
                            <RadioGroupItem id="outdoor" value="outdoor" className='data-[state=checked]:border-[#333333] data-[state=checked]:text-[#333333]'
                                checked={shootDetails.mode === 'outdoor'} onClick={() => handleInputChange('mode', 'outdoor')}
                            />
                            <Label className="font-poppins font-normal text-[#666666] text-sm cursor-pointer" htmlFor="outdoor">Outdoor</Label>
                        </RadioGroup>
                    </div>
                </div>
                <div className='mt-3 text-right'>
                    <Button type="submit" onClick={handleAddOtherLocation} ><Image src={AddIcon} alt="add" className='mr-2' /> Add another Location</Button>
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
