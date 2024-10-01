/* eslint-disable react/no-unescaped-entities */
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import React, { useState } from 'react'
import ProducerIcon from "@/assets/producer.svg";
import CrewIcon from "@/assets/crew.svg";
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function BasicInfo() {

    const [isChecked, setIsChecked] = useState<string>('');

    const handleCheck = (type: any) => {
        setIsChecked(type);
    }
    
    console.log(isChecked, 'isChecked')

  return (
    <div>
        <h3 className='lg:text-2xl md:text-2xl text-sm font-poppins text-center font-medium text-[#333333]'>Let's get to know you better!</h3>
        <p className='text-xs lg:text-base md:text-base font-poppins text-center font-normal text-[#666666] mt-2 underline'>Please provide your basic information to continue.</p>
        <div className='lg:px-96 md:px-4 mt-8 gap-x-16'>
            <div className="w-full">
              <Label className="font-poppins font-normal text-[#666666] text-base">Name</Label>
              <Input type="text" placeholder='Please Enter Your Full Name'
                className="mt-1 text-base font-normal text-[#111111] font-poppins h-14 rounded-xl border-[#66666659] focus-visible:ring-offset-0 focus-visible:ring-[transparent]"
              />
            </div>
            <div className="w-full mt-5">
              <Label className="font-poppins font-normal text-[#666666] text-base">Phone Number</Label>
              <Input type="text" placeholder='Please Enter Your Phone Number'
                className="mt-1 text-base font-normal text-[#111111] font-poppins h-14 rounded-xl border-[#66666659] focus-visible:ring-offset-0 focus-visible:ring-[transparent]"
              />
            </div>
            <div className="w-full mt-2 text-right">
              <Button disabled className="font-poppins font-normal text-[#fff] rounded-[50px] text-base px-3 py-2 h-auto" type="submit">Get OTP</Button>
            </div>
            <div className="w-full mt-2">
              <Label className="font-poppins font-normal text-[#666666] text-base">OTP Verify</Label>
              <Input type="text" placeholder='Please Enter OTP'
                className="mt-1 text-base font-normal text-[#111111] font-poppins h-14 rounded-xl border-[#66666659] focus-visible:ring-offset-0 focus-visible:ring-[transparent]"
              />
            </div>
            <div className="w-full mt-5">
                <Label className="font-poppins font-normal text-[#666666] text-base">Your Country</Label>
                <Select>
                    <SelectTrigger className="mt-1 text-base font-normal text-[#111111] font-poppins h-14 rounded-xl border-[#66666659] focus:ring-offset-0 focus:ring-0 focus-visible:ring-offset-0 focus-visible:ring-[transparent]">
                        <SelectValue placeholder="Please Select Your Country" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem className="text-base font-normal text-[#111111] font-poppins" value="light">Light</SelectItem>
                        <SelectItem className="text-base font-normal text-[#111111] font-poppins" value="dark">Dark</SelectItem>
                        <SelectItem className="text-base font-normal text-[#111111] font-poppins" value="system">System</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="w-full mt-5">
                <Label className="font-poppins font-normal text-[#666666] text-base">Company Name <span className="text-xs">(Optional)</span></Label>
                <Select>
                    <SelectTrigger className="mt-1 text-base font-normal text-[#111111] font-poppins h-14 rounded-xl border-[#66666659] focus:ring-offset-0 focus:ring-0 focus-visible:ring-offset-0 focus-visible:ring-[transparent]">
                        <SelectValue placeholder="Please Enter Your Company Name" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem className="text-base font-normal text-[#111111] font-poppins" value="light">Light</SelectItem>
                        <SelectItem className="text-base font-normal text-[#111111] font-poppins" value="dark">Dark</SelectItem>
                        <SelectItem className="text-base font-normal text-[#111111] font-poppins" value="system">System</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="w-full mt-5">
                <Label className="font-poppins font-normal text-[#666666] text-base">Personal Website <span className="text-xs">(Optional)</span></Label>
                <Input type="text" placeholder='Please Enter Your Personal Website'
                    className="mt-1 text-base font-normal text-[#111111] font-poppins h-14 rounded-xl border-[#66666659] focus-visible:ring-offset-0 focus-visible:ring-[transparent]"
                />
            </div>
            <div className="w-full mt-5">
                <Label className="font-poppins font-normal text-[#666666] text-base">About</Label>
                <Input type="text" placeholder='Please Enter About'
                    className="mt-1 text-base font-normal text-[#111111] font-poppins h-14 rounded-xl border-[#66666659] focus-visible:ring-offset-0 focus-visible:ring-[transparent]"
                />
            </div>
            <div className="w-full mt-5">
                <Label className="font-poppins font-normal text-[#666666] text-base">Profile Photo</Label>
                <Input type="file" placeholder='Please Enter About'
                    className="mt-1 font-poppins h-14 rounded-xl border-[#66666659]
                    file:mr-4 file:py-2 file:px-4 text-[#333] file:rounded-full file:border-0 file:text-sm file:font-normal file:bg-[#D7D7D7]"
                />
            </div>
        </div>
        <div className='flex justify-end mt-10 mb-10'>
            <Button className='w-44 font-poppins' type="submit">Next</Button>
        </div>
    </div>
  )
}
